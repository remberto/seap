<?php
/**
 * Curso
 * Tabla cursos
 *
 * @author Remberto Quispe Gutierrez <rembertoy2k3@gmail.com>
 * @see AppModel
 */
class Curso extends AppModel {
	public $name = 'Curso';        
    public $useTable = 'cursos';
    public $primaryKey = 'id';
    
    //Has Many

    //Belongs
    public $belongsTo = array(
        'Gestion' => array(
            'className'=>'Gestion',
            'type'=>'INNER',
            'foreignKey' => 'gestion_id',
        ),
        'UnidadEducativa' => array(
            'className'=>'UnidadEducativa',
            'type'=>'INNER',
            'foreignKey' => 'unidad_educativa_id',
        ),
        'Grado' => array(
            'className'=>'Grado',
            'type'=>'INNER',
            'foreignKey' => 'grado_id',
        ),
        'Paralelo' => array(
            'className'=>'Paralelo',
            'type'=>'INNER',
            'foreignKey' => 'paralelo_id',
        ),
        'Turno' => array(
            'className'=>'Turno',
            'type'=>'INNER',
            'foreignKey' => 'turno_id',
        ),
    );
}

?>
