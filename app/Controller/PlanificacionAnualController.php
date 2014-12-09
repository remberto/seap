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
                $data['PlanificacionAnual']['objetivo_holistico_anual'] = $this->request->data['objetivo_holistico_anual'];
                $this->PlanificacionAnual->save($data);
            }
            else
            {
                $this->PlanificacionAnual->create();

                $_planificacion_anual = array();
                $_planificacion_anual['curso_id'] = $this->request->data['curso_id'];
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