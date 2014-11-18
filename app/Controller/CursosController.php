<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class CursosController extends AppController{
    var $name = 'Estudiantes';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Curso');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('index');
    }

    public function index() {
		if(isset($this->request->query['ue_id']) && isset($this->request->query['gestion_id'])):
            //Retorna los cursos de una UE
			$datas = $this->Curso->query('SELECT cursos.id as id,		
			niveles.descripcion as nivel, grados.descripcion as grado, turnos.descripcion as turno, paralelos.descripcion as paralelo
			FROM cursos
			INNER JOIN gestiones ON cursos.gestion_id = gestiones.id
			INNER JOIN unidades_educativas ON cursos.unidad_educativa_id = unidades_educativas.id
			INNER JOIN grados ON cursos.grado_id = grados.id
			INNER JOIN niveles ON grados.nivel_id = niveles.id
			INNER JOIN paralelos ON cursos.paralelo_id = paralelos.id
			INNER JOIN turnos ON cursos.turno_id = turnos.id
			AND cursos.gestion_id = '.$this->request->query['gestion_id'].' AND cursos.unidad_educativa_id ='.$this->request->query['ue_id']);
        elseif (isset($this->request->query['docente_id']) && isset($this->request->query['gestion_id'])):            
			//Selecciona los cursos de acuerdo a docente
            /*$this->request->query['gestion_id'];
            ;*/
            $query = 'SELECT cursos.id as id,       
            niveles.descripcion as nivel, grados.descripcion as grado, turnos.descripcion as turno, paralelos.descripcion as paralelo
            FROM asignados
            INNER JOIN cursos ON asignados.curso_id = cursos.id
            INNER JOIN gestiones ON cursos.gestion_id = gestiones.id
            INNER JOIN unidades_educativas ON cursos.unidad_educativa_id = unidades_educativas.id
            INNER JOIN grados ON cursos.grado_id = grados.id
            INNER JOIN niveles ON grados.nivel_id = niveles.id
            INNER JOIN paralelos ON cursos.paralelo_id = paralelos.id
            INNER JOIN turnos ON cursos.turno_id = turnos.id
            WHERE gestiones.id = :gestion_id 
            AND asignados.docente_id = \':docente_id\'
            GROUP BY cursos.id,       
            niveles.descripcion, grados.descripcion, turnos.descripcion, paralelos.descripcion
            ORDER BY niveles.descripcion, grados.descripcion, turnos.descripcion, paralelos.descripcion';
            $query = str_replace(':gestion_id', $this->request->query['gestion_id'], $query);
            $query = str_replace(':docente_id', $this->request->query['docente_id'], $query);
            $datas = $this->Curso->query($query);
        else:
			$datas = $this->Curso->query('SELECT cursos.id as id, cursos.gestion_id as gestion_id, gestiones.gestion as gestion,
			cursos.unidad_educativa_id as unidad_educativa_id, unidades_educativas.descripcion as unidad_educativa,
			cursos.grado_id as grado_id, niveles.descripcion as nivel, grados.descripcion as grado,
			cursos.paralelo_id as paralelo_id, paralelos.descripcion as paralelo,
			cursos.turno_id as turno_id, turnos.descripcion as turno FROM cursos 
												  INNER JOIN gestiones ON cursos.gestion_id = gestiones.id
			INNER JOIN unidades_educativas ON cursos.unidad_educativa_id = unidades_educativas.id
			INNER JOIN grados ON cursos.grado_id = grados.id
			INNER JOIN niveles ON grados.nivel_id = niveles.id
			INNER JOIN paralelos ON cursos.paralelo_id = paralelos.id
			INNER JOIN turnos ON cursos.turno_id = turnos.id');
		endif;
        
        $cursos = array();
        foreach($datas as $data):
            $curso = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $curso[$key] = $value;
                endforeach;                
            endforeach;
            array_push($cursos, $curso);
        endforeach;
        $this->set(array(
            'cursos' => $cursos,
            '_serialize' => array('cursos')
        ));       
    }
	
    public function add(){
        $datasource = $this->Curso->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            $this->Curso->create();
            $_curso = array();
            $_curso['gestion_id'] = $this->request->data['gestion_id']['id'];
            $_curso['unidad_educativa_id'] = $this->request->data['unidad_educativa_id']['id'];
            $_curso['grado_id'] = $this->request->data['grado_id']['id'];
            $_curso['paralelo_id'] = $this->request->data['paralelo_id']['id'];
            $_curso['turno_id'] = $this->request->data['turno_id']['id'];           
            $this->Curso->save($_curso);
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