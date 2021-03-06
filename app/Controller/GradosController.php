<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
/**
 */
class GradosController extends AppController{
    var $name = 'Grados';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Nivel','Grado');
    //funcion de inicio

    /*public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index','delete');
    }*/

    public function index() {
        if(isset($this->request->query['nivel_id'])):
            $datas = $this->Grado->find('all',array('fields'=>array('Grado.id as id','Grado.descripcion as descripcion'),
                                                    'conditions'=>array('Grado.nivel_id'=>$this->request->query['nivel_id'])));     
        else:
            $datas = $this->Grado->find('all');     
        endif;    
//   $datas = $this->Nivel->find('all',array('fields'=>array('Nivel.id as value', 'Nivel.descripcion as name')));
        //$estudiantes = $datas;
        $grados = array();
        foreach($datas as $data):
            $grado = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $grado[$key] = $value;
                endforeach;                
            endforeach;
            array_push($grados, $grado);
        endforeach;
        $this->set(array(
            'grados' => $grados,
            '_serialize' => array('grados')
        ));       
    }        

}
?>