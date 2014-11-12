<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Menu
 * Tabla menus
 *
 * @author Remberto Quispe Gutierrez <rembertoy2k3@gmail.com>
 * @see AppModel
 */
class Menu extends AppModel {
	public $name = 'Menu';        
	public $useTable = 'menus';
	public $primaryKey = 'id'; 

    public $belongsTo = array(
        'Rol' => array(
            'className'=>'Rol',
            'type'=>'INNER',
            'foreignKey' => 'rol_id',
        ),
    );  

}

?>
