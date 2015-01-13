<?php
/**
 * Asignado (Relacion de Docentes con curso y asignatura)
 * Tabla asignados
 *
 * @author Rolando Fernandez <rolysoft@gmail.com>
 * @see AppModel
 */
class Administrativo extends AppModel {
	public $name = 'Administrativo';        
    public $useTable = 'administrativos';
    public $primaryKey = 'id';
    
    //Belongs
    public $belongsTo = array(
        'UnidadEducativa' => array(
            'className'=>'UnidadEducativa',
            'type'=>'INNER',
            'foreignKey' => 'unidad_educativa_id',
        ),
        'Persona' => array(
            'className'=>'Persona',
            'type'=>'INNER',
            'foreignKey' => 'persona_id',
        ),
        'Cargo' => array(
            'className'=>'Cargo',
            'type'=>'INNER',
            'foreignKey' => 'cargo_id',
        ),
        'Financiamiento' => array(
            'className'=>'Financiamiento',
            'type'=>'INNER',
            'foreignKey' => 'financiamiento_id',
        ),
        'Formacion' => array(
            'className'=>'Formacion',
            'type'=>'INNER',
            'foreignKey' => 'formacion_id',
        ),
    );
}

?>