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
    public $uses = array('UnidadEducativa');

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
            $this->request->data['UnidadEducativa']['id'] = $this->request->data['id'];
            $this->request->data['UnidadEducativa']['descripcion'] = $this->request->data['descripcion'];
            $this->UnidadEducativa->save($this->request->data);
            $datasource->commit();
            $message = 'Guardado';
        }catch(Exception $e) {
            $datasource->rollback();
            $message = 'Error al Guardar los datos';
        }
       
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }
        

}
?>