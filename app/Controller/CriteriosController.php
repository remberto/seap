<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class CriteriosController extends AppController{
    var $name = 'Criterios';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('CriterioEvaluacion');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');
    }

 
    public function add(){
        $datasource = $this->CriterioEvaluacion->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{            
            $this->CriterioEvaluacion->create();            
            $_criterio = array();
            $_criterio['dimension_id'] = $this->request->data['Dimension']['id'];
            $_criterio['criterio'] = $this->request->data['criterio'];
            $_criterio['periodo_id'] = $this->request->data['periodo_id'];
            $_criterio['actividad_evaluacion_asignado_id'] = $this->request->data['actividad_evaluacion_id'];           
            $_criterio['asignado_id'] = $this->request->data['asignado_id'];
            $this->CriterioEvaluacion->save($_criterio);

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se Guardo Correctamente el Criterios de Evaluacion';
        }catch(Exception $e) {
            $datasource->rollback();
            $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
            if($e->getCode() == 23505) { $message['mensaje'] = 'Error al Guardar datos, el Curso ya existe !!!';}
            $message['guardado'] = false;
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
        $datasource = $this->CriterioEvaluacion->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            if($this->CriterioEvaluacion->delete($id)):
                $message['eliminado'] = true;
                $message['mensaje'] = 'Fue dado de baja correctamente el criterio';
            else:
                $message['eliminado'] = false;
                $message['mensaje'] = 'Error';
            endif;
            $datasource->commit();
        }catch(Exception $e) {
            $datasource->rollback();
            $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
            if($e->getCode() == 23503) { $message['mensaje'] = 'Error al eliminar el Criterio. <br/> No se puede eliminar el criterio, porque existe estudiantes evaluados con este criterio. <br/> Primero elimine las evaluaciones para eliminar el criterio';}
            $message['guardado'] = false;
            
        }       
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
           ));
    }
}
?>