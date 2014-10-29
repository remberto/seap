<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Grado
 * Tabla Grado
 *
 * @author Remberto Quispe Gutierrez <rembertoy2k3@gmail.com>
 * @see AppModel
 */
class Grado extends AppModel {
	public $name = 'Grado';        
        public $useTable = 'grados';
        public $primaryKey = 'id';

    public $belongsTo = array(
        'Nivel' => array(
            'className'=>'Nivel',
            'type'=>'INNER',
            'foreignKey' => 'nivel_id',
        ),
    );
}

?>
