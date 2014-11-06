<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class AsignadosController extends AppController{
    
	var $name = 'Asignados';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asignado');

    public function index() {
	
		if(isset($this->request->query['docente_id'])):
			//Retorna los cursos asignado al docente elegido
			$datas = $this->Asignado->query('SELECT asignados.id, grados.descripcion as grado, paralelos.descripcion as paralelo, asignaturas.descripcion as asignatura 
            FROM asignados
            INNER JOIN cursos ON asignados.curso_id = cursos.id
            INNER JOIN asignaturas ON asignados.asignatura_id = asignaturas.id
			INNER JOIN grados ON cursos.grado_id = grados.id
			INNER JOIN paralelos ON cursos.paralelo_id = paralelos.id
			INNER JOIN docentes ON asignados.docente_id = docentes.id
			WHERE asignados.docente_id ='.$this->request->query['docente_id']);
		endif;
        //pr($datas);
        
		$asignados = array();
        foreach($datas as $data):
            $asignado = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $asignado[$key] = $value;
                endforeach;                
            endforeach;
            array_push($asignados, $asignado);
        endforeach;
		//print_r("sii");
        $this->set(array(
            'asignados' => $asignados,
            '_serialize' => array('asignados')
        ));       
    }

    public function add(){
        $datasource = $this->Asignado->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try {
            $this->Asignado->create();
            
			$_asignado = array();
            $_asignado['docente_id'] = $this->request->data['docente_id']['id'];
            $_asignado['curso_id'] = $this->request->data['curso_id']['id'];
            $_asignado['asignatura_id'] = $this->request->data['asignatura_id']['id'];
            
			$this->Asignado->save($_asignado);
            $datasource->commit();
            $message = 'Guardado';
        } catch(Exception $e) {
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