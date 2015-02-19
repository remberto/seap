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
        $resumen_mes_asistencia = array();

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
            $resumen_mes_asistencia[$value[0]['id']]['inscripcion_id'] = $value[0]['id'];
            $resumen_mes_asistencia[$value[0]['id']]['asistio'] = 0;
            $resumen_mes_asistencia[$value[0]['id']]['atraso'] = 0;
            $resumen_mes_asistencia[$value[0]['id']]['falta'] = 0;
            $resumen_mes_asistencia[$value[0]['id']]['licencia'] = 0;
        }       

        $mes = $this->request->query('mes');
        $asignado = $this->request->query('asignado');

        $_dias = $this->Calendario->query('SELECT calendario.id as id, 
                                            calendario.fecha as fecha, 
                                            dias.descripcion || \' - \' || calendario.day_id as dia 
                                            FROM calendario
                                            INNER JOIN dias ON calendario.dia_id = dias.id
                                            INNER JOIN horario ON horario.dia_id = calendario.dia_id
                                            WHERE mes_id = \''.$mes.'\' AND dias.habil = 1
                                            AND horario.asignado_id = \''.$asignado.'\'
                                            ORDER BY calendario.id');
        $dias = array();
        foreach ($_dias as $key => $value) {
            array_push($dias, $value[0]);
            foreach ($asistencia as $_key => $_value) {
                $asistencia[$_key][$value[0]['id']] = 0;
            }
        }

        

        
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

        $_resumen_mes_asistencia = $this->Asistencia->query('SELECT inscripcion_id as inscripcion_id,
                                                            SUM(CASE WHEN asistencia.estado_asistencia_id = 1 THEN 1 ELSE 0 END) as asistio,
                                                            SUM(CASE WHEN asistencia.estado_asistencia_id = 2 THEN 1 ELSE 0 END) as atraso,
                                                            SUM(CASE WHEN asistencia.estado_asistencia_id = 3 THEN 1 ELSE 0 END) as falta,
                                                            SUM(CASE WHEN asistencia.estado_asistencia_id = 4 THEN 1 ELSE 0 END) as licencia
                                                            FROM asistencia
                                                            INNER JOIN calendario ON asistencia.calendario_id = calendario.id
                                                            WHERE asignado_id = \''.$asignado.'\'
                                                            AND calendario.mes_id = \''.$mes.'\'
                                                            GROUP BY inscripcion_id;');
        
        $Rresumen_mes_asistencia = array();
        foreach ($_resumen_mes_asistencia as $key => $value) {
            array_push($Rresumen_mes_asistencia, $value[0]);    
        }
        
        foreach ($Rresumen_mes_asistencia as $key => $value) {            
            if(isset($resumen_mes_asistencia[$Rresumen_mes_asistencia[$key]['inscripcion_id']]['asistio'])):
                $resumen_mes_asistencia[$Rresumen_mes_asistencia[$key]['inscripcion_id']]['asistio'] = $Rresumen_mes_asistencia[$key]['asistio'];
            endif;
            if(isset($resumen_mes_asistencia[$Rresumen_mes_asistencia[$key]['inscripcion_id']]['atraso'])):
                $resumen_mes_asistencia[$Rresumen_mes_asistencia[$key]['inscripcion_id']]['atraso'] = $Rresumen_mes_asistencia[$key]['atraso'];
            endif;
            if(isset($resumen_mes_asistencia[$Rresumen_mes_asistencia[$key]['inscripcion_id']]['falta'])):
                $resumen_mes_asistencia[$Rresumen_mes_asistencia[$key]['inscripcion_id']]['falta'] = $Rresumen_mes_asistencia[$key]['falta'];
            endif;
            if(isset($resumen_mes_asistencia[$Rresumen_mes_asistencia[$key]['inscripcion_id']]['licencia'])):
                $resumen_mes_asistencia[$Rresumen_mes_asistencia[$key]['inscripcion_id']]['licencia'] = $Rresumen_mes_asistencia[$key]['licencia'];
            endif;
        }


        $datos['asistencia'] = $asistencia;
        $datos['resumen'] = $resumen_mes_asistencia;
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