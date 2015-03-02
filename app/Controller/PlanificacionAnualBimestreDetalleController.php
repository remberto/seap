<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class PlanificacionAnualBimestreDetalleController  extends AppController{

	var $name = 'PlanificacionAnualBimestreDetalle';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('PlanificacionAnual','PlanificacionAnualDetalle','PlanificacionBimestralDetalle');

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
        
        // Buscamos si Pplanificacion Anual Detalle existe

        $data = $this->PlanificacionAnualDetalle->find('first', array('conditions'=>array('PlanificacionAnualDetalle.area_id'=> $this->request->data['area_id'],
                                                                                          'PlanificacionAnualDetalle.periodo_id'=> $this->request->data['periodo_id'],
                                                                                          'PlanificacionAnualDetalle.planificacion_anual_id'=> $this->request->data['planificacion_anual_id'],
                                                                                         )));


        
        try {

            if(!empty($data))
            {
                // Actualiza estado_asistencia_id si ya ha sido anteriomente registrado
                $data['PlanificacionAnualDetalle']['contenido'] = $this->request->data['contenido'];
                $this->PlanificacionAnualDetalle->save($data);

                $this->PlanificacionBimestralDetalle->create();

                $_planificacion_bimestral_detalle = array();                
                $_planificacion_bimestral_detalle['area_id'] = $this->request->data['area_id'];
                $_planificacion_bimestral_detalle['planificacion_anual_detalle_id'] = $data['PlanificacionAnualDetalle']['id'];
                $_planificacion_bimestral_detalle['orientacion_metodologica_id'] = $this->request->data['orientacion_metodologica_id'];
                $_planificacion_bimestral_detalle['contenido'] = $this->request->data['orientacion_metodologica'];
                $_planificacion_bimestral_detalle['evaluacion'] = $this->request->data['evaluacion'];
                $_planificacion_bimestral_detalle['producto'] = $this->request->data['producto'];
                $_planificacion_bimestral_detalle['planificacion_bimestral_id'] = $this->request->data['planificacion_bimestral_id'];
                $this->PlanificacionBimestralDetalle->save($_planificacion_bimestral_detalle);

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

                $this->PlanificacionBimestralDetalle->create();

                $_planificacion_bimestral_detalle = array();                
                $_planificacion_bimestral_detalle['area_id'] = $this->request->data['area_id'];
                $_planificacion_bimestral_detalle['planificacion_anual_detalle_id'] = $this->PlanificacionAnualDetalle->getLastInsertID();
                $_planificacion_bimestral_detalle['orientacion_metodologica_id'] = $this->request->data['orientacion_metodologica_id'];
                $_planificacion_bimestral_detalle['contenido'] = $this->request->data['orientacion_metodologica'];
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