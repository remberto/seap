<?php
/**
 * Asignatura
 * Tabla asignaturas
 *
 * @author Remberto !uispe <rembertoy2k3@gmail.com>
 * @see AppModel
 */
class Apoderado extends AppModel {
	public $name = 'Apoderado';        
    public $useTable = 'apoderados';
    public $primaryKey = 'id';
    
    //Belongs
    public $belongsTo = array(
        'Estudiante' => array(
            'className'=>'Estudiante',
            'type'=>'INNER',
            'foreignKey' => 'estudiante_id',
        ),
        'Persona' => array(
            'className'=>'Persona',
            'type'=>'INNER',
            'foreignKey' => 'persona_id',
        ),
    );
}
?>