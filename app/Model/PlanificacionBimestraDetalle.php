<?php
/**
 * PlanificacionClase
 * Tabla planificacion_clases
 *
 * @author RFM
 * @see AppModel
 */
class PlanificacionBimestralDetalle extends AppModel {
	public $name = 'PlanificacionBimestralDetalle';
    public $useTable = 'planificacion_bimestral_detalle';
    public $primaryKey = 'id';

    //Has Many

    //Belongs
    public $belongsTo = array(
        'Asignatura' => array(
            'className'=>'Asignatura',
            'type'=>'INNER',
            'foreignKey' => 'asignatura_id',
        ),
        'PlanficacionAnualDetalle' => array(
            'className'=>'PlanficacionAnualDetalle',
            'type'=>'INNER',
            'foreignKey' => 'planificacion_anual_detalle_id',
        ),
        'OrientacionMetodologica' => array(
            'className'=>'OrientacionMetodologica',
            'type'=>'INNER',
            'foreignKey' => 'orientacion_metodologica_id',
        ),
        'PlanificacionBimestral' => array(
            'className'=>'PlanificacionBimestral',
            'type'=>'INNER',
            'foreignKey' => 'planificacion_bimestral_id',
        ),
    );
}
?>