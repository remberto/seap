<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * ActvidadEvaluacion
 * Tabla actividad_evaluacion
 *
 * @author remberto quispe
 * @see AppModel
 */
class ObjetivoHolistico extends AppModel {
	public $name = 'ObjetivoHolistico';
	public $useTable = 'objetivo_holistico';
	public $primaryKey = 'id';

	public $belongsTo = array(        
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