<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
/**
 */
class NivelesController extends AppController{
    var $name = 'Niveles';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Nivel');
    //funcion de inicio

    /*public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index','delete');
    }*/

    public function index() {
        $datas = $this->Nivel->find('all');     
//   $datas = $this->Nivel->find('all',array('fields'=>array('Nivel.id as value', 'Nivel.descripcion as name')));
        //$estudiantes = $datas;
        $niveles = array();
        foreach($datas as $data):
            $nivel = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $nivel[$key] = $value;
                endforeach;                
            endforeach;
            array_push($niveles, $nivel);
        endforeach;
        $this->set(array(
            'niveles' => $niveles,
            '_serialize' => array('niveles')
        ));       
    }        

}
?>