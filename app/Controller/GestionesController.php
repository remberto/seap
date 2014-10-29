<?php

App::uses('AppController', 'Controller');
/**
 * Gestiones Controller
 * @Author Remberto Quispe G. <rembertoy2k3#gmail.com>
 */

class GestionesController extends AppController{
    var $name = 'Gestiones';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Gestion');

    /**
     * Lista las gestiones
     */
    public function index() {
        $datas = $this->Gestion->find('all');     
        $gestiones = array();
        foreach($datas as $data):
            $gestion = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $gestion[$key] = $value;
                endforeach;                
            endforeach;
            array_push($gestiones, $gestion);
        endforeach;
        $this->set(array(
            'gestiones' => $gestiones,
            '_serialize' => array('gestiones')
        ));       
    }        

}
?>