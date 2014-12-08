<?php
/**
 * PlanificacionAnual
 * Tabla planificacion_anual
 *
 * @author RFM
 * @see AppModel
 */
class PlanificacionAnual extends AppModel {
	public $name = 'PlanificacionAnual';
    public $useTable = 'planficacion_anual';
    public $primaryKey = 'id';

    //Belongs
    public $belongsTo = array(
        'Curso' => array(
            'className'=>'Curso',
            'type'=>'INNER',
            'foreignKey' => 'curso_id',
        ),
    );
}
?>