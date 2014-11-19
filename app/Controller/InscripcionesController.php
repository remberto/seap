<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class InscripcionesController extends AppController{
    var $name = 'Inscripciones';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Persona','Estudiante','Inscrito');
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
        $inscripciones = array();
        foreach($datas as $data):
            $inscripcion = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $inscripcion[$key] = $value;
                endforeach;                
            endforeach;
            array_push($inscripciones, $inscripcion);
        endforeach;
        //$estudiantes = $datas;
        $this->set(array(
            'inscripciones' => $inscripciones,
            '_serialize' => array('inscripciones')
        ));       
    }
}
?>