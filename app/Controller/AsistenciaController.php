<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class AsistenciaController extends AppController{

	var $name = 'Asistencia';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asistencia', 'Calendario', 'Inscrito', 'Asignado');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('index');
        $this->Auth->allow('add');

    }

    public function index() {
        print_r("expressionRolo");
		$datas = $this->Asistencia->find('all');
        $asistencias = array();
        foreach($datas as $data):
            $asistencia = array();
            foreach ($data as $key => $val):
                foreach ($val as $key => $value):
                    $asistencia[$key] = $value;
                endforeach;
            endforeach;
            array_push($asistencias, $asistencia);
        endforeach;
        //$estudiantes = $datas;
        $this->set(array(
            'asistencias' => $asistencias,
            '_serialize' => array('asistencias')
        ));
    }

    public function add(){

        $datasource = $this->Asistencia->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();

        // Obtenemos el IdFecha de Calendario
        $fecha = $this->request->data['calendario_fecha'];

        $query = 'SELECT calendario.id as id
            FROM calendario
            WHERE calendario.fecha = \':fecha\' ';

        $query = str_replace(':fecha', substr($this->request->data['calendario_fecha'], 0, 10), $query);

        $datas = $this->Calendario->query($query);
        $idFecha = intval($datas[0][0]['id']);

        #region Verificar si ya se registro la asistencia
        $verifica = $this->Asistencia->find('all', array('conditions' => array('Asistencia.asignado_id' => $this->request->data['asignado_id'],
                                                                            'Asistencia.inscripcion_id' => $this->request->data['inscripcion_id'],
                                                                            'Asistencia.calendario_id' => $idFecha)));
        #endregion

        try {

            if(count($verifica)>0)
            {
                // Actualiza estado_asistencia_id si ya ha sido anteriomente registrado
                $this->Asistencia->updateAll(array('Asistencia.estado_asistencia_id' => $this->request->data['estado_asistencia']),
                                    array('Asistencia.asignado_id' => $this->request->data['asignado_id'],
                                          'Asistencia.inscripcion_id' => $this->request->data['inscripcion_id'],
                                          'Asistencia.calendario_id' => $idFecha));
            }
            else
            {
                $this->Asistencia->create();

                $_asistencia = array();
                $_asistencia['asignado_id'] = $this->request->data['asignado_id'];
                $_asistencia['inscripcion_id'] = $this->request->data['inscripcion_id'];
                $_asistencia['calendario_id'] = $idFecha;
                $_asistencia['estado_asistencia_id'] = $this->request->data['estado_asistencia'];

			    $this->Asistencia->save($_asistencia);
            }

            $datasource->commit();
            $message = 'Guardado';

        } catch(Exception $e) {
            $datasource->rollback();
            $message = 'Error al Guardar los datos';
        }

        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }
}
?>