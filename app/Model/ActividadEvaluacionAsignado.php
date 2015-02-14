<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * ActvidadEvaluacion
 * Tabla actividad_evaluacion
 *
 * @author RFM
 * @see AppModel
 */
class ActividadEvaluacionAsignado extends AppModel {
	public $name = 'ActividadEvaluacionAsignado';
	public $useTable = 'actividad_evaluacion_asignado';
	public $primaryKey = 'id';

	public $belongsTo = array(
        'ActvidadEvaluacion' => array(
            'className'=>'ActvidadEvaluacion',
            'type'=>'INNER',
            'foreignKey' => 'actividad_evaluacion_id',
        ),
        'Asignado' => array(
            'className'=>'Asignado',
            'type'=>'INNER',
            'foreignKey' => 'asignado_id',
        ),        
        'Periodo' => array(
            'className'=>'Periodo',
            'type'=>'INNER',
            'foreignKey' => 'periodo_id',
        ),       
    );
}

?>