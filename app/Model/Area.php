<?php
/**
 * Area
 * Tabla areas
 *
 * @author Rolando Fernandez <rolysoft@gmail.com>
 * @see AppModel
 */
class Area extends AppModel {
	public $name = 'Area';        
    public $useTable = 'areas';
    public $primaryKey = 'id';
    
    //Belongs
    public $belongsTo = array(
        'Campo' => array(
            'className'=>'Campo',
            'type'=>'INNER',
            'foreignKey' => 'campo_id',
        ),
    );
}
?>