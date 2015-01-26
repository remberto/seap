<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class AsignadosController extends AppController{
    
	var $name = 'Asignados';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asignado');

    public function beforeFilter(){
        parent::beforeFilter();     
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
    }    

    public function add(){
        $datasource = $this->Asignado->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try {
            $this->Asignado->create();
            
			$_asignado = array();
            $_asignado['docente_id'] = $this->request->data['docente']['id'];
            $_asignado['curso_id'] = $this->request->data['curso']['id'];
            $_asignado['asignatura_id'] = $this->request->data['asignatura']['id'];
            
			$this->Asignado->save($_asignado);
            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Guardado';
        } catch(Exception $e) {
            $datasource->rollback();            
            $message['guardado'] = False;
            if($e->getCode() == 23505):
                $message['mensaje'] = 'Error al Guardar los datos, Ya existe asignado el Docente a la Asiognatura';
            else:
                $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
            endif;
        }
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }

    public function accion($id){        
        if($this->request->query['accion']=='delete'):
            $this->delete($id);
        endif;
    }


    public function delete($id){  
        if($this->Asignado->delete($id)):
          $message['eliminado'] = true;
          $message['mensaje'] = 'Eliminado';
        else:
          $message['eliminado'] = false;
          $message['mensaje'] = 'Error';
        endif;
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
           ));
    } 
}
?>