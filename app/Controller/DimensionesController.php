<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
/**
 */
class DimensionesController extends AppController{
    var $name = 'Dimensiones';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Dimension');

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index');
    }

    public function index() {
        $datas = $this->Dimension->find('all');
        $dimensiones = array();

        foreach($datas as $data):
            $dimension = array();
            foreach ($data as $key => $val):
                foreach ($val as $key => $value):
                    $dimension[$key] = $value;
                endforeach;
            endforeach;
            array_push($dimensiones, $dimension);
        endforeach;

        $this->set(array(
            'dimensiones' => $dimensiones,
            '_serialize' => array('dimensiones')
            ));
        }
    }
?>