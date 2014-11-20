<?php
/**
 * Asistencia
 * Tabla asistencia
 *
 * @author Rolando Fernandez <rolysoft@gmail.com>
 * @see AppModel
 */
class Asistencia extends AppModel {
	public $name = 'Asistencia';        
    public $useTable = 'asistencia';
    public $primaryKey = 'id';
    
    //Belongs
    public $belongsTo = array(
        'Asignado' => array(
            'className'=>'Asignado',
            'type'=>'INNER',
            'foreignKey' => 'asignado_id',
        ),
        'Inscrito' => array(
            'className'=>'Inscrito',
            'type'=>'INNER',
            'foreignKey' => 'inscripcion_id',
        ),
        'Calendario' => array(
            'className'=>'Calendario',
            'type'=>'INNER',
            'foreignKey' => 'calendario_id',
        ),
        'EstadoAsistencia' => array(
            'className'=>'EstadoAsistencia',
            'type'=>'INNER',
            'foreignKey' => 'estado_asistencia_id',
        ),
    );
}
?>