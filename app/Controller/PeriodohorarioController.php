<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class PeriodohorarioController extends AppController{
    var $name = 'Periodohorario';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('PeriodoHorario');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');
    }

 
    public function add(){
        $datasource = $this->PeriodoHorario->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{            
            $this->PeriodoHorario->create();            
            $_periodo = array();
            $_periodo['numero_periodo'] = $this->request->data['numero_periodo'];
            $_periodo['de_horas'] = $this->request->data['de_horas'];
            $_periodo['a_horas'] = $this->request->data['a_horas'];            
            $this->PeriodoHorario->save($_periodo);

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se Guardo Correctamente el Periodo';
        }catch(Exception $e) {
            $datasource->rollback();
            $message['mensaje'] = 'Error al Guardar el Periodo'.$e->getMessage();
            if($e->getCode() == 23505) { $message['mensaje'] = 'Error al Guardar Periodo, el Periodo ya existe !!!';}
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
        $datasource = $this->PeriodoHorario->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            if($this->PeriodoHorario->delete($id)):
                $message['eliminado'] = true;
                $message['mensaje'] = 'Fue dado de baja correctamente el Periodo';
            else:
                $message['eliminado'] = false;
                $message['mensaje'] = 'Error';
            endif;
            $datasource->commit();
        }catch(Exception $e) {
            $datasource->rollback();
            $message['mensaje'] = 'Error al dar de Baja el Periodo'.$e->getMessage();
            /*if($e->getCode() == 23503) { $message['mensaje'] = 'Error al eliminar el Criterio. <br/> No se puede eliminar el criterio, porque existe estudiantes evaluados con este criterio. <br/> Primero elimine las evaluaciones para eliminar el criterio';}
            $message['guardado'] = false;*/
            
        }       
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
           ));
    }
}
?>