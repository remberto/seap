<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
/**
 */
class ActividadEvaluacionesController extends AppController{
    var $name = 'ActividadEvaluaciones';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('ActividadEvaluacion');

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index');
    }

    public function index() {
        $datas = $this->ActividadEvaluacion->find('all');
        $actividadevaluaciones = array();

        foreach($datas as $data):
            $actividadevaluacion = array();
            foreach ($data as $key => $val):
                foreach ($val as $key => $value):
                    $actividadevaluacion[$key] = $value;
                endforeach;
            endforeach;
            array_push($actividadevaluaciones, $actividadevaluacion);
        endforeach;

        $this->set(array(
            'actividades' => $actividadevaluaciones,
            '_serialize' => array('actividades')
            ));
        }
    }
?>