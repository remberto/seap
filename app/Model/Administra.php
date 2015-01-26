<?php
/**
 * Asignado (Relacion de Docentes con curso y asignatura)
 * Tabla asignados
 *
 * @author Rolando Fernandez <rolysoft@gmail.com>
 * @see AppModel
 */
class Administra extends AppModel {
	public $name = 'Administra';        
    public $useTable = 'administra';
    public $primaryKey = 'id';
    
    //Belongs
    public $belongsTo = array(
        'UnidadEducativa' => array(
            'className'=>'UnidadEducativa',
            'type'=>'INNER',
            'foreignKey' => 'unidad_educativa_id',
        ),
        'Usuario' => array(
            'className'=>'User',
            'type'=>'INNER',
            'foreignKey' => 'user_id',
        ),        
    );
}

?>