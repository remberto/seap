<?php
 App::uses('AppController','Controller');

 class ActividadevaluacionesController extends AppController{
 	var $name='Actividadevaluaciones'; 
 	public $components=array('RequestHandler'); 
 	public $uses=array('ActividadEvaluacionAsignado','ActividadEvaluacion'); 

 	public function beforeFilter(){
 		parent::beforeFilter();
 		$this->Auth->allow('index');
 		$this->Auth->allow('add');
 		$this->Auth->allow('accion');
 		$this->Auth->allow('delete');
 	} 

 	public function index(){
 		$asignado_id=$this->request->query('asignado_id');
 		$periodo_id=$this->request->query('periodo_id');
 		$_actividadevaluaciones=$this->ActividadEvaluacion->query('SELECT 
                                            actividad_evaluacion_asignado.id as id,
                                            actividad_evaluacion.descripcion as descripcion,
                                            actividad_evaluacion_asignado.orden as orden
                                            FROM actividad_evaluacion_asignado
                                            INNER JOIN actividad_evaluacion ON actividad_evaluacion_asignado.actividad_evaluacion_id = actividad_evaluacion.id
                                            WHERE actividad_evaluacion_asignado.asignado_id = \''.$asignado_id.'\'
                                            AND actividad_evaluacion_asignado.periodo_id = '.$periodo_id.';');
 		$actividadevaluaciones=array();
 		foreach($_actividadevaluaciones as $key=>$value){
 			array_push($actividadevaluaciones,$value[0]);
 		}
 		$this->set(array('actividades'=>$actividadevaluaciones,'_serialize'=>array('actividades')));} 

 	public function add(){
 		$datasource=$this->ActividadEvaluacionAsignado->getDataSource();
 		$datasource->useNestedTransactions=TRUE;
 		$datasource->begin();
 		try{
 			$this->ActividadEvaluacionAsignado->create();
 			$_actividad_evaluacion=array();
 			$_actividad_evaluacion['asignado_id']=$this->request->data['asignado_id'];
 			$_actividad_evaluacion['periodo_id']=$this->request->data['periodo_id'];
 			$_actividad_evaluacion['actividad_evaluacion_id']=$this->request->data['actividad_evaluacion_id'];
 			$this->ActividadEvaluacionAsignado->save($_actividad_evaluacion);
 			$datasource->commit();
 			$message['guardado']=true;
 			$message['mensaje']='Se Guardo Correctamente la Actividad de Evaluacion';
 		}catch(Exception$e){
 			$datasource->rollback();$message['mensaje']='Error al Guardar la Actividad de Evaluacion'.$e->getMessage();if($e->getCode()==23505){$message['mensaje']='Error al Guardar datos, la Actvividad de Evaluacion ya existe !!!';}$message['guardado']=false;}$this->set(array('message'=>$message,'_serialize'=>array('message')));
 		}

 	public function accion($id){
 		if($this->request->query['accion']=='delete'):
	            $this->delete($id);	        
	        endif;
 	}

 	public function delete($id){
	        $datasource = $this->ActividadEvaluacionAsignado->getDataSource();
	        $datasource->useNestedTransactions = TRUE;
	        $datasource->begin();
	        try{
	            if($this->ActividadEvaluacionAsignado->delete($id)):
	                $message['eliminado'] = true;
	                $message['mensaje'] = 'Fue dado de baja correctamente la Actividad de Evaluacion';
	            else:
	                $message['eliminado'] = false;
	                $message['mensaje'] = 'Error';
	            endif;
	            $datasource->commit();
	        }catch(Exception $e) {
	            $datasource->rollback();
	            $message['mensaje'] = 'Error al Eliminar'.$e->getMessage();
	            if($e->getCode() == 23503) { $message['mensaje'] = 'Error al eliminar la Actividad de Evaluacion';}
	            $message['guardado'] = false;
	            
	        }       
	        $this->set(array(
	            'message' => $message,
	            '_serialize' => array('message')
	        ));
	}
}
?>

