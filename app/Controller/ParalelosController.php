<?php

App::uses('AppController', 'Controller');
/**
 * Paralelos Controller
 * @Author Remberto Quispe G. <rembertoy2k3#gmail.com>
 */

class ParalelosController extends AppController{
    var $name = 'Paralelos';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Paralelo');

    /**
     * Lista de paralelos
     */
    public function index() {
        $datas = $this->Paralelo->find('all');     
        $paralelos = array();
        foreach($datas as $data):
            $paralelo = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $paralelo[$key] = $value;
                endforeach;                
            endforeach;
            array_push($paralelos, $paralelo);
        endforeach;
        $this->set(array(
            'paralelos' => $paralelos,
            '_serialize' => array('paralelos')
        ));       
    }        

}
?>