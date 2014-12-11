<?php
/**
 * PlanificacionClase
 * Tabla planificacion_clases
 *
 * @author RFM
 * @see AppModel
 */
class PlanificacionClase extends AppModel {
	public $name = 'PlanificacionClase';
    public $useTable = 'planificacion_clases';
    public $primaryKey = 'id';

    //Has Many

    //Belongs
    public $belongsTo = array(
        'Asignado' => array(
            'className'=>'Asignado',
            'type'=>'INNER',
            'foreignKey' => 'asignado_id',
        ),
        'Calendario' => array(
            'className'=>'Calendario',
            'type'=>'INNER',
            'foreignKey' => 'calendario_de_id',
        ),
        'PlanificacionBimestral' => array(
            'className'=>'PlanificacionBimestral',
            'type'=>'INNER',
            'foreignKey' => 'planificacion_bimiestral_id',
        ),
    );
}
?>