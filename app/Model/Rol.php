<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Rol
 * Tabla roles
 *
 * @author Remberto Quispe Gutierrez <rembertoy2k3@gmail.com>
 * @see AppModel
 */
class Rol extends AppModel {
	public $name = 'Rol';        
	public $useTable = 'roles';
	public $primaryKey = 'id';

    /*public $hasMany = array(
        'Menus' => array(
            'className'=>'Menu',
            'type'=>'INNER',
            'foreignKey' => 'rol_id',
        ),
    );*/

}

?>
