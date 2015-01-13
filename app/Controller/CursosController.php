<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class CursosController extends AppController{
    var $name = 'Estudiantes';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Curso');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('add');
    }

 
    public function add(){
        $datasource = $this->Curso->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            $this->Curso->create();
            $_curso = array();
            $_curso['gestion_id'] = $this->request->data['gestion_id']['id'];
            $_curso['unidad_educativa_id'] = $this->request->data['unidad_educativa_id']['id'];
            $_curso['grado_id'] = $this->request->data['grado_id']['id'];
            $_curso['paralelo_id'] = $this->request->data['paralelo_id']['id'];
            $_curso['turno_id'] = $this->request->data['turno_id']['id'];           
            $this->Curso->save($_curso);
            $datasource->commit();
            $message = 'Guardado';
        }catch(Exception $e) {
            $datasource->rollback();
            $message = 'Error al Guardar los datos';
        }       

        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }
}
?>