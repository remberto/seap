<?php
 App::uses('AppController','Controller');

 class ObjetivoholisticoController extends AppController{
 	var $name='Objetivoholistico'; 
 	public $components=array('RequestHandler'); 
 	public $uses=array('ObjetivoHolistico'); 

 	public function beforeFilter(){
 		parent::beforeFilter();
 		$this->Auth->allow('index');
 		$this->Auth->allow('add');
 	} 

 	public function index(){
 		$asignado_id=$this->request->query('asignado_id');
 		$periodo_id=$this->request->query('periodo_id');
 		$_objetivo_holistico=$this->ObjetivoHolistico->query('SELECT id as id,
								      objetivo_holistico as objetivo_holistico
								      FROM objetivo_holistico
                                            			      WHERE objetivo_holistico.asignado_id = \''.$asignado_id.'\'
                                            			      AND objetivo_holistico.periodo_id = '.$periodo_id.';');
 		$objetivo_holistico=array();
 		foreach($_objetivo_holistico as $key=>$value){
 			array_push($objetivo_holistico,$value[0]);
 		}
 		$this->set(array('objetivo_holistico'=>$objetivo_holistico,
 				 '_serialize'=>array('objetivo_holistico')));
 	} 

 	public function add(){
 		$datasource=$this->ObjetivoHolistico->getDataSource();
 		$datasource->useNestedTransactions=TRUE;
 		$datasource->begin();
 		try{
 			$_objetivo_holistico=array();
 			if(!isset($this->request->data['id'])):
 				$this->ObjetivoHolistico->create();
 			else:
 				$_objetivo_holistico['id'] = $this->request->data['id'];
 			endif;
 			
 			$_objetivo_holistico['asignado_id']=$this->request->data['asignado_id'];
 			$_objetivo_holistico['periodo_id']=$this->request->data['periodo_id'];
 			$_objetivo_holistico['objetivo_holistico']=$this->request->data['objetivo_holistico'];
 			$this->ObjetivoHolistico->save($_objetivo_holistico);
 			$datasource->commit();
 			$message['guardado']=true;
 			$message['mensaje']='Se Guardo Correctamente el Objetivo Holistico';
 		}catch(Exception$e){
 			$datasource->rollback();$message['mensaje']='Error al Guardar al Guardar el Objetivo Holistico'.$e->getMessage();
 			if($e->getCode()==23505){
 				$message['mensaje']='Error al Guardar datos, el Objetivo ya existe !!!';}
 			$message['guardado']=false;
 		}
 		$this->set(array('message'=>$message,'_serialize'=>array('message')));}}?>