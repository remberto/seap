<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class InscripcionesController extends AppController{
    var $name = 'Inscripciones';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Persona','Estudiante','Inscrito','Apoderado');
    //funcion de inicio

   public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');        
    }
    

    public function add(){       
        $datasource = $this->Inscrito->getDataSource();
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

            $this->Estudiante->create();
            $_estudiante = array();
            $_estudiante['id'] = $this->Persona->getLastInsertID();
            $_estudiante['carnet_identidad'] = $this->request->data['carnet_identidad'];
            $_estudiante['codigo_rude'] = $this->request->data['codigo_rude'];            
            $this->Estudiante->save($_estudiante);

            $this->Inscrito->create();
            $_inscrito = array();
            $_inscrito['estudiante_id'] = $this->Estudiante->getLastInsertID();
            $_inscrito['curso_id'] = $this->request->data['curso_id'];            
            $_inscrito['fecha_inscripcion'] = date('Y-m-d');
            $_inscrito['estado_inicio_id'] = 1;
            $_inscrito['estado_final_id'] = 4;
            $this->Inscrito->save($_inscrito);

            $this->Persona->create();
            $_persona = array();
            $_persona['paterno'] = $this->request->data['apoderado']['paterno'];
            $_persona['materno'] = $this->request->data['apoderado']['materno'];
            $_persona['nombres'] = $this->request->data['apoderado']['nombres'];
            $this->Persona->save($_persona);

            $this->Apoderado->create();
            $_apoderado = array();
            $_apoderado['carnet_identidad'] = $this->request->data['apoderado']['carnet_identidad'];
            $_apoderado['estudiante_id'] = $this->Estudiante->getLastInsertID();
            $_apoderado['persona_id'] = $this->Persona->getLastInsertID();
            $this->Apoderado->save($_apoderado);

            
            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se realizo la inscripcion correctamente';
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
        if($this->Inscrito->delete($id)):
          $message['eliminado'] = true;
          $message['mensaje'] = 'Se dio de Baja las inscripcion correctamente';
        else:
          $message['eliminado'] = false;
          $message['mensaje'] = 'Error al dar de baja';
        endif;
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
           ));
    } 
}
?>