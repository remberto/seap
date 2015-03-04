<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class PlanificacionClasesDetalleController extends AppController{

	var $name = 'PlanificacionClasesDetalle';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('PlanificacionClase','PlanificacionClaseDetalle','CriterioEvaluacionPlanificacion','Calendario');

    public function beforeFilter(){
        parent::beforeFilter();        
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');

    }

    
    public function add(){

        $datasource = $this->PlanificacionClaseDetalle->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        
        if(isset($this->request->data['id'])):
            $id = $this->request->data['id'];
            $data = $this->PlanificacionClaseDetalle->find('first', array('conditions' => array('PlanificacionClaseDetalle.id' => $id),
                                                                       'recursive'=>-1));
        endif;
        
        try {

            if(!empty($data))
            {
                // Actualiza estado_asistencia_id si ya ha sido anteriomente registrado                
                $data['PlanificacionClaseDetalle']['orientacion_metodologica'] = $this->request->data['orientacion_metodologica'];                
                $data['PlanificacionClaseDetalle']['materiales'] = $this->request->data['materiales'];
                $this->PlanificacionClaseDetalle->save($data);

                $_criterio_evaluacion = array();
                $_criterio_evaluacion['dimension_id'] = $this->request->data['dimension_id'];
                $_criterio_evaluacion['criterio'] = $this->request->data['criterio'];
                $_criterio_evaluacion['planificacion_clase_detalle_id'] =  $data['PlanificacionClaseDetalle']['id'];                
                $this->CriterioEvaluacionPlanificacion->save($_criterio_evaluacion);
            }
            else
            {
                $this->PlanificacionClaseDetalle->create();
                             
                $_planificacion_clase_detalle = array();                
                $_planificacion_clase_detalle['planificacion_clase_id'] = $this->request->data['planificacion_clase_id'];
                $_planificacion_clase_detalle['orientacion_metodologica_id'] = $this->request->data['orientacion_metodologica_id'];
                $_planificacion_clase_detalle['orientacion_metodologica'] = $this->request->data['orientacion_metodologica'];                
                $_planificacion_clase_detalle['materiales'] = $this->request->data['materiales'];
                $this->PlanificacionClaseDetalle->save($_planificacion_clase_detalle);

                $_criterio_evaluacion = array();
                $_criterio_evaluacion['dimension_id'] = $this->request->data['dimension_id'];
                $_criterio_evaluacion['criterio'] = $this->request->data['criterio'];
                $_criterio_evaluacion['planificacion_clase_detalle_id'] =  $this->PlanificacionClaseDetalle->getLastInsertID();                
			    $this->CriterioEvaluacionPlanificacion->save($_criterio_evaluacion);
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
        $datasource = $this->PlanificacionClaseDetalle->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            $_criterio_evaluacion = $this->CriterioEvaluacionPlanificacion->find('all', array('conditions' => array('CriterioEvaluacionPlanificacion.planificacion_clase_detalle_id'=>$id)));
            foreach ($_criterio_evaluacion as $key => $value) {                
                $this->CriterioEvaluacionPlanificacion->delete($value['CriterioEvaluacionPlanificacion']['id']);
            }
            $this->PlanificacionClaseDetalle->delete($id);
            $message['eliminado'] = true;
            $message['mensaje'] = 'Fue dado de baja correctamente el curso';            
            $datasource->commit();
        }catch(Exception $e) {
            $datasource->rollback();            
            $message['mensaje'] = 'Error al Eliminar los datos'.$e->getMessage();            
            $message['guardado'] = false;            
        }       
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
           ));
    }
}
?>