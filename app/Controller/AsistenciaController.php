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
        $asistencia = array();

        $curso = $this->request->query('curso');
        $_inscritos = $this->Inscrito->query('SELECT inscritos.id as id, 
                                            estudiantes.carnet_identidad as carnet, 
                                            estudiantes.codigo_rude as codigo_rude,
                                            personas.paterno as paterno,
                                            personas.materno as materno,
                                            personas.nombres as nombres,
                                            personas.fecha_nacimiento as fecha_nacimiento,
                                            personas.genero as genero
                                            FROM inscritos
                                            INNER JOIN estudiantes
                                            ON inscritos.estudiante_id = estudiantes.id
                                            INNER JOIN personas
                                            ON personas.id = estudiantes.id
                                            WHERE inscritos.curso_id = \''.$curso.'\' ORDER BY personas.paterno, personas.materno, personas.nombres;');
        $inscritos = array();
        foreach ($_inscritos as $key => $value) {
            array_push($inscritos, $value[0]);            
            $asistencia[$value[0]['id']] = array();
        }       

        $mes = $this->request->query('mes');
        $_dias = $this->Calendario->query('SELECT id, CASE WHEN EXTRACT(DOW FROM fecha) = 1 THEN \'L\' ELSE
CASE WHEN EXTRACT(DOW FROM fecha) = 2 THEN \'M\' ELSE
CASE WHEN EXTRACT(DOW FROM fecha) = 3 THEN \'M\' ELSE
CASE WHEN EXTRACT(DOW FROM fecha) = 4 THEN \'J\' ELSE
CASE WHEN EXTRACT(DOW FROM fecha) = 5 THEN \'V\' ELSE \'\' END END END END END || \' - \' || CAST(EXTRACT (DAY FROM fecha) AS varchar) as dia
FROM calendario WHERE EXTRACT(MONTH FROM fecha) = '.$mes.' AND habil = true ORDER BY id');
        $dias = array();
        foreach ($_dias as $key => $value) {
            array_push($dias, $value[0]);
            foreach ($asistencia as $_key => $_value) {
                $asistencia[$_key][$value[0]['id']] = 0;
            }
        }

        

        $asignado = $this->request->query('asignado');
        $_asistencia = $this->Asistencia->query('SELECT inscripcion_id, calendario_id, estado_asistencia_id FROM asistencia
                                                WHERE asignado_id = \''.$asignado.'\';');

        $Rasistencia = array();
        foreach ($_asistencia as $key => $value) {
            array_push($Rasistencia, $value[0]);    
        }
        
        foreach ($Rasistencia as $key => $value) {            
            if(isset($asistencia[$Rasistencia[$key]['inscripcion_id']][$Rasistencia[$key]['calendario_id']])):
                $asistencia[$Rasistencia[$key]['inscripcion_id']][$Rasistencia[$key]['calendario_id']] = $Rasistencia[$key]['estado_asistencia_id'];
            endif;
        }



        $datos['asistencia'] = $asistencia;
        $datos['inscritos'] = $inscritos;
        $datos['dias'] =  $dias;
        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
    }

    public function add(){

        $datasource = $this->Asistencia->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();

        // Obtenemos el IdFecha de Calendario
        $fecha = $this->request->data['calendario_fecha'];        

        $query = 'SELECT calendario.id as id FROM calendario WHERE calendario.fecha = \':fecha\' ';

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
            $datos['guardado'] = true;
            $datos['message'] = 'Guardado';

        } catch(Exception $e) {
            $datasource->rollback();
            $datos['guardado'] = false;
            $datos['message'] = 'Error al Guardar los datos'.$e->getMessage();
        }

        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
    }
}
?>