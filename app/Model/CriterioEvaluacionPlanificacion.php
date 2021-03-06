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
class CriterioEvaluacionPlanificacion extends AppModel {
	public $name = 'CriterioEvaluacionPlanificacion';
	public $useTable = 'criterios_evaluacion_planificacion';
	public $primaryKey = 'id';

	//Has Many

    //Belongs
    public $belongsTo = array(
        'Dimension' => array(
            'className'=>'Dimension',
            'type'=>'INNER',
            'foreignKey' => 'dimension_id',
        ),
        'PlanificacionClaseDetalle' => array(
            'className'=>'PlanificacionClaseDetalle',
            'type'=>'INNER',
            'foreignKey' => 'planificacion_clase_detalle_id',
        ),
    );
}

?>