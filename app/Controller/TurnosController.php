<?php

App::uses('AppController', 'Controller');
/**
 * Turnos Controller
 * @Author Remberto Quispe G. <rembertoy2k3#gmail.com>
 */

class TurnosController extends AppController{
    var $name = 'Turnos';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Turno');

    /**
     * Lista Turnos
     */
    public function index() {
        $datas = $this->Turno->find('all');     
        $turnos = array();
        foreach($datas as $data):
            $turno = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $turno[$key] = $value;
                endforeach;                
            endforeach;
            array_push($turnos, $turno);
        endforeach;
        $this->set(array(
            'turnos' => $turnos,
            '_serialize' => array('turnos')
        ));       
    }        

}
?>