<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class PlanificacionBimestralController extends AppController{

	var $name = 'PlanificacionBimestral';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('PlanificacionBimestral','Asignado','ObjetivoHolistico');

    public function beforeFilter(){
        parent::beforeFilter();        
        $this->Auth->allow('add');

    }

    
    public function add(){

        $datasource = $this->PlanificacionBimestral->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        
        //print_r($this->request->data);
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
                if(isset($this->request->data['objetivo_holistico'])):
                    $data['PlanificacionBimestral']['objetivo_holistico'] = $this->request->data['objetivo_holistico'];
                endif;
                $this->PlanificacionBimestral->save($data);
                // OBjetivo Holistico para evaluacion
                $asignados = $this->Asignado->query('SELECT asignados.id FROM planificacion_anual
                                                     INNER JOIN cursos ON planificacion_anual.curso_id = cursos.id
                                                     INNER JOIN asignados ON asignados.curso_id = cursos.id
                                                     WHERE planificacion_anual.id = \''.$data['PlanificacionBimestral']['planificacion_anual_id'].'\';');

                if(isset($this->request->data['objetivo_holistico'])):
                    foreach ($asignados as $key => $value) {
                        //print_r($value[0]['id']);
                        // Buscar si exisiste
                        $_data = $this->ObjetivoHolistico->find('first', array('conditions'=>array('ObjetivoHolistico.asignado_id'=>$value[0]['id'], 'ObjetivoHolistico.periodo_id'=>$data['PlanificacionBimestral']['periodo_id'])));
                        if(empty($_data)):
                            $this->ObjetivoHolistico->create();
                            $_objetivo_holistico=array();
                            $_objetivo_holistico['asignado_id']=$value[0]['id'];
                            $_objetivo_holistico['periodo_id']=$this->request->data['periodo_id'];
                            $_objetivo_holistico['objetivo_holistico']=$this->request->data['objetivo_holistico'];
                            $this->ObjetivoHolistico->save($_objetivo_holistico);
                        else:
                            $_data['ObjetivoHolistico']['objetivo_holistico']=$this->request->data['objetivo_holistico'];
                            $this->ObjetivoHolistico->save($_data);
                        endif;
                    }
                endif;
            }
            else
            {
                $this->PlanificacionBimestral->create();

                $_planificacion_bimestral = array();                
                $_planificacion_bimestral['periodo_id'] = $this->request->data['periodo_id'];
                if(isset($this->request->data['tematica_orientadora'])):
                    $_planificacion_bimestral['tematica_orientadora'] = $this->request->data['tematica_orientadora'];
                endif;
                if(isset($this->request->data['objetivo_holistico'])):
                    $_planificacion_bimestral['objetivo_holistico'] = $this->request->data['objetivo_holistico'];
                endif;
                $_planificacion_bimestral['planificacion_anual_id'] = $this->request->data['planificacion_anual_id'];
			    $this->PlanificacionBimestral->save($_planificacion_bimestral);

                $asignados = $this->Asignado->query('SELECT asignados.id as id FROM planificacion_anual
                                                     INNER JOIN cursos ON planificacion_anual.curso_id = cursos.id
                                                     INNER JOIN asignados ON asignados.curso_id = cursos.id
                                                     WHERE planificacion_anual.id = \''.$this->request->data['planificacion_anual_id'].'\';');
                
                if(isset($this->request->data['objetivo_holistico'])):
                    foreach ($asignados as $key => $value) {
                        // Buscar si exisiste
                        $_data = $this->ObjetivoHolistico->find('first',array('conditions'=>array('ObjetivoHolistico.asignado_id'=>$value[0]['id'], 'ObjetivoHolistico.periodo_id'=>$this->request->data['periodo_id'])));
                        if(empty($_data)):
                            $this->ObjetivoHolistico->create();
                            $_objetivo_holistico=array();
                            $_objetivo_holistico['asignado_id']=$value[0]['id'];
                            $_objetivo_holistico['periodo_id']=$this->request->data['periodo_id'];
                            $_objetivo_holistico['objetivo_holistico']=$this->request->data['objetivo_holistico'];
                            $this->ObjetivoHolistico->save($_objetivo_holistico);
                        else:
                            $_data['ObjetivoHolistico']['objetivo_holistico']=$this->request->data['objetivo_holistico'];
                            $this->ObjetivoHolistico->save($_data);
                        endif;
                    }
                endif;
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