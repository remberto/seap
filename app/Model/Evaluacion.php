<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Evaluacion
 * Tabla evaluaciones
 *
 * @author RFM
 * @see AppModel
 */
class Evaluacion extends AppModel {
	public $name = 'Evaluacion';
	public $useTable = 'evaluaciones';
	public $primaryKey = 'id';

	//Has Many

    //Belongs
    public $belongsTo = array(
    	'Asignado' => array(
            'className'=>'Asignado',
            'type'=>'INNER',
            'foreignKey' => 'asignado_id',
        ),
        'Inscrito' => array(
            'className'=>'Inscrito',
            'type'=>'INNER',
            'foreignKey' => 'inscrito_id',
        ),
        'CriterioEvaluacion' => array(
            'className'=>'CriterioEvaluacion',
            'type'=>'INNER',
            'foreignKey' => 'criterio_de_evaluacion_id',
        ),        
    );
}
?>