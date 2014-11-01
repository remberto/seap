<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class EstudiantesController extends AppController{
    var $name = 'Estudiantes';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Persona','Estudiante');
    //funcion de inicio

    /*public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index','delete');
    }*/

    public function index() {
        //atas = $this->Estudiante->query('SELECT estudiantes.id, estudiantes.carnet, personas.paterno FROM estudiantes INNER JOIN personas ON estudiantes.id = personas.id');
        $datas = $this->Estudiante->find('all',array('order'=>array('Datos.paterno','Datos.materno','Datos.nombres')));
        $estudiantes = array();
        foreach($datas as $data):
            $estudiante = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $estudiante[$key] = $value;
                endforeach;                
            endforeach;
            array_push($estudiantes, $estudiante);
        endforeach;
        //$estudiantes = $datas;
        $this->set(array(
            'estudiantes' => $estudiantes,
            '_serialize' => array('estudiantes')
        ));       
    }

    public function accion($id){
        if($this->request->query['accion']=='view'):
            $this->view($id);
        elseif($this->request->query['accion']=='delete'):
            $this->delete($id);
        endif;
//        print_r($id);
/*        die();
        $estudiante = $this->Estudiante->find('first', array('conditions'=>array('id'=>$id)));
        $this->set(array(
            'estudiante' => $estudiante,
            '_serialize' => array('estudiante')
            ));*/
    }

    public function view($id){       
        $data = $this->Estudiante->findById($id);
        // $estudiantes = array();
        //foreach($datas as $data):
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


    public function add(){
        $datasource = $this->Estudiante->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            $this->Persona->create();
            $this->request->data['Persona']['paterno'] = $this->request->data['paterno'];
            $this->request->data['Persona']['materno'] = $this->request->data['materno'];
            $this->request->data['Persona']['nombres'] = $this->request->data['nombres'];
            $this->request->data['Persona']['fecha_nacimiento'] = $this->request->data['fecha_nacimiento'];
            $this->request->data['Persona']['genero'] = $this->request->data['genero'];
            $this->Persona->save($this->request->data);
            $this->Estudiante->create();
            $this->request->data['Estudiante']['id'] = $this->Persona->getLastInsertID();
            $this->request->data['Estudiante']['carnet'] = $this->request->data['carnet'];
            $this->request->data['Estudiante']['codigo_rude'] = $this->request->data['codigo_rude'];            
            $this->Estudiante->save($this->request->data);
            $datasource->commit();
            $message = 'Guardado';
        }catch(Exception $e) {
            $datasource->rollback();
            $message = 'Error al Guardar los datos';
        }
        
        /*$link =  "http://localhost:8080/Estudiante";
        
        $data = json_encode($this->request->data['Persona']);
        $httpSocket = new HttpSocket();
        $response = $httpSocket->post($link, $data );*/

          $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }

    public function delete($id){
        //header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        if($this->Estudiante->delete($id)):
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