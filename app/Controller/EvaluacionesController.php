<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class EvaluacionesController extends AppController{
    var $name = 'Evaluaciones';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asignado','CriterioEvaluacion','Evaluacion','Inscrito','ActividadEvaluacion', 'Persona','Estudiante');
    //funcion de inicio

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index');
        $this->Auth->allow('add');
        $this->Auth->allow('accion');
        $this->Auth->allow('reforzamiento');
    }

    public function index(){
        $evaluaciones = array();
        $promedios = array();
        $notas = array();

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
            $promedios[$value[0]['id']] = array();
            $notas[$value[0]['id']]['nota'] = 0;
        }

        // actividades de evaluacion
        //$
        $periodo = $this->request->query('periodo');
        $actividad = $this->request->query('actividad');
        $asignado = $this->request->query('asignado_id');

        $_dimensiones = $this->CriterioEvaluacion->query('SELECT 
                                                        dimension.id as id, 
                                                        dimension.descripcion as dimension,
                                                        count(*) + 1 as columnas
                                                        FROM criterios_evaluacion
                                                        INNER JOIN dimension ON criterios_evaluacion.dimension_id = dimension.id
                                                        INNER JOIN actividad_evaluacion_asignado ON criterios_evaluacion.actividad_evaluacion_asignado_id = actividad_evaluacion_asignado.id
                                                        WHERE actividad_evaluacion_asignado.periodo_id = \''.$periodo.'\'
                                                        AND criterios_evaluacion.actividad_evaluacion_asignado_id = \''.$actividad.'\'
                                                        AND actividad_evaluacion_asignado.asignado_id = \''.$asignado.'\'                                                        
                                                        GROUP BY dimension.id, dimension.descripcion ORDER BY dimension.id;');

        $dimensiones = array();
        $criterios = array(); 
        foreach ($_dimensiones as $key => $value) {
            array_push($dimensiones, $value[0]);           
        }

        $_criterios = $this->CriterioEvaluacion->query('SELECT 
                                                        dimension.id as iddimension, 
                                                        dimension.descripcion as dimension,
                                                        dimension.valor as valor,
                                                        criterios_evaluacion.id as idcriterio,
                                                        criterios_evaluacion.criterio as criterio
                                                        FROM criterios_evaluacion
                                                        INNER JOIN dimension ON criterios_evaluacion.dimension_id = dimension.id
                                                        INNER JOIN actividad_evaluacion_asignado ON criterios_evaluacion.actividad_evaluacion_asignado_id = actividad_evaluacion_asignado.id
                                                        WHERE actividad_evaluacion_asignado.periodo_id = \''.$periodo.'\'                                             
                                                        AND criterios_evaluacion.actividad_evaluacion_asignado_id = \''.$actividad.'\'
                                                        AND actividad_evaluacion_asignado.asignado_id = \''.$asignado.'\'
                                                        ORDER BY dimension.id, criterios_evaluacion.id;');
                    
        if(!empty($_criterios)):
            $_idDimesion = $_criterios[0][0]['iddimension'];
            $_idDimesion_desc = $_criterios[0][0]['dimension'];        
            foreach ($_criterios as $key => $value) {
                if($_idDimesion == $value[0]['iddimension']){
                    array_push($criterios, $value[0]);
                }else{                
                    $criterio = array();
                    $criterio['iddimension'] = $_idDimesion;
                    $criterio['descripcion'] = $_idDimesion_desc;
                    $criterio['idcriterio'] = $_idDimesion;
                    $criterio['criterio'] = 'Promedio';
                    array_push($criterios, $criterio);
                    array_push($criterios, $value[0]);
                    $_idDimesion = $value[0]['iddimension'];
                    $_idDimesion_desc = $value[0]['dimension'];
                }
                foreach ($evaluaciones as $_key => $_value) {
                    $evaluaciones[$_key][$value[0]['idcriterio']]['id'] = 0;
                    $evaluaciones[$_key][$value[0]['idcriterio']]['cuantitativo'] = 0;
                    $evaluaciones[$_key][$value[0]['idcriterio']]['cualitativo'] = 0;
                    $evaluaciones[$_key][$value[0]['idcriterio']]['valor'] = 0;
                    $evaluaciones[$_key][$value[0]['idcriterio']]['observaciones'] = '';
                    $evaluaciones[$_key][$value[0]['idcriterio']]['reforzamiento_cuantitativo'] = 0;
                    $evaluaciones[$_key][$value[0]['idcriterio']]['reforzamiento_cualitativo'] = 0;
                    $evaluaciones[$_key][$value[0]['idcriterio']]['reforzamiento_valor'] = 0;
                    $evaluaciones[$_key][$value[0]['idcriterio']]['reforzamiento_observaciones'] = '';
                    $evaluaciones[$_key][$value[0]['idcriterio']]['nota_cuantitativo'] = 0;
                    $evaluaciones[$_key][$value[0]['idcriterio']]['nota_cualitativo'] = 0;
                    $evaluaciones[$_key][$value[0]['idcriterio']]['nota_valor'] = 0;
                    $promedios[$_key][$value[0]['iddimension']]['promedio'] = 0;
                    $promedios[$_key][$value[0]['iddimension']]['valor'] = 0;
                }
            }
            $criterio = array();
            $criterio['iddimension'] = $_idDimesion;
            $criterio['descripcion'] = $_idDimesion_desc;
            $criterio['idcriterio'] = $_idDimesion;
            $criterio['criterio'] = 'Promedio';
            array_push($criterios, $criterio);
        endif;
                


        $_evaluaciones = $this->Evaluacion->query('SELECT evaluaciones.id as id, 
                                                     evaluaciones.inscrito_id as inscrito_id, 
                                                     evaluaciones.criterio_de_evaluacion_id as criterio_id,
                                                     evaluaciones.cuantitativo as cuantitativo,
                                                     evaluaciones.valor as convertida,
                                                     evaluacion_cualitativo.abreviacion as cualitativo,
                                                     evaluaciones.observaciones as observaciones,
                                                     evaluaciones.reforzamiento_cuantitativo as reforzamiento_cuantitativo,
                                                     evaluaciones.reforzamiento_valor as reforzamiento_convertida,
                                                     evaluacion_cualitativo_1.abreviacion as reforzamiento_cualitativo,
                                                     evaluaciones.reforzamiento_observaciones as reforzamiento_observaciones,
                                                     evaluaciones.nota_cuantitativo as nota_cuantitativo,
                                                     evaluaciones.nota_valor as nota_convertida,
                                                     evaluacion_cualitativo_2.abreviacion as nota_cualitativo
                                                     FROM evaluaciones
                                                     INNER JOIN evaluacion_cualitativo ON evaluaciones.cualitativo = evaluacion_cualitativo.id
                                                     INNER JOIN evaluacion_cualitativo evaluacion_cualitativo_1 ON evaluaciones.reforzamiento_cualitativo = evaluacion_cualitativo_1.id
                                                     INNER JOIN evaluacion_cualitativo evaluacion_cualitativo_2 ON evaluaciones.nota_cualitativo = evaluacion_cualitativo_2.id
                                                     INNER JOIN criterios_evaluacion ON criterio_de_evaluacion_id = criterios_evaluacion.id
                                                     INNER JOIN actividad_evaluacion_asignado ON criterios_evaluacion.actividad_evaluacion_asignado_id = actividad_evaluacion_asignado.id
                                                     WHERE actividad_evaluacion_asignado.periodo_id = '.$periodo.'
                                                    AND criterios_evaluacion.actividad_evaluacion_asignado_id = \''.$actividad.'\' 
                                                    AND actividad_evaluacion_asignado.asignado_id = \''.$asignado.'\';');
        $Revaluaciones = array();
        foreach($_evaluaciones as $key => $value) {
            array_push($Revaluaciones, $value[0]);    
        }                
        
        foreach ($Revaluaciones as $key => $value) {
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['id'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['id'] = $Revaluaciones[$key]['id'];
            endif;            
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['cuantitativo'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['cuantitativo'] = $Revaluaciones[$key]['cuantitativo'];
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['cualitativo'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['cualitativo'] = $Revaluaciones[$key]['cualitativo'];
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['valor'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['valor'] = round($Revaluaciones[$key]['convertida']);
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['observaciones'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['observaciones'] = $Revaluaciones[$key]['observaciones'];
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['reforzamiento_cuantitativo'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['reforzamiento_cuantitativo'] = $Revaluaciones[$key]['reforzamiento_cuantitativo'];
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['reforzamiento_cualitativo'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['reforzamiento_cualitativo'] = $Revaluaciones[$key]['reforzamiento_cualitativo'];
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['reforzamiento_valor'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['reforzamiento_valor'] = round($Revaluaciones[$key]['reforzamiento_convertida']);
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['reforzamiento_observaciones'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['reforzamiento_observaciones'] = $Revaluaciones[$key]['reforzamiento_observaciones'];
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['nota_cuantitativo'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['nota_cuantitativo'] = $Revaluaciones[$key]['nota_cuantitativo'];
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['nota_cualitativo'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['nota_cualitativo'] = $Revaluaciones[$key]['nota_cualitativo'];
            endif;
            if(isset($evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['nota_valor'])):
                $evaluaciones[$Revaluaciones[$key]['inscrito_id']][$Revaluaciones[$key]['criterio_id']]['nota_valor'] = round($Revaluaciones[$key]['nota_convertida']);
            endif;
        }

        // Promedios por Dimnesiones
        
        $_promedios = $this->Evaluacion->query('SELECT evaluaciones.inscrito_id as inscrito_id, 
                                                criterios_evaluacion.dimension_id as dimension_id,
                                                dimension.valor / 2 as valor,
                                                avg(evaluaciones.nota_valor) as promedio
                                                FROM evaluaciones
                                                INNER JOIN evaluacion_cualitativo ON evaluaciones.cualitativo = evaluacion_cualitativo.id
                                                INNER JOIN criterios_evaluacion ON criterio_de_evaluacion_id = criterios_evaluacion.id
                                                INNER JOIN actividad_evaluacion_asignado ON criterios_evaluacion.actividad_evaluacion_asignado_id = actividad_evaluacion_asignado.id
                                                INNER JOIN dimension ON criterios_evaluacion.dimension_id = dimension.id
                                                WHERE actividad_evaluacion_asignado.periodo_id = '.$periodo.'
                                                AND criterios_evaluacion.actividad_evaluacion_asignado_id = \''.$actividad.'\' 
                                                AND actividad_evaluacion_asignado.asignado_id = \''.$asignado.'\'
                                                GROUP BY evaluaciones.inscrito_id, criterios_evaluacion.dimension_id, dimension.valor
                                                ORDER BY evaluaciones.inscrito_id, criterios_evaluacion.dimension_id;');
        $Rpromedios = array();
        foreach($_promedios as $key => $value) {
            array_push($Rpromedios, $value[0]);    
        }        

        foreach ($Rpromedios as $key => $value) {            
            if(isset($promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['dimension_id']]['promedio'])):
                $promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['dimension_id']]['promedio'] = round($Rpromedios[$key]['promedio']);
            endif;
            if(isset($promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['dimension_id']]['valor'])):
                $promedios[$Rpromedios[$key]['inscrito_id']][$Rpromedios[$key]['dimension_id']]['valor'] = round($Rpromedios[$key]['valor']);
            endif;
        }

        $_notas = $this->Evaluacion->query('SELECT inscrito_id as inscrito_id,
                                    sum(promedio) AS nota
                                    FROM promedios
                                    WHERE periodo_id = '.$periodo.'
                                    AND actividad_evaluacion_asignado_id = \''.$actividad.'\'  
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
        $datos['evaluaciones'] = $evaluaciones;
        $datos['promedios'] = $promedios;
        $datos['notas'] = $notas;
        $datos['inscritos'] = $inscritos;
        $datos['dimensiones'] =  $dimensiones;
        $datos['criterios'] =  $criterios;
        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
    }

    public function add(){
        $datasource = $this->Evaluacion->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{            
            $_evaluacion = array();
            $_evaluacion['asignado_id'] = $this->request->data['asignado_id'];
            $_evaluacion['inscrito_id'] = $this->request->data['inscrito_id'];
            $_evaluacion['criterio_de_evaluacion_id'] = $this->request->data['criterio_id'];
            $_evaluacion['cuantitativo'] = $this->request->data['cuantitativo'];
            $_evaluacion['cualitativo'] = $this->request->data['cualitativo'];
            $_evaluacion['valor'] = $this->request->data['convertida'];
            if(isset($this->request->data['observaciones'])):
                $_evaluacion['observaciones'] = $this->request->data['observaciones'];
            endif;
            if(!isset($this->request->data['id'])):
                $this->Evaluacion->create();
                $_evaluacion['reforzamiento_cuantitativo'] = 0;
                $_evaluacion['reforzamiento_cualitativo'] = 0;
                $_evaluacion['reforzamiento_valor'] = 0;
                $_evaluacion['reforzamiento_observaciones'] = '';
                $_evaluacion['nota_cuantitativo'] = $_evaluacion['cuantitativo'];
                $_evaluacion['nota_cualitativo'] = $_evaluacion['cualitativo'];
                $_evaluacion['nota_valor'] = $_evaluacion['valor'];                
            else:
                $_evaluacion['id'] = $this->request->data['id'];                
                if($this->request->data['reforzamiento_cuantitativo'] >= $this->request->data['cuantitativo']):
                    $_evaluacion['nota_cuantitativo'] = round(($this->request->data['reforzamiento_cuantitativo'] + $this->request->data['cuantitativo'])/2);
                    $_evaluacion['nota_valor'] = round(($this->request->data['reforzamiento_convertida'] + $this->request->data['convertida'])/2);
                    if($_evaluacion['nota_cuantitativo'] <= 51):
                        $_evaluacion['nota_cualitativo'] = 1;
                    elseif ($_evaluacion['nota_cuantitativo'] >  51 && $_evaluacion['nota_cuantitativo'] <= 68):
                        $_evaluacion['nota_cualitativo'] = 2;
                    elseif ($_evaluacion['nota_cuantitativo'] >  68 && $_evaluacion['nota_cuantitativo'] <= 84):
                        $_evaluacion['nota_cualitativo'] = 3;
                    elseif ($_evaluacion['nota_cuantitativo'] >  84 && $_evaluacion['nota_cuantitativo'] <= 100):
                        $_evaluacion['nota_cualitativo'] = 4;
                    endif;
                else:                    
                    $_evaluacion['nota_cuantitativo'] = $_evaluacion['cuantitativo'];
                    $_evaluacion['nota_cualitativo'] = $_evaluacion['cualitativo'];
                    $_evaluacion['nota_valor'] = $_evaluacion['valor'];   
                endif;
            endif;
            
            $this->Evaluacion->save($_evaluacion);

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se Guardo Correctamente la Evaluacion';
        }catch(Exception $e) {
            $datasource->rollback();
            $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
            if($e->getCode() == 23505) { $message['mensaje'] = 'Error al Guardar datos, la Evaluacion ya Existe !!!';}
            $message['guardado'] = false;
            
        }       

        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }

    public function accion($id){
        if($this->request->query['accion']=='delete'):
            $this->delete($id);
        elseif($this->request->query['accion']=='reforzamiento'):            
            $evaluaciones = json_decode($this->request->query['evaluaciones'], true);
            $this->reforzamiento($id, $evaluaciones);
        endif;
    }

    public function reforzamiento($id, $evaluaciones){
        $datasource = $this->Evaluacion->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{            
            $_evaluacion['id'] = $id;            
            $_evaluacion['reforzamiento_cuantitativo'] = $evaluaciones['reforzamiento_cuantitativo'];
            $_evaluacion['reforzamiento_cualitativo'] = $evaluaciones['reforzamiento_cualitativo'];
            $_evaluacion['reforzamiento_valor'] = $evaluaciones['reforzamiento_convertida'];
            if(isset($evaluaciones['reforzamiento_observaciones'])):
                $_evaluacion['reforzamiento_observaciones'] = $evaluaciones['reforzamiento_observaciones'];           
            endif;
            if($evaluaciones['reforzamiento_cuantitativo'] >= $evaluaciones['cuantitativo']):
                $_evaluacion['nota_cuantitativo'] = round(($evaluaciones['reforzamiento_cuantitativo'] + $evaluaciones['cuantitativo'])/2);
                $_evaluacion['nota_valor'] = round(($evaluaciones['reforzamiento_convertida'] + $evaluaciones['valor'])/2);
                if($_evaluacion['nota_cuantitativo'] <= 51):
                    $_evaluacion['nota_cualitativo'] = 1;
                elseif ($_evaluacion['nota_cuantitativo'] >  51 && $_evaluacion['nota_cuantitativo'] <= 68):
                    $_evaluacion['nota_cualitativo'] = 2;
                elseif ($_evaluacion['nota_cuantitativo'] >  68 && $_evaluacion['nota_cuantitativo'] <= 84):
                    $_evaluacion['nota_cualitativo'] = 3;
                elseif ($_evaluacion['nota_cuantitativo'] >  84 && $_evaluacion['nota_cuantitativo'] <= 100):
                    $_evaluacion['nota_cualitativo'] = 4;
                endif;
            else:

            endif;
            $this->Evaluacion->save($_evaluacion);

            $datasource->commit();
            $message['guardado'] = true;
            $message['mensaje'] = 'Se Guardo Correctamente la Evaluacion de Reforzamiento';
        }catch(Exception $e) {
            $datasource->rollback();
            $message['mensaje'] = 'Error al Guardar los datos'.$e->getMessage();
            if($e->getCode() == 23505) { $message['mensaje'] = 'Error al Guardar datos, el Evaluacion ya existe !!!';}
            $message['guardado'] = false;
            
        }       

        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));    
    }
    public function delete($id){
        
    }
}
?>