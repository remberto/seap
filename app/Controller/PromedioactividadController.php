<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class PromedioactividadController extends AppController{
    var $name = 'Promedioactividad';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asignado','CriterioEvaluacion','Evaluacion','Inscrito','ActividadEvaluacion', 'Persona','Estudiante');
    //funcion de inicio

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index');        
    }

    public function index(){
        $evaluaciones = array();        
        $notas = array();
        $promedios = array();

        $curso = $this->request->query('curso');
        $_inscritos = $this->Inscrito->query('SELECT inscritos.id as id, 
                                            estudiantes.carnet_identidad as carnet, 
                                            estudiantes.codigo_rude as codigo_rude,
                                            personas.paterno as paterno,
                                            personas.materno as materno,
                                            personas.nombres as nombres,
                                            personas.fecha_nacimiento as fecha_nacimiento,
                                            personas.genero as genero
                                            FROM inscritos
                                            INNER JOIN estudiantes
                                            ON inscritos.estudiante_id = estudiantes.id
                                            INNER JOIN personas
                                            ON personas.id = estudiantes.id
                                            WHERE inscritos.curso_id = \''.$curso.'\' ORDER BY personas.paterno, personas.materno, personas.nombres;');
        $inscritos = array();
        foreach ($_inscritos as $key => $value) {
            array_push($inscritos, $value[0]);                        
            $promedios[$value[0]['id']] = array();
            $notas[$value[0]['id']]['nota'] = 0;
        }

        $periodo = $this->request->query('periodo');
        $actividad = $this->request->query('actividad');
        $asignado = $this->request->query('asignado');

        $_actividadevaluaciones=$this->ActividadEvaluacion->query('SELECT 
                                            actividad_evaluacion_asignado.id as id,
                                            actividad_evaluacion.descripcion as descripcion,
                                            actividad_evaluacion_asignado.orden as orden
                                            FROM actividad_evaluacion_asignado
                                            INNER JOIN actividad_evaluacion ON actividad_evaluacion_asignado.actividad_evaluacion_id = actividad_evaluacion.id
                                            WHERE actividad_evaluacion_asignado.asignado_id = \''.$asignado.'\'
                                            AND actividad_evaluacion_asignado.periodo_id = '.$periodo.';');
        $actividadevaluaciones=array();
        $_actividad_evaluacion=array();
        foreach($_actividadevaluaciones as $key=>$value){
            array_push($actividadevaluaciones,$value[0]);
            foreach ($promedios as $_key => $_value) {
                $promedios[$_key][$value[0]['id']]['evaluacion_promedio'] = 0;
                $promedios[$_key][$value[0]['id']]['reforzamiento_promedio'] = 0;
                $promedios[$_key][$value[0]['id']]['nota'] = 0;               
            }
            array_push($_actividad_evaluacion,array('id'=>$value[0]['id'],'descripcion'=>'Nota'));
            array_push($_actividad_evaluacion,array('id'=>$value[0]['id'],'descripcion'=>'Reforzamiento'));
            array_push($_actividad_evaluacion,array('id'=>$value[0]['id'],'descripcion'=>'Nota Final'));                        
        }        

        // Promedios por Dimnesiones        
        $_promedios = $this->Evaluacion->query('SELECT inscrito_id as inscrito_id,
                                                actividad_evaluacion_asignado_id as actividad_id,
                                                sum(evaluacion_promedio) AS evaluacion_promedio,
                                                sum(reforzamiento_promedio) AS reforzamiento_promedio,
                                                sum(promedio) AS nota
                                                FROM promedios
                                                WHERE promedios.periodo_id = '.$periodo.'
                                                AND promedios.asignado_id = \''.$asignado.'\'
                                                GROUP BY promedios.inscrito_id, promedios.actividad_evaluacion_asignado_id
                                                ORDER BY promedios.inscrito_id, promedios.actividad_evaluacion_asignado_id');
       
        $Rpromedios = array();
        foreach($_promedios as $key => $value) {
            array_push($Rpromedios, $value[0]);    
        }                

        foreach ($Rpromedios as $key => $value) {            
            if(isset($promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['actividad_id']]['nota'])):
                $promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['actividad_id']]['nota'] = round($Rpromedios[$key]['nota']);
            endif;            
            if(isset($promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['actividad_id']]['evaluacion_promedio'])):
                $promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['actividad_id']]['evaluacion_promedio'] = round($Rpromedios[$key]['evaluacion_promedio']);
            endif;            
            if(isset($promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['actividad_id']]['reforzamiento_promedio'])):
                $promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['actividad_id']]['reforzamiento_promedio'] = round($Rpromedios[$key]['reforzamiento_promedio']);
            endif;            
        }

        $_notas = $this->Evaluacion->query('SELECT 
                                    promedios_finales_actividad.inscrito_id as inscrito_id,
                                    avg(promedios_finales_actividad.promedio) as nota
                                    FROM promedios_finales_actividad
                                    WHERE periodo_id = '.$periodo.'                                      
                                    AND asignado_id = \''.$asignado.'\'
                                    GROUP BY inscrito_id;');

        $Rnotas = array();
        foreach($_notas as $key => $value) {
            array_push($Rnotas, $value[0]);    
        }        

        foreach ($Rnotas as $key => $value) {            
            if(isset($notas[$Rnotas[$key]['inscrito_id']]['nota'])):
                $notas[$Rnotas[$key]['inscrito_id']]['nota'] = round($Rnotas[$key]['nota']);
            endif;
        }

        
        $datos = array();
        $datos['notas'] = $notas;
        $datos['promedios'] = $promedios;
        $datos['inscritos'] = $inscritos;
        $datos['actividades'] = $actividadevaluaciones;
        $datos['actividad_evaluacion'] = $_actividad_evaluacion;
        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
    }    
}
?>