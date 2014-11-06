<?php
/**
 * Asignado (Relacion de Docentes con curso y asignatura)
 * Tabla asignados
 *
 * @author Rolando Fernandez <rolysoft@gmail.com>
 * @see AppModel
 */
class Asignado extends AppModel {
	public $name = 'Asignado';        
    public $useTable = 'asignados';
    public $primaryKey = 'id';
    
    //Belongs
    public $belongsTo = array(
        'Docente' => array(
            'className'=>'Docente',
            'type'=>'INNER',
            'foreignKey' => 'docente_id',
        ),
        'Curso' => array(
            'className'=>'Curso',
            'type'=>'INNER',
            'foreignKey' => 'curso_id',
        ),
        'Asignatura' => array(
            'className'=>'Asignatura',
            'type'=>'INNER',
            'foreignKey' => 'asignatura_id',
        ),
    );
}

?>