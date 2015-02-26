<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class PlanificacionBimestralController extends AppController{

	var $name = 'PlanificacionBimestral';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('PlanificacionBimestral');

    public function beforeFilter(){
        parent::beforeFilter();        
        $this->Auth->allow('add');

    }

    
    public function add(){

        $datasource = $this->PlanificacionBimestral->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        
        if(isset($this->request->data['id'])):
            $id = $this->request->data['id'];
            $data = $this->PlanificacionBimestral->find('first', array('conditions' => array('PlanificacionBimestral.id' => $id),
                                                                       'recursive'=>-1));
        endif;
        
        try {

            if(!empty($data))
            {
                // Actualiza estado_asistencia_id si ya ha sido anteriomente registrado
                if(isset($this->request->data['tematica_orientadora'])):
                    $data['PlanificacionBimestral']['tematica_orientadora'] = $this->request->data['tematica_orientadora'];
                endif;
                $data['PlanificacionBimestral']['objetivo_holistico'] = $this->request->data['objetivo_holistico'];
                $this->PlanificacionBimestral->save($data);
            }
            else
            {
                $this->PlanificacionBimestral->create();

                $_planificacion_bimestral = array();                
                $_planificacion_bimestral['periodo_id'] = $this->request->data['periodo_id'];
                if(isset($this->request->data['tematica_orientadora'])):
                    $_planificacion_bimestral['tematica_orientadora'] = $this->request->data['tematica_orientadora'];
                endif;
                $_planificacion_bimestral['objetivo_holistico'] = $this->request->data['objetivo_holistico'];
                $_planificacion_bimestral['planificacion_anual_id'] = $this->request->data['planificacion_anual_id'];
			    $this->PlanificacionBimestral->save($_planificacion_bimestral);
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