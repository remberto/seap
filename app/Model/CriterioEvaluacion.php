<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * CriterioEvaluacion
 * Tabla criterios_evaluacion
 *
 * @author RFM
 * @see AppModel
 */
class CriterioEvaluacion extends AppModel {
	public $name = 'CriterioEvaluacion';
	public $useTable = 'criterios_evaluacion';
	public $primaryKey = 'id';

	//Has Many

    //Belongs
    public $belongsTo = array(
        'Dimension' => array(
            'className'=>'Dimension',
            'type'=>'INNER',
            'foreignKey' => 'dimension_id',
        ),
        'Periodo' => array(
            'className'=>'Periodo',
            'type'=>'INNER',
            'foreignKey' => 'periodo_id',
        ),
        'Actividad' => array(
            'className'=>'ActividadEvaluacionAsigbnado',
            'type'=>'INNER',
            'foreignKey' => 'actividad_evaluacion_asignado_id',
        ),
    );
}

?>