<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class AsignaturaController extends AppController{
    
	var $name = 'Asignatura';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asignatura');

    public function beforeFilter(){
        parent::beforeFilter();     
        $this->Auth->allow('add');
    }    

    public function add(){
        $datasource = $this->Asignatura->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try {
            $this->Asignatura->create();
            
			$_asignatura = array();
            $_asignatura['area_id'] = $this->request->data['area']['id'];
            $_asignatura['nivel_id'] = $this->request->data['nivel']['id'];
            $_asignatura['descripcion'] = $this->request->data['descripcion'];
            
			$this->Asignatura->save($_asignatura);
            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Guardado';
        } catch(Exception $e) {
            $datasource->rollback();            
            $message['guardado'] = False;
            if($e->getCode() == 23505):
                $message['mensaje'] = 'Error al Guardar los datos, Ya existe la Asiognatura';
            else:
                $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
            endif;
        }
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    } 
}
?>