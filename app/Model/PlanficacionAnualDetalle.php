<?php
/**
 * PlanficacionAnualDetalle
 * Tabla planficacion_anual_detalle
 *
 * @author RFM
 * @see AppModel
 */
class PlanficacionAnualDetalle extends AppModel {
	public $name = 'PlanficacionAnualDetalle';
    public $useTable = 'planficacion_anual_detalle';
    public $primaryKey = 'id';

    //Belongs
    public $belongsTo = array(
        'Asignatura' => array(
            'className'=>'Asignatura',
            'type'=>'INNER',
            'foreignKey' => 'asignatura_id',
        ),
        'Periodo' => array(
            'className'=>'Periodo',
            'type'=>'INNER',
            'foreignKey' => 'periodo_id',
        ),
        'PlanificacionAnual' => array(
            'className'=>'PlanificacionAnual',
            'type'=>'INNER',
            'foreignKey' => 'planificacion_anual_id',
        ),
    );
}
?>