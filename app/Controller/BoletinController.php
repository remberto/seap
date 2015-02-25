<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class BoletinController extends AppController{
    var $name = 'Boletin';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Asignado','Area','CriterioEvaluacion','Evaluacion', 'Centralizador', 'Inscrito','ActividadEvaluacion', 'Persona','Estudiante');
    //funcion de inicio

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index');
    }

    public function index(){
        $evaluaciones = array();
        $promedios = array();
        $notas = array();

        $_inscripcion_id = $this->request->query('id');
        
        $_cabezera = $this->Centralizador->query('SELECT 
                                                    cursos.gestion_id as gestion,
                                                    niveles.id as idnivel,
                                                    niveles.descripcion as nivel,
                                                    grados.id as idgrado,
                                                    grados.descripcion as grado
                                                    FROM inscritos
                                                    INNER JOIN cursos ON inscritos.curso_id = cursos.id
                                                    INNER JOIN grados ON cursos.grado_id = grados.id
                                                    INNER JOIN niveles ON grados.nivel_id = niveles.id
                                                    WHERE inscritos.id = \''.$_inscripcion_id.'\';');

        $cabezera = array();
        foreach ($_cabezera as $key => $value) {
            array_push($cabezera, $value[0]);
        };
        
        $_campos = $this->Area->query('SELECT campos.id as id, 
                                                campos.descripcion as descripcion, 
                                                count(DISTINCT areas.id) as rows FROM campos
                                                INNER JOIN areas ON campos.id = areas.campo_id
                                                INNER JOIN asignaturas ON areas.id = asignaturas.area_id
                                                WHERE asignaturas.nivel_id = '.$cabezera[0]['idnivel'].'
                                                GROUP BY campos.id, campos.descripcion
                                                ORDER BY campos.id');
        $campos = array();
        foreach ($_campos as $key => $value) {
            $campos[$value[0]['id']] = $value[0];                        
        }

        $_areas = $this->Area->query('SELECT areas.id as id, areas.descripcion as descripcion, campos.id as idcampos FROM campos
                                        INNER JOIN areas ON campos.id = areas.campo_id
                                        INNER JOIN asignaturas ON areas.id = asignaturas.area_id
                                        WHERE asignaturas.nivel_id = '.$cabezera[0]['idnivel'].'
                                        GROUP BY areas.id, areas.descripcion, campos.id
                                        ORDER BY campos.id, areas.id');
        $areas = array();             

        foreach ($_areas as $key => $value) {                        
            array_push($areas,$value[0]);
        }

        $_promedios = $this->Centralizador->query('SELECT area_id as area_id, periodo_id as periodo_id, nota as nota
                                                FROM centralizador
                                                WHERE inscrito_id = \''.$_inscripcion_id.'\';');

        $Rpromedios = array();
        foreach ($_promedios as $key => $value) {
            array_push($Rpromedios, $value[0]);
        }
        $promedios = array();
        foreach ($Rpromedios as $key => $value) {
            $promedios[$value['area_id']][$value['periodo_id']]['nota'] = round($value['nota']);
        } 

        $_nota_final = $this->Centralizador->query('SELECT NOTAS.area_id as area_id, 
                                                           NOTAS.nota_final as nota, 
                                                           literal.descripcion as descripcion 
                                                    FROM NOTAS
                                                    INNER JOIN literal ON literal.id = NOTAS.nota_final
                                                    WHERE NOTAS.inscrito_id = \''.$_inscripcion_id.'\';');
        
        $Rnota_final = array();
        foreach ($_nota_final as $key => $value) {
            array_push($Rnota_final, $value[0]);
        }
        
        $nota_final = array();
        foreach ($Rnota_final as $key => $value) {
            $nota_final[$value['area_id']]['nota'] = round($value['nota']);
            $nota_final[$value['area_id']]['descripcion'] = ucfirst($value['descripcion']);
        }

         $_valoracion = $this->Centralizador->query('SELECT periodo_id as periodo_id, 
                                                     valoracion_cualitativa as valoracion_cualitativa 
                                                     FROM valoracion_cualitativa
                                                     WHERE inscrito_id = \''.$_inscripcion_id.'\';');
        
        $Rvaloracion = array();
        foreach ($_valoracion as $key => $value) {
            array_push($Rvaloracion, $value[0]);
        }
        $valoracion = array();
        foreach ($Rvaloracion as $key => $value) {            
            $valoracion[$value['periodo_id']]['valoracion_cualitativa'] = $value['valoracion_cualitativa'];
        }

        
        $_promedio_trimestre = $this->Centralizador->query('SELECT periodo_id as periodo_id, avg(nota) as nota_final
                                                            FROM centralizador
                                                            WHERE inscrito_id =  \''.$_inscripcion_id.'\'
                                                            GROUP BY periodo_id');
        $Rpromedio_trimestre = array();
        foreach ($_promedio_trimestre as $key => $value) {
            array_push($Rpromedio_trimestre, $value[0]);
        }
        $promedio_trimestre = array();
        /*for ($i=1; $i <= 4 ; $i++) { 
            $promedio_trimestre[$i]['promedio_trimestre'] = 0;
        }*/
        foreach ($Rpromedio_trimestre as $key => $value) {            
            $promedio_trimestre[$value['periodo_id']]['promedio_trimestre'] = round($value['nota_final']);
        }

        $datos = array();                
        $datos['cabezera'] = $cabezera[0];
        $datos['campos'] = $campos;
        $datos['areas'] = $areas;
        $datos['boletin'] = $promedios;
        $datos['nota_final'] = $nota_final;
        $datos['valoracion_cualitativa'] = $valoracion;
        $datos['promedio_trimestre'] = $promedio_trimestre;
        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
    }  
    
}
?>