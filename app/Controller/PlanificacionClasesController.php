<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class PlanificacionClasesController extends AppController{

	var $name = 'PlanificacionClases';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('PlanificacionClase','Calendario');

    public function beforeFilter(){
        parent::beforeFilter();        
        $this->Auth->allow('add');

    }

    
    public function add(){

        $datasource = $this->PlanificacionClase->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        
        if(isset($this->request->data['id'])):
            $id = $this->request->data['id'];
            $data = $this->PlanificacionClase->find('first', array('conditions' => array('PlanificacionClase.id' => $id),
                                                                       'recursive'=>-1));
        endif;
        
        try {

            if(!empty($data))
            {
                // Actualiza estado_asistencia_id si ya ha sido anteriomente registrado
                //$data['PlanificacionClase']['tematica_orientadora'] = $this->request->data['tematica_orientadora'];
                $calendario_de = $this->Calendario->find('first', array('conditions'=>array('Calendario.fecha'=>substr($this->request->data['calendario_de_id'],0,10))));
                $calendario_a = $this->Calendario->find('first', array('conditions'=>array('Calendario.fecha'=>substr($this->request->data['calendario_a_id'],0,10))));
                 
                
                $data['PlanificacionClase']['objetivo_holistico'] = $this->request->data['objetivo_holistico'];
                $data['PlanificacionClase']['contenido'] = $this->request->data['contenido'];
                $data['PlanificacionClase']['producto'] = $this->request->data['producto'];
                $data['PlanificacionClase']['fuente_verificacion'] = $this->request->data['fuente_verificacion'];
                $data['PlanificacionClase']['calendario_de_id'] = $calendario_de['Calendario']['id'];
                $data['PlanificacionClase']['calendario_a_id'] = $calendario_a['Calendario']['id'];
                $data['PlanificacionClase']['asignado_id'] = $this->request->data['asignado_id'];
                $data['PlanificacionClase']['planificacion_bimestral_id'] = $this->request->data['planificacion_bimestral_id'];
                $this->PlanificacionClase->save($data);
            }
            else
            {
                $this->PlanificacionClase->create();

                $calendario_de = $this->Calendario->find('first', array('conditions'=>array('Calendario.fecha'=>substr($this->request->data['calendario_de_id'],0,10))));
                $calendario_a = $this->Calendario->find('first', array('conditions'=>array('Calendario.fecha'=>substr($this->request->data['calendario_a_id'],0,10))));
                             
                $_planificacion_clase = array();                
                $_planificacion_clase['nro_clase'] = $this->request->data['nro_clase'];
                //$_planificacion_clase['tematica_orientadora'] = $this->request->data['tematica_orientadora'];
                $_planificacion_clase['objetivo_holistico'] = $this->request->data['objetivo_holistico'];
                $_planificacion_clase['contenido'] = $this->request->data['contenido'];
                $_planificacion_clase['producto'] = $this->request->data['producto'];
                $_planificacion_clase['fuente_verificacion'] = $this->request->data['fuente_verificacion'];
                $_planificacion_clase['calendario_de_id'] = $calendario_de['Calendario']['id'];
                $_planificacion_clase['calendario_a_id'] = $calendario_a['Calendario']['id'];
                $_planificacion_clase['asignado_id'] = $this->request->data['asignado_id'];
                $_planificacion_clase['planificacion_bimestral_id'] = $this->request->data['planificacion_bimestral_id'];
			    $this->PlanificacionClase->save($_planificacion_clase);
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