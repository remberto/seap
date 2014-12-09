<?php
/**
 * PlanficacionAnualDetalle
 * Tabla planficacion_anual_detalle
 *
 * @author RFM
 * @see AppModel
 */
class PlanificacionAnualDetalle extends AppModel {
	public $name = 'PlanificacionAnualDetalle';
    public $useTable = 'planificacion_anual_detalle';
    public $primaryKey = 'id';

    //Belongs
    public $belongsTo = array(
        'Area' => array(
            'className'=>'Area',
            'type'=>'INNER',
            'foreignKey' => 'area_id',
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