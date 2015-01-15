<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class CursosController extends AppController{
    var $name = 'Cursos';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Curso');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');
    }

 
    public function add(){
        $datasource = $this->Curso->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            $this->Curso->create();            
            $_curso = array();
            $_curso['gestion_id'] = $this->request->data['Gestion'];
            $_curso['unidad_educativa_id'] = $this->request->data['UnidadEducativa']['id'];
            $_curso['grado_id'] = $this->request->data['Grado']['id'];
            $_curso['paralelo_id'] = $this->request->data['Paralelo']['id'];
            $_curso['turno_id'] = $this->request->data['Turno']['id'];           
            $this->Curso->save($_curso);

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se Guardo Correctamente el Curso';
        }catch(Exception $e) {
            $datasource->rollback();
            $message['guardado'] = false;
            $message['mensaje'] = 'Error al Guardar los datos';
        }       

        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }

    public function accion($id){
        if($this->request->query['accion']=='view'):
            $this->view($id);
        elseif($this->request->query['accion']=='delete'):
            $this->delete($id);
        endif;
    }

    public function view($id){       
        $data = $this->Docente->findById($id);        
        $estudiante = array();
        foreach ($data as $key => $val):                
            foreach ($val as $key => $value):
                $estudiante[$key] = $value;
            endforeach;                
        endforeach;
            //array_push($estudiantes, $estudiante);
            //endforeach;
        $this->set(array(
            'estudiante' => $estudiante,
            '_serialize' => array('estudiante')
        ));
    }

     public function delete($id){  
        if($this->Curso->delete($id)):
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