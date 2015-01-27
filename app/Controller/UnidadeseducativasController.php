<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
/**
 */
class UnidadeseducativasController extends AppController{
    var $name = 'Unidadeseducativas';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('UnidadEducativa','Administra');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('index');
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
    }

    public function index() {
        $datas = $this->UnidadEducativa->find('all');
        $unidades_educativas = array();
        foreach($datas as $data):
            $unidad_educativa = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $unidad_educativa[$key] = $value;
                endforeach;                
            endforeach;
            array_push($unidades_educativas, $unidad_educativa);
        endforeach;
        $this->set(array(
            'unidades_educativas' => $unidades_educativas,
            '_serialize' => array('unidades_educativas')
        ));       
    }

    public function add(){
        $datasource = $this->UnidadEducativa->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            $this->UnidadEducativa->create();
            $_unidadEducativa = array();
            $_unidadEducativa['id'] = $this->request->data['id'];
            $_unidadEducativa['descripcion'] = $this->request->data['descripcion'];
            $_unidadEducativa['fecha_last_update'] = date('Y-m-d h:i:s');
            $_unidadEducativa['user_id'] = $this->request->data['user_id'];
            $this->UnidadEducativa->save($_unidadEducativa);

            $this->Administra->create();
            $_administra = array();
            $_administra['unidad_educativa_id'] = $this->request->data['id'];
            $_administra['user_id'] = $this->request->data['user_id'];
            $this->Administra->save($_administra);                        

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se guardo correctamente la Unidad Educativa';
        }catch(Exception $e) {
            $datasource->rollback();
            $message['guardado'] = false;
            $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
        }
       
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }

    public function accion($id){
        if($this->request->query['accion']=='delete'):
            $this->delete($id);
        endif;
    }


    public function delete($id){
        $datasource = $this->UnidadEducativa->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            if($this->UnidadEducativa->delete($id)):
                $message['eliminado'] = true;
                $message['mensaje'] = 'Fue dado de baja correctamente el curso';
            else:
                $message['eliminado'] = false;
                $message['mensaje'] = 'Error';
            endif;
            $datasource->commit();
        }catch(Exception $e) {
            $datasource->rollback();            
            if($e->getCode() == 23503): 
                $message['mensaje'] = 'Error al eliminar el Unidad Educativa. <br/> No se puede eliminar dar de baja la Unidad Educativa porque se encuentra activa';
            else:
                $message['mensaje'] = 'Error al Eliminar los datos'.$e->getMessage();
            endif;
            $message['guardado'] = false;            
        }       
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
           ));
    }
        

}
?>
