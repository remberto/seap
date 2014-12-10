<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class PlanificacionAnualDetalleController extends AppController{

	var $name = 'PlanificacionAnualDetalle';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('PlanificacionAnual','PlanificacionAnualDetalle');

    public function beforeFilter(){
        parent::beforeFilter();        
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');

    }
    
    public function add(){
        $datasource = $this->PlanificacionAnualDetalle->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        
        if(isset($this->request->data['id'])):
            $id = $this->request->data['id'];
            $data = $this->PlanificacionAnualDetalle->find('first', array('conditions' => array('PlanificacionAnualDetalle.id' => $id),
                                                                       'recursive'=>-1));
        endif;
        
        try {

            if(!empty($data))
            {
                // Actualiza estado_asistencia_id si ya ha sido anteriomente registrado
                $data['PlanificacionAnualDetalle']['contenido'] = $this->request->data['contenido'];
                $this->PlanificacionAnualDetalle->save($data);
            }
            else
            {
                $this->PlanificacionAnualDetalle->create();

                $_planificacion_anual_detalle = array();
                $_planificacion_anual_detalle['area_id'] = $this->request->data['area_id'];
                $_planificacion_anual_detalle['periodo_id'] = $this->request->data['periodo_id'];
                $_planificacion_anual_detalle['planificacion_anual_id'] = $this->request->data['planificacion_anual_id'];
                $_planificacion_anual_detalle['contenido'] = $this->request->data['contenido'];
			    $this->PlanificacionAnualDetalle->save($_planificacion_anual_detalle);
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
        if($this->PlanificacionAnualDetalle->delete($id)):
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