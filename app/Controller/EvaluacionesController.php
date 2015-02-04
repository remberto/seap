<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class EvaluacionesController extends AppController{
    var $name = 'Evaluaciones';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asignado','CriterioEvaluacion','Evaluacion','Inscrito','ActividadEvaluacion', 'Persona','Estudiante');
    //funcion de inicio

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index');
        $this->Auth->allow('add');
    }

    public function index(){
        $evaluaciones = array();

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
            $evaluaciones[$value[0]['id']] = array();
        }

        // actividades de evaluacion
        //$
        $periodo = $this->request->query('periodo');
        $actividad = $this->request->query('actividad');
        $asignado = $this->request->query('asignado_id');

        $_dimensiones = $this->CriterioEvaluacion->query('SELECT 
                                                        dimension.id as id, 
                                                        dimension.descripcion as Dimension,
                                                        count(*) as columnas
                                                        FROM criterios_evaluacion
                                                        INNER JOIN dimension
                                                        ON criterios_evaluacion.dimension_id = dimension.id
                                                        WHERE criterios_evaluacion.periodo_id = '.$periodo.'
                                                        AND criterios_evaluacion.actividad_evaluacion_id = '.$actividad.'
                                                        AND criterios_evaluacion.asignado_id = \''.$asignado.'\'                                                        
                                                        GROUP BY dimension.id, dimension.descripcion ORDER BY dimension.id;');

        $dimensiones = array();
        foreach ($_dimensiones as $key => $value) {
            array_push($dimensiones, $value[0]);
        }

        $_criterios = $this->CriterioEvaluacion->query('SELECT 
                                            dimension.id as idDimension, 
                                            dimension.descripcion as Dimension,
                                            criterios_evaluacion.id as idCriterio,
                                            criterios_evaluacion.criterio as Criterio
                                            FROM criterios_evaluacion
                                            INNER JOIN dimension
                                            ON criterios_evaluacion.dimension_id = dimension.id
                                            WHERE criterios_evaluacion.periodo_id = '.$periodo.'                                             
                                            AND criterios_evaluacion.actividad_evaluacion_id = '.$actividad.' 
                                            AND criterios_evaluacion.asignado_id = \''.$asignado.'\'
                                            ORDER BY dimension.id, criterios_evaluacion.id;');
        $criterios = array();
        foreach ($_criterios as $key => $value) {
            array_push($criterios, $value[0]);
            foreach ($evaluaciones as $_key => $_value) {
                $evaluaciones[$_key][$value[0]['idcriterio']]['cuantitativo'] = 0;
                $evaluaciones[$_key][$value[0]['idcriterio']]['cualitativo'] = 0;
            }
        }

        $_evaluaciones = $this->Evaluacion->query('SELECT evaluaciones.id as id, 
                                                     evaluaciones.inscrito_id as inscrito_id, 
                                                     evaluaciones.criterio_de_evaluacion_id as criterio_id,
                                                     evaluaciones.cuantitativo as cuantitativo,
                                                     evaluacion_cualitativo.abreviacion as cualitativo
                                                     FROM evaluaciones
                                                     INNER JOIN evaluacion_cualitativo 
                                                     ON evaluaciones.cualitativo = evaluacion_cualitativo.id
                                                     INNER JOIN criterios_evaluacion
                                                     ON criterio_de_evaluacion_id = criterios_evaluacion.id
                                                     WHERE criterios_evaluacion.periodo_id = '.$periodo.'
                                                    AND criterios_evaluacion.actividad_evaluacion_id = '.$actividad.' 
                                                    AND criterios_evaluacion.asignado_id = \''.$asignado.'\';');
        $Revaluaciones = array();
        foreach($_evaluaciones as $key => $value) {
            array_push($Revaluaciones, $value[0]);    
        }        
        
        foreach ($Revaluaciones as $key => $value) {            
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['cuantitativo'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['cuantitativo'] = $Revaluaciones[$key]['cuantitativo'];
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['cualitativo'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['cualitativo'] = $Revaluaciones[$key]['cualitativo'];
            endif;
        }

        $datos = array();
        $datos['evaluaciones'] = $evaluaciones;
        $datos['inscritos'] = $inscritos;
        $datos['dimensiones'] =  $dimensiones;
        $datos['criterios'] =  $criterios;
        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
    }

    public function add(){
        $datasource = $this->Evaluacion->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            $this->Evaluacion->create();            
            $_evaluacion = array();
            $_evaluacion['asignado_id'] = $this->request->data['asignado_id'];
            $_evaluacion['inscrito_id'] = $this->request->data['inscrito_id'];
            $_evaluacion['criterio_de_evaluacion_id'] = $this->request->data['criterio_id'];
            $_evaluacion['cuantitativo'] = $this->request->data['cuantitativo'];
            $_evaluacion['cualitativo'] = $this->request->data['cualitativo'];
            $_evaluacion['observaciones'] = $this->request->data['observaciones'];           
            $this->Evaluacion->save($_evaluacion);

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se Guardo Correctamente la Evaluacion';
        }catch(Exception $e) {
            $datasource->rollback();
            $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
            if($e->getCode() == 23505) { $message['mensaje'] = 'Error al Guardar datos, el Curso ya existe !!!';}
            $message['guardado'] = false;
            
        }       

        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }
}
?>