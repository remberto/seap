<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
/**
 */
class PeriodosController extends AppController{
    var $name = 'Periodos';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Periodo');

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index');
    }

    public function index() {
        $datas = $this->Periodo->find('all');
        $periodos = array();

        foreach($datas as $data):
            $periodo = array();
            foreach ($data as $key => $val):
                foreach ($val as $key => $value):
                    $periodo[$key] = $value;
                endforeach;
            endforeach;
            array_push($periodos, $periodo);
        endforeach;

        $this->set(array(
            'periodos' => $periodos,
            '_serialize' => array('periodos')
            ));
        }
    }
?>