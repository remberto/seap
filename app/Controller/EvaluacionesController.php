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
    public $uses = array('Asignado','CriterioEvaluacion','Inscrito','ActividadEvaluacion', 'Persona','Estudiante');
    //funcion de inicio

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index','view');
    }

    public function index() {

        if(isset($this->request->query['curso_id'])):
            //atas = $this->Estudiante->query('SELECT estudiantes.id, estudiantes.carnet, personas.paterno FROM estudiantes INNER JOIN personas ON estudiantes.id = personas.id');
            $query = 'SELECT inscritos.id as id, 
            CASE WHEN personas.paterno IS NULL THEN \'\' ELSE personas.paterno END as paterno,
            CASE WHEN personas.Materno IS NULL THEN \'\' ELSE personas.materno END as materno,
            personas.nombres as nombres
            FROM inscritos
            INNER JOIN estudiantes ON inscritos.estudiante_id = estudiantes.id
            INNER JOIN personas ON personas.id = estudiantes.id
            WHERE inscritos.curso_id = \':curso_id\'
            ORDER BY personas.paterno, personas.materno, personas.nombres;';
            $query = str_replace(':curso_id', $this->request->query['curso_id'], $query);
            $datas = $this->Inscrito->query($query);
        endif;

        $queryCriterios = 'SELECT criterios_evaluacion.id, criterios_evaluacion.criterio 
        FROM criterios_evaluacion 
        INNER JOIN planificacion_clases_detalle ON criterios_evaluacion.planificacion_clase_detalle_id = planificacion_clases_detalle.id
        INNER JOIN planificacion_clases ON planificacion_clases.id = planificacion_clases_detalle.planificacion_clase_id 
        WHERE criterios_evaluacion.dimension_id = :dimension_id 
        AND planificacion_clases.id = :holistico_id';

        //AQUI TOMAR EN CUENTA planificacion_clases.id y  dimension_id
        $queryCriterios = 'SELECT criterios_evaluacion.id, criterios_evaluacion.criterio 
        FROM criterios_evaluacion ';
        
        $criterios = $this->CriterioEvaluacion->query($queryCriterios);
        
        //pr($datas);
        
        // ADICIONA datos criterios y  cuantitativo
        foreach($datas as $i => $data):
            $idInscrito = $data[0]['id'];
            $count=0;

            foreach($criterios as $posicion=>$criterio):
                $datas[$i][$count]['criterio'.$posicion] = $criterio['criterios_evaluacion']['criterio'];
                $datas[$i][$count]['cuantitativo'.$posicion] = 0;
            endforeach;
            
            $count++;
        endforeach;

        // parsea JSON
        $inscripciones = array();
        foreach($datas as $i => $data):
            $inscripcion = array();
            foreach ($data as $key => $val):
                foreach ($val as $key => $value):
                    $inscripcion[$key] = $value;
                endforeach;
            endforeach;
            array_push($inscripciones, $inscripcion);
        endforeach;
        
        //pr($datas);
        $this->set(array(
            'inscripciones' => $inscripciones,
            '_serialize' => array('inscripciones')
        ));
    }
}
?>