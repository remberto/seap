<?php
/**
 * Asignado (Relacion de Docentes con curso y asignatura)
 * Tabla asignados
 *
 * @author Rolando Fernandez <rolysoft@gmail.com>
 * @see AppModel
 */
class Horario extends AppModel {
	public $name = 'Horario';        
    public $useTable = 'horario';
    public $primaryKey = 'id';
    
    //Belongs
    public $belongsTo = array(
        'Asignado' => array(
            'className'=>'Asignado',
            'type'=>'INNER',
            'foreignKey' => 'asignado_id',
        ),
        'Dia' => array(
            'className'=>'Dia',
            'type'=>'INNER',
            'foreignKey' => 'dia_id',
        ),
        'Periodo' => array(
            'className'=>'PeriodoHorario',
            'type'=>'INNER',
            'foreignKey' => 'periodo_id',
        ),
    );
}

?>