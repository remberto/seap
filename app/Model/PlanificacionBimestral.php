<?php
/**
 * PlanificacionBimestral
 * Tabla planficacion_anual_detalle
 *
 * @author RFM
 * @see AppModel
 */
class PlanificacionBimestral extends AppModel {
	public $name = 'PlanificacionBimestral';
    public $useTable = 'planificacion_bimestral';
    public $primaryKey = 'id';

    //Belongs
    public $belongsTo = array(
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