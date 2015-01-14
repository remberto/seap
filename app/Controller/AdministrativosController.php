<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class AdministrativosController extends AppController{
    var $name = 'Administrativos';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Persona','Administrativo');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');        
    }

 
    public function add(){
        $datasource = $this->Administrativo->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{            
            $this->Persona->create();
            $_persona['paterno'] = $this->request->data['paterno'];
            $_persona['materno'] = $this->request->data['materno'];
            $_persona['nombres'] = $this->request->data['nombres'];
            $_persona['fecha_nacimiento'] = $this->request->data['fecha_nacimiento'];
            $_persona['genero'] = $this->request->data['genero'];
            $this->Persona->save($_persona);


            $this->Administrativo->create();
            $_administrativo = array();
            $_administrativo['persona_id'] = $this->Persona->getLastInsertID();
            $_administrativo['carnet'] = $this->request->data['carnet'];            
            $_administrativo['unidad_educativa_id'] = $this->request->data['UnidadEducativa']['id'];
            $_administrativo['cargo_id'] = $this->request->data['Cargo']['id'];
            $_administrativo['financiamiento_id'] = $this->request->data['Financiamiento']['id'];
            $_administrativo['formacion_id'] = $this->request->data['Formacion']['id'];
            if(isset($this->request->data['rda'])){$_administrativo['rda'] = $this->request->data['rda'];}
            else{$_administrativo['rda'] = 0;} 
            $this->Administrativo->save($_administrativo);

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Guardado';
        }catch(Exception $e) {
            $datasource->rollback();
            $message['guardado'] = false;
            $message = 'Error al Guardar los datos '.$e->getMessage();
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
        $data = $this->Administrativo->findById($id);        
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
        if($this->Administrativo->delete($id)):
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