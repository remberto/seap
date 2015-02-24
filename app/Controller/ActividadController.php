<?php
 App::uses('AppController','Controller');

 class ActividadController extends AppController{
 	var $name='Actividad'; 
 	public $components=array('RequestHandler'); 
 	public $uses=array('ActividadEvaluacion'); 

 	public function beforeFilter(){
 		parent::beforeFilter(); 		
 		$this->Auth->allow('add');
 	} 

 	public function add(){
 		$datasource=$this->ActividadEvaluacion->getDataSource();
 		$datasource->useNestedTransactions=TRUE;
 		$datasource->begin();
 		try{
 			$this->ActividadEvaluacion->create();
 			$_actividad_evaluacion=array();
 			$_actividad_evaluacion['descripcion']=strtoupper($this->request->data['descripcion']);
 			$_actividad_evaluacion['orden']=9; 			
 			$this->ActividadEvaluacion->save($_actividad_evaluacion);
 			$datasource->commit();
 			$message['guardado']=true;
 			$message['mensaje']='Se Guardo Correctamente la Actividad de Evaluacion';
 		}catch(Exception$e){
 			$datasource->rollback();
 			$message['mensaje']='Error al Guardar la Actividad de Evaluacion'.$e->getMessage();
 			if($e->getCode()==23505){
 				$message['mensaje']='Error al Guardar datos, la Actvividad de Evaluacion ya existe !!!';}
 			$message['guardado']=false;}$this->set(array('message'=>$message,'_serialize'=>array('message')));
 	}
 }
 ?>