<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class PlanificacionAnualController extends AppController{

	var $name = 'PlanificacionAnual';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('PlanificacionAnual');

    public function beforeFilter(){
        parent::beforeFilter();        
        $this->Auth->allow('add');

    }

    
    public function add(){

        $datasource = $this->PlanificacionAnual->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        
        if(isset($this->request->data['id'])):
            $id = $this->request->data['id'];
            $data = $this->PlanificacionAnual->find('first', array('conditions' => array('PlanificacionAnual.id' => $id),
                                                                       'recursive'=>-1));
        endif;
        
        try {

            if(!empty($data))
            {
                // Actualiza estado_asistencia_id si ya ha sido anteriomente registrado
                if(isset($this->request->data['proyecto_socio_productivo'])):
                    $data['PlanificacionAnual']['proyecto_socio_productivo'] = $this->request->data['proyecto_socio_productivo'];
                endif;
                if(isset($this->request->data['objetivo_general_anual'])):
                    $data['PlanificacionAnual']['objetivo_general_anual'] = $this->request->data['objetivo_general_anual'];
                endif;
                if(isset($this->request->data['objetivo_holistico_anual'])):
                    $data['PlanificacionAnual']['objetivo_holistico_anual'] = $this->request->data['objetivo_holistico_anual'];
                endif;
                $this->PlanificacionAnual->save($data);
            }
            else
            {
                $this->PlanificacionAnual->create();

                $_planificacion_anual = array();
                $_planificacion_anual['curso_id'] = $this->request->data['curso_id'];
                $_planificacion_anual['objetivo_proyecto_socio_productivo'] = $this->request->data['objetivo_proyecto_socio_productivo'];
                $_planificacion_anual['objetivo_general_anual'] = $this->request->data['objetivo_general_anual'];
                $_planificacion_anual['objetivo_holistico_anual'] = $this->request->data['objetivo_holistico_anual'];
			    $this->PlanificacionAnual->save($_planificacion_anual);
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
}
?>