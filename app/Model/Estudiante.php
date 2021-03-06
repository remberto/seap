<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Estudiantes
 * Tabla estudiantes
 *
 * @author Remberto Quispe Gutierrez <rquispe@odespro.com>
 * @see AppModel
 */
class Estudiante extends AppModel {
	public $name = 'Estudiante';        
	public $useTable = 'estudiantes';
    public $primaryKey = 'id';

    public $hasOne = array(
            'Datos' => array(
            'className'     => 'Persona',
            'foreignKey'    => 'id',
            'dependent' => true
		),
	);
    
    public function isOwnedBy($id, $user) {
        return $this->field('id', array('id' => $id, 'user_id' => $user)) !== false;
    }
}

?>
