<?php


App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class DocentesController extends AppController{
    
    var $name = 'Docentes';//inicializacion de variables
    
    public $components = array('RequestHandler');
    public $uses = array('Persona','Docente','DocenteUe');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');        
    }
    

    public function add(){       
        $datasource = $this->DocenteUe->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        
        try{            
            $this->Persona->create();
            $_persona = array();
            $_persona['paterno'] = $this->request->data['paterno'];
            $_persona['materno'] = $this->request->data['materno'];
            $_persona['nombres'] = $this->request->data['nombres'];
            $_persona['fecha_nacimiento'] = $this->request->data['fecha_nacimiento'];
            $_persona['genero'] = $this->request->data['genero'];
            $this->Persona->save($_persona);

            $this->Docente->create();
            $_docente = array();
            $_docente['id'] = $this->Persona->getLastInsertID();
            $_docente['carnet'] = $this->request->data['carnet'];
            $_docente['formacion_id'] = $this->request->data['Formacion']['id'];           
            if(isset($this->request->data['rda'])){$_docente['rda'] = $this->request->data['rda'];}
            else{$_docente['rda'] = 0;} 
            if(isset($this->request->data['telefono'])){$_docente['telefono'] = $this->request->data['telefono'];}
            else{$_docente['rda'] = 0;} 
            if(isset($this->request->data['email'])){$_docente['email'] = $this->request->data['email'];}
            else{$_docente['rda'] = 0;} 
            if(isset($this->request->data['direccion'])){$_docente['direccion'] = $this->request->data['direccion'];}
            else{$_docente['rda'] = 0;} 
            $this->Docente->save($_docente);

            $this->DocenteUe->create();
            $_docente_ue = array();
            $_docente_ue['docente_id'] = $this->Persona->getLastInsertID();
            $_docente_ue['unidad_educativa_id'] = $this->request->data['UnidadEducativa']['id'];            
            $_docente_ue['financiamiento_id'] = $this->request->data['Financiamiento']['id'];
            $this->DocenteUe->save($_docente_ue);
            
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
        if($this->DocenteUe->delete($id)):
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