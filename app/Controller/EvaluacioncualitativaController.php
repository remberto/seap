<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class EvaluacioncualitativaController extends AppController{
    var $name = 'Evaluacioncualitativa';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asignado','Area','CriterioEvaluacion','Evaluacion', 'Dimension', 'Centralizador', 'Inscrito','EvaluacionCualitativa', 'Persona','Estudiante');
    //funcion de inicio

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index');
        $this->Auth->allow('add');        
    }

    public function index(){
        $evaluaciones = array();
        $promedios = array();
        $notas = array();

        $inscrito_id = $this->request->query('estudiante_id');
        

        $_areas = $this->Area->query('SELECT DISTINCT areas.id as id, areas.descripcion as descripcion, niveles.id as nivel_id FROM areas
                                        INNER JOIN asignaturas ON asignaturas.area_id = areas.id
                                        INNER JOIN niveles ON asignaturas.nivel_id = niveles.id
                                        INNER JOIN grados ON niveles.id = grados.nivel_id
                                        INNER JOIN cursos ON cursos.grado_id = grados.id
                                        INNER JOIN inscritos ON inscritos.curso_id = cursos.id
                                        WHERE inscritos.id = \''.$inscrito_id.'\' ORDER BY areas.id;');
        
        $areas = array();        
        foreach ($_areas as $key => $value) {
            array_push($areas, $value[0]);
        }

        $_dimensiones = $this->Dimension->query('SELECT id, descripcion, round(valor/2) as valor FROM dimension ORDER BY id');
        $dimensiones = array();        
        foreach ($_dimensiones as $key => $value) {
            array_push($dimensiones, $value[0]);
        }

        $periodo_id = $this->request->query('periodo_id');
        $_centralizador = $this->Centralizador->query('SELECT                                                         
                                                        centralizador.area_id as area_id,
                                                        avg(centralizador.ser) as ser,
                                                        avg(centralizador.saber) as saber,
                                                        avg(centralizador.hacer) as hacer,
                                                        avg(centralizador.decidir) as decidir
                                                        FROM centralizador
                                                        WHERE centralizador.inscrito_id = \''.$inscrito_id.'\'
                                                        AND centralizador.periodo_id = '.$periodo_id.'
                                                        GROUP BY centralizador.area_id;');
        
        $Rcentralizador = array();
        foreach($_centralizador as $key => $value) {
            array_push($Rcentralizador, $value[0]);    
        }

        $centralizador = array();
        foreach ($Rcentralizador as $key => $value) {
            $centralizador[$value['area_id']][1]['nota'] = round($value['ser']);
            $centralizador[$value['area_id']][2]['nota'] = round($value['saber']);
            $centralizador[$value['area_id']][3]['nota'] = round($value['hacer']);
            $centralizador[$value['area_id']][4]['nota'] = round($value['decidir']);
            if(round($value['ser']) == 1):
                $centralizador[$value['area_id']][1]['promedio_cualitativo'] = 'ED';
            elseif(round($value['ser']) == 2):
                $centralizador[$value['area_id']][1]['promedio_cualitativo'] = 'DA';
            elseif(round($value['ser']) == 3):
                $centralizador[$value['area_id']][1]['promedio_cualitativo'] = 'D0';
            elseif(round($value['ser']) == 4):
                $centralizador[$value['area_id']][1]['promedio_cualitativo'] = 'DP';
            endif;
            if(round($value['saber']) == 1):
                $centralizador[$value['area_id']][2]['promedio_cualitativo'] = 'ED';
            elseif(round($value['saber']) == 2):
                $centralizador[$value['area_id']][2]['promedio_cualitativo'] = 'DA';
            elseif(round($value['saber']) == 3):
                $centralizador[$value['area_id']][2]['promedio_cualitativo'] = 'D0';
            elseif(round($value['saber']) == 4):
                $centralizador[$value['area_id']][2]['promedio_cualitativo'] = 'DP';
            endif;
            if(round($value['hacer']) == 1):
                $centralizador[$value['area_id']][3]['promedio_cualitativo'] = 'ED';
            elseif(round($value['hacer']) == 2):
                $centralizador[$value['area_id']][3]['promedio_cualitativo'] = 'DA';
            elseif(round($value['hacer']) == 3):
                $centralizador[$value['area_id']][3]['promedio_cualitativo'] = 'D0';
            elseif(round($value['hacer']) == 4):
                $centralizador[$value['area_id']][3]['promedio_cualitativo'] = 'DP';
            endif;
            if(round($value['decidir']) == 1):
                $centralizador[$value['area_id']][4]['promedio_cualitativo'] = 'ED';
            elseif(round($value['decidir']) == 2):
                $centralizador[$value['area_id']][4]['promedio_cualitativo'] = 'DA';
            elseif(round($value['decidir']) == 3):
                $centralizador[$value['area_id']][4]['promedio_cualitativo'] = 'D0';
            elseif(round($value['decidir']) == 4):
                $centralizador[$value['area_id']][4]['promedio_cualitativo'] = 'DP';
            endif;                        
        }

        $_promedios = $this->Centralizador->query('SELECT                                                         
                                                        avg(centralizador.ser) as ser,
                                                        avg(centralizador.saber) as saber,
                                                        avg(centralizador.hacer) as hacer,
                                                        avg(centralizador.decidir) as decidir
                                                        FROM centralizador
                                                        WHERE centralizador.inscrito_id = \''.$inscrito_id.'\'
                                                        AND centralizador.periodo_id = '.$periodo_id.';');

        $Rpromedios = array();
        foreach($_promedios as $key => $value) {
            array_push($Rpromedios, $value[0]);    
        }

        $promedios = array();
        foreach ($Rpromedios as $key => $value) {
            $promedios[1]['nota'] = round($value['ser']);
            $promedios[2]['nota'] = round($value['saber']);
            $promedios[3]['nota'] = round($value['hacer']);
            $promedios[4]['nota'] = round($value['decidir']);
            if(round($value['ser']) == 1):
                $promedios[1]['promedio_cualitativo'] = 'ED';
            elseif(round($value['ser']) == 2):
                $promedios[1]['promedio_cualitativo'] = 'DA';
            elseif(round($value['ser']) == 3):
                $promedios[1]['promedio_cualitativo'] = 'D0';
            elseif(round($value['ser']) == 4):
                $promedios[1]['promedio_cualitativo'] = 'DP';
            endif;
            if(round($value['saber']) == 1):
                $promedios[2]['promedio_cualitativo'] = 'ED';
            elseif(round($value['saber']) == 2):
                $promedios[2]['promedio_cualitativo'] = 'DA';
            elseif(round($value['saber']) == 3):
                $promedios[2]['promedio_cualitativo'] = 'D0';
            elseif(round($value['saber']) == 4):
                $promedios[2]['promedio_cualitativo'] = 'DP';
            endif;
            if(round($value['hacer']) == 1):
                $promedios[3]['promedio_cualitativo'] = 'ED';
            elseif(round($value['hacer']) == 2):
                $promedios[3]['promedio_cualitativo'] = 'DA';
            elseif(round($value['hacer']) == 3):
                $promedios[3]['promedio_cualitativo'] = 'D0';
            elseif(round($value['hacer']) == 4):
                $promedios[3]['promedio_cualitativo'] = 'DP';
            endif;
            if(round($value['decidir']) == 1):
                $promedios[4]['promedio_cualitativo'] = 'ED';
            elseif(round($value['decidir']) == 2):
                $promedios[4]['promedio_cualitativo'] = 'DA';
            elseif(round($value['decidir']) == 3):
                $promedios[4]['promedio_cualitativo'] = 'D0';
            elseif(round($value['decidir']) == 4):
                $promedios[4]['promedio_cualitativo'] = 'DP';
            endif;   

        }

        $_valoracion_cualitativa = $this->EvaluacionCualitativa->find('first',array('conditions'=>array('EvaluacionCualitativa.inscrito_id'=>$inscrito_id,
                                                                                                   'EvaluacionCualitativa.periodo_id'=>$periodo_id)));

        if(!empty($_valoracion_cualitativa)):
            $valoracion_cualitativa['id'] = $_valoracion_cualitativa['EvaluacionCualitativa']['id'];
            $valoracion_cualitativa['valoracion_cualitativa'] = $_valoracion_cualitativa['EvaluacionCualitativa']['valoracion_cualitativa'];
        else:
            $valoracion_cualitativa = null;
        endif;
        $datos = array();        
        $datos['areas'] = $areas;
        $datos['dimensiones'] = $dimensiones;
        $datos['centralizador'] = $centralizador;        
        $datos['promedios'] = $promedios;
        $datos['valoracion_cualitativa'] = $valoracion_cualitativa;
        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
    }

    public function add(){
        $datasource = $this->EvaluacionCualitativa->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            $_evaluacion = array();            
            if(isset($this->request->data['id'])):
                $_evaluacion['id'] = $this->request->data['id'];
            else:
                $this->EvaluacionCualitativa->create();            
            endif;
                        
            $_evaluacion['inscrito_id'] = $this->request->data['inscrito_id'];
            $_evaluacion['periodo_id'] = $this->request->data['periodo_id'];
            $_evaluacion['valoracion_cualitativa'] = $this->request->data['valoracion_cualitativa'];            
            
            $this->EvaluacionCualitativa->save($_evaluacion);

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se Guardo Correctamente la Evaluacion';
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
    
}
?>