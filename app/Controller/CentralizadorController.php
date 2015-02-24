<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class CentralizadorController extends AppController{
    var $name = 'Centralizador';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asignado','Area','CriterioEvaluacion','Evaluacion', 'Centralizador', 'Inscrito','ActividadEvaluacion', 'Persona','Estudiante');
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

        $curso_id = $this->request->query('curso_id');
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
                                            WHERE inscritos.curso_id = \''.$curso_id.'\' ORDER BY personas.paterno, personas.materno, personas.nombres;');
        $inscritos = array();
        foreach ($_inscritos as $key => $value) {
            array_push($inscritos, $value[0]);                        
        }

        $_areas = $this->Area->query('SELECT DISTINCT areas.id as id, areas.descripcion as descripcion FROM areas
                                        INNER JOIN asignaturas ON asignaturas.area_id = areas.id
                                        INNER JOIN niveles ON asignaturas.nivel_id = niveles.id
                                        INNER JOIN grados ON niveles.id = grados.nivel_id
                                        INNER JOIN cursos ON cursos.grado_id = grados.id
                                        WHERE cursos.id = \''.$curso_id.'\' ORDER BY areas.id;');

        $_periodos = array(1=>array('id'=>1,'descripcion'=>'1er. Bimestre'),2=>array('id'=>2,'descripcion'=>'2do. Bimestre'),3=>array('id'=>3,'descripcion'=>'3er. Bimestre'),4=>array('id'=>4,'descripcion'=>'4to. Bimestre'),5=>array('id'=>5,'descripcion'=>'Promedio'));
        $areas = array();
        $periodos = array();
        foreach ($_areas as $key => $value) {
            array_push($areas, $value[0]);
            foreach ($_periodos as $_key => $_value) {
                $_value['area'] = $value[0]['descripcion'];
                $_value['id'] = $value[0]['id'].$_key;
                array_push($periodos,$_value); 
            }
        }

        // Cargar al centralizador
        // 1. Eliminar todas las cargas desde nuestra fuente
        $this->Centralizador->deleteAll(array('Centralizador.curso_id'=>$curso_id), false);
        $_evaluaciones = $this->Evaluacion->query('SELECT 
                                                    prev_centralizador.curso_id as curso_id,
                                                    prev_centralizador.gestion_id as gestion_id,
                                                    prev_centralizador.unidad_educativa_id as unidad_educativa_id,
                                                    prev_centralizador.nivel_id as nivel_id,
                                                    prev_centralizador.grado_id as grado_id,
                                                    prev_centralizador.paralelo as paralelo,
                                                    prev_centralizador.turno_id as turno_id,
                                                    prev_centralizador.inscrito_id as inscrito_id,
                                                    prev_centralizador.periodo_id as periodo_id,
                                                    prev_centralizador.area_id as area_id,
                                                    SUM(prev_centralizador.ser) as ser,
                                                    SUM(prev_centralizador.hacer) as hacer,
                                                    SUM(prev_centralizador.saber) as saber,
                                                    SUM(prev_centralizador.decidir) as decidir,
                                                    SUM(prev_centralizador.ser) + SUM(prev_centralizador.hacer) + SUM(prev_centralizador.saber) + SUM(prev_centralizador.decidir) as nota
                                                    FROM prev_centralizador
                                                    WHERE prev_centralizador.curso_id = \''.$curso_id.'\'
                                                    GROUP BY prev_centralizador.curso_id, prev_centralizador.gestion_id, prev_centralizador.unidad_educativa_id, prev_centralizador.nivel_id, prev_centralizador.grado_id, prev_centralizador.paralelo, prev_centralizador.turno_id, prev_centralizador.inscrito_id,
                                                    prev_centralizador.periodo_id,
                                                    prev_centralizador.area_id;');

        foreach ($_evaluaciones as $key => $value) {
            $this->Centralizador->create();
            $_centralizador = $value[0];
            $_centralizador['tipo_fuente'] = 1;
            $this->Centralizador->save($_centralizador);
        }

        $_centralizador = $this->Centralizador->query('SELECT 
                                                        centralizador.inscrito_id as inscrito_id,
                                                        centralizador.area_id as area_id,
                                                        centralizador.periodo_id as periodo_id,
                                                        avg(centralizador.nota) as nota
                                                        FROM centralizador
                                                        WHERE centralizador.curso_id = \''.$curso_id.'\'
                                                        GROUP BY centralizador.inscrito_id, centralizador.area_id, centralizador.periodo_id;');

        $Rcentralizador = array();
        foreach ($_centralizador as $key => $value) {
            array_push($Rcentralizador, $value[0]);
        }
        

        $centralizador = array();
        foreach ($Rcentralizador as $key => $value) {
            $centralizador[$value['inscrito_id']][$value['area_id'].$value['periodo_id']]['nota'] = round($value['nota']);
        }        

        $_promedios = $this->Centralizador->query('SELECT 
                                                    centralizador.inscrito_id as inscrito_id,
                                                    centralizador.area_id as area_id,                                                    
                                                    avg(centralizador.nota) as nota
                                                    FROM centralizador
                                                    WHERE centralizador.curso_id = \''.$curso_id.'\'
                                                    GROUP BY centralizador.inscrito_id, centralizador.area_id;');
        $Rpromedios = array();
        foreach ($_promedios as $key => $value) {
            array_push($Rpromedios, $value[0]);
        }
        $promedios = array();
        foreach ($Rpromedios as $key => $value) {
            $promedios[$value['inscrito_id']][$value['area_id'].'5']['nota'] = round($value['nota']);
        }        

        $datos = array();        
        $datos['inscritos'] = $inscritos;        
        $datos['areas'] = $areas;     
        $datos['periodos'] = $periodos;
        $datos['centralizador'] = $centralizador;
        $datos['promedios'] = $promedios;
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
            $this->Evaluacion->create();            
            $_evaluacion = array();
            $_evaluacion['asignado_id'] = $this->request->data['asignado_id'];
            $_evaluacion['inscrito_id'] = $this->request->data['inscrito_id'];
            $_evaluacion['criterio_de_evaluacion_id'] = $this->request->data['criterio_id'];
            $_evaluacion['cuantitativo'] = $this->request->data['cuantitativo'];
            $_evaluacion['cualitativo'] = $this->request->data['cualitativo'];
            $_evaluacion['valor'] = $this->request->data['convertida'];
            $_evaluacion['observaciones'] = $this->request->data['observaciones'];
            $_evaluacion['nota_cuantitativo'] = $_evaluacion['cuantitativo'];
            $_evaluacion['nota_cualitativo'] = $_evaluacion['cualitativo'];
            $_evaluacion['nota_valor'] = $_evaluacion['valor'];
            
            $this->Evaluacion->save($_evaluacion);

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