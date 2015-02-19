<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class PromediodimensionController extends AppController{
    var $name = 'Promediodimension';//inicializacion de variables
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
            $evaluaciones[$value[0]['id']] = array();
            $promedios[$value[0]['id']][1]['promedio'] = 0;
            $promedios[$value[0]['id']][2]['promedio'] = 0;
            $promedios[$value[0]['id']][3]['promedio'] = 0;
            $promedios[$value[0]['id']][4]['promedio'] = 0;
            $promedios[$value[0]['id']][1]['valor'] = 0;
            $promedios[$value[0]['id']][2]['valor'] = 0;
            $promedios[$value[0]['id']][3]['valor'] = 0;
            $promedios[$value[0]['id']][4]['valor'] = 0;
            $notas[$value[0]['id']]['nota'] = 0;
        }

        // actividades de evaluacion
        //$
        $periodo = $this->request->query('periodo');
        $actividad = $this->request->query('actividad');
        $asignado = $this->request->query('asignado');        

        // Promedios por Dimnesiones        
        $_promedios = $this->Evaluacion->query('SELECT 
                                                promedios.inscrito_id as inscrito_id, 
                                                promedios.dimension_id as dimension_id,
                                                dimension.valor / 2 as valor,
                                                avg(promedios.promedio) as promedio
                                                FROM promedios
                                                INNER JOIN dimension ON promedios.dimension_id = dimension.id
                                                WHERE promedios.periodo_id = '.$periodo.'
                                                AND promedios.asignado_id = \''.$asignado.'\'
                                                GROUP BY promedios.inscrito_id, promedios.dimension_id, dimension.valor
                                                ORDER BY promedios.inscrito_id, promedios.dimension_id;');
       
        $Rpromedios = array();
        foreach($_promedios as $key => $value) {
            array_push($Rpromedios, $value[0]);    
        }                

        foreach ($Rpromedios as $key => $value) {            
            if(isset($promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['dimension_id']]['promedio'])):
                $promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['dimension_id']]['promedio'] = round($Rpromedios[$key]['promedio'],2);
            endif;
            if(isset($promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['dimension_id']]['valor'])):
                $promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['dimension_id']]['valor'] = round($Rpromedios[$key]['valor']);
            endif;
        }

        $_notas = $this->Evaluacion->query('SELECT promedios_finales.inscrito_id as inscrito_id,
                                    sum(promedios_finales.promedio) as nota
                                    FROM promedios_finales
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
        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
    }    
}
?>