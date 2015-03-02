<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class PlanificacionBimestralDetalleController extends AppController{

	var $name = 'PlanificacionBimestralDetalle';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('PlanificacionBimestral', 'PlanificacionBimestralDetalle');

    public function beforeFilter(){
        parent::beforeFilter();        
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');

    }

    
    public function add(){

        $datasource = $this->PlanificacionBimestralDetalle->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        
        if(isset($this->request->data['id'])):
            $id = $this->request->data['id'];
            $data = $this->PlanificacionBimestralDetalle->find('first', array('conditions' => array('PlanificacionBimestralDetalle.id' => $id),
                                                                       'recursive'=>-1));
        endif;
        
        try {

            if(!empty($data))
            {
                // Actualiza estado_asistencia_id si ya ha sido anteriomente registrado
                $data['PlanificacionBimestralDetalle']['contenido'] = $this->request->data['contenido'];
                $data['PlanificacionBimestralDetalle']['evaluacion'] = $this->request->data['evaluacion'];
                $data['PlanificacionBimestralDetalle']['producto'] = $this->request->data['producto'];
                //$data['PlanificacionBimestralDetalle']['objetivo_holistico'] = $this->request->data['objetivo_holistico'];
                $this->PlanificacionBimestralDetalle->save($data);
            }
            else
            {
                $this->PlanificacionBimestralDetalle->create();

                $_planificacion_bimestral_detalle = array();                
                $_planificacion_bimestral_detalle['area_id'] = $this->request->data['area_id'];
                $_planificacion_bimestral_detalle['planificacion_anual_detalle_id'] = $this->request->data['planificacion_anual_detalle_id'];
                $_planificacion_bimestral_detalle['orientacion_metodologica_id'] = $this->request->data['orientacion_metodologica_id'];
                $_planificacion_bimestral_detalle['contenido'] = $this->request->data['contenido'];
                $_planificacion_bimestral_detalle['evaluacion'] = $this->request->data['evaluacion'];
                $_planificacion_bimestral_detalle['producto'] = $this->request->data['producto'];
                $_planificacion_bimestral_detalle['planificacion_bimestral_id'] = $this->request->data['planificacion_bimestral_id'];
			    $this->PlanificacionBimestralDetalle->save($_planificacion_bimestral_detalle);
            }

            $datasource->commit();
            $message = 'Guardado';

        } catch(Exception $e) {
            $datasource->rollback();
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

    public function delete($id){
        //header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        if($this->PlanificacionBimestralDetalle->delete($id)):
          $message = 'Eliminado';
        else:
          $message = 'Error';
        endif;
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
           ));
    }
}
?>