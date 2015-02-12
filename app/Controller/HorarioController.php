<?php

App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');

class HorarioController extends AppController{

	var $name = 'Horario';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Dia','PeriodoHorario','DocenteUe','Curso','Asignado','Horario');

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('index');
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('delete');

    }

    public function index() {
        $horario = array();                        

        $_periodos = $this->PeriodoHorario->find('all',array('order'=>array('PeriodoHorario.numero_periodo')));        

        $periodos = array();

        foreach($_periodos as $data):
            $periodo = array();
            foreach ($data as $key => $val):
                foreach ($val as $key => $value):
                    $periodo[$key] = $value;
                endforeach;
            endforeach;
            array_push($periodos, $periodo);            
            $horario[$periodo['id']] = array();
        endforeach;

        $_dias = $this->Dia->find('all', array('conditions'=>array('habil'=>true)));        

        $dias = array();

        foreach($_dias as $data):
            $dia = array();
            foreach ($data as $key => $val):
                foreach ($val as $key => $value):
                    $dia[$key] = $value;
                endforeach;
            endforeach;
            array_push($dias, $dia);            
            foreach ($horario as $_key => $_value) {                
                $horario[$_key][$dia['id']]['id'] = 0;
                $horario[$_key][$dia['id']]['nivel'] = 0;
                $horario[$_key][$dia['id']]['grado'] = 0;
                $horario[$_key][$dia['id']]['paralelo'] = 0;
                $horario[$_key][$dia['id']]['asignatura'] = 0;
                $horario[$_key][$dia['id']]['color'] = 0;
            }      
        endforeach;
              
               
        
        $_horario = $this->Horario->query('SELECT horario.id as id,
                                            horario.periodo_id as periodo_id,
                                            horario.dia_id as dias_id,
                                            niveles.descripcion as nivel,
                                            grados.descripcion as grado,
                                            paralelos.descripcion as paralelo,
                                            asignaturas.descripcion as asignatura,
                                            horario.color as color FROM horario
                                            INNER JOIN asignados
                                            ON horario.asignado_id = asignados.id
                                            INNER JOIN docente_ue
                                            ON asignados.docente_id = docente_ue.id
                                            INNER JOIN cursos
                                            ON asignados.curso_id = cursos.id
                                            INNER JOIN grados
                                            ON cursos.grado_id = grados.id
                                            INNER JOIN niveles
                                            ON grados.nivel_id = niveles.id
                                            INNER JOIN paralelos
                                            ON cursos.paralelo_id = paralelos.id
                                            INNER JOIN asignaturas
                                            ON asignados.asignatura_id = asignaturas.id 
                                            WHERE docente_ue.docente_id = \''.$this->request->query['docente_id'].'\''); 

        $Rhorario = array();
        foreach ($_horario as $key => $value) {
            array_push($Rhorario, $value[0]);    
        }        
        
        foreach ($Rhorario as $key => $value) {            
            if(isset($horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['id'])):
                $horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['id'] = $Rhorario[$key]['id'];
            endif;
            if(isset($horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['nivel'])):
                $horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['nivel'] = $Rhorario[$key]['nivel'];
            endif;
            if(isset($horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['grado'])):
                $horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['grado'] = $Rhorario[$key]['grado'];
            endif;
            if(isset($horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['paralelo'])):
                $horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['paralelo'] = $Rhorario[$key]['paralelo'];
            endif;
            if(isset($horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['asignatura'])):
                $horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['asignatura'] = $Rhorario[$key]['asignatura'];
            endif;
            if(isset($horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['color'])):
                $horario[$Rhorario[$key]['periodo_id']][$Rhorario[$key]['dias_id']]['color'] = $Rhorario[$key]['color'];
            endif;
        }      
        
        $datos['horario'] = $horario;
        $datos['dias'] = $dias;
        $datos['periodos'] = $periodos;         
        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
    }

    public function add(){
        $datasource = $this->Curso->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            // Buscamos si existe el curso
            // 
            
            $_curso = array();
            $_curso['gestion_id'] = $this->request->data['Gestion'];
            $_curso['unidad_educativa_id'] = $this->request->data['UnidadEducativa']['id'];
            $_curso['grado_id'] = $this->request->data['Grado']['id'];
            $_curso['paralelo_id'] = $this->request->data['Paralelo']['id'];
            $_curso['turno_id'] = $this->request->data['Turno']['id'];
            $_curso['cupo'] = $this->request->data['cupo'];
            
            $_find_curso = $this->Curso->find('first',
                    array('conditions'=>array('Curso.gestion_id'=> $_curso['gestion_id'],
                                              'Curso.unidad_educativa_id'=> $_curso['unidad_educativa_id'],
                                              'Curso.grado_id'=> $_curso['grado_id'],
                                              'Curso.paralelo_id'=> $_curso['paralelo_id'],
                                              'Curso.turno_id'=> $_curso['turno_id']
                    )));                       
                        
            if(empty($_find_curso)):
                $this->Curso->create();
                $this->Curso->save($_curso);
                $id_curso = $this->Curso->getLastInsertID();
            else:
                $id_curso = $_find_curso['Curso']['id'];
            endif;

            $_docente_ue = $this->DocenteUe->find('first',
                array('conditions'=>array('DocenteUe.docente_id'=>$this->request->data['docente_id'],
                                          'DocenteUe.unidad_educativa_id'=>$this->request->data['UnidadEducativa']['id'])));
            

            $_asignado = array();
            $_asignado['docente_id'] = $_docente_ue['DocenteUe']['id'];
            $_asignado['curso_id'] = $id_curso;
            $_asignado['asignatura_id'] = $this->request->data['asignatura']['id'];            

            $_find_asignado = $this->Asignado->find('first',
                                                    array('conditions'=>array('Asignado.docente_id' => $_asignado['docente_id'],
                                                                              'Asignado.curso_id' => $_asignado['curso_id'],
                                                                              'Asignado.asignatura_id' => $_asignado['asignatura_id'])));

            if(empty($_find_asignado)):
                $this->Asignado->create();           
                $this->Asignado->save($_asignado);
                $id_asignado = $this->Asignado->getLastInsertID();
            else:
                $id_asignado = $_find_asignado['Asignado']['id'];
            endif;

            $this->Horario->create();
            
            $_horario = array();
            $_horario['asignado_id'] = $id_asignado;
            $_horario['dia_id'] = $this->request->data['dia_id'];
            $_horario['periodo_id'] = $this->request->data['periodo_id'];
            $_horario['color'] = $this->request->data['color'];            
            $this->Horario->save($_horario);

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se Guardo Correctamente el Curso';
        }catch(Exception $e) {
            $datasource->rollback();
            $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
            if($e->getCode() == 23505) { $message['mensaje'] = 'Error al Guardar datos, el Curso ya existe !!!';}
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
        $datasource = $this->Horario->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            if($this->Horario->delete($id)):
                $message['eliminado'] = true;
                $message['mensaje'] = 'Fue dado de baja correctamente la Clase';
            else:
                $message['eliminado'] = false;
                $message['mensaje'] = 'Error';
            endif;
            $datasource->commit();
        }catch(Exception $e) {
            $datasource->rollback();
            $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
            if($e->getCode() == 23503) { $message['mensaje'] = 'Error al eliminar la Clase';}
            $message['guardado'] = false;
            
        }       
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
           ));
    }

}
?>