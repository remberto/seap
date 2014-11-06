<?php
/**
 * Asignatura
 * Tabla asignaturas
 *
 * @author Rolando Fernandez <rolysoft@gmail.com>
 * @see AppModel
 */
class Asignatura extends AppModel {
	public $name = 'Asignatura';        
    public $useTable = 'asignaturas';
    public $primaryKey = 'id';
    
    //Belongs
    public $belongsTo = array(
        'Area' => array(
            'className'=>'Area',
            'type'=>'INNER',
            'foreignKey' => 'area_id',
        ),
    );
}
?>8