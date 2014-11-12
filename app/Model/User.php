<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Estudiantes
 * Tabla estudiantes
 *
 * @author Remberto Quispe Gutierrez <rembertoy2k3@gmail.com>
 * @see AppModel
 */
class User extends AppModel {
	public $name = 'User';        
	public $useTable = 'users';
	public $primaryKey = 'id';

	public $hasOne = array(
            'Perfil' => array(
            'className'     => 'Persona',
            'foreignKey'    => 'id',
            'dependent' => true
	    ),
	);

    public $belongsTo = array(
        'Rol' => array(
            'className'=>'Rol',
            'type'=>'INNER',
            'foreignKey' => 'rol_id',
        ),
    );
        
        public function beforeSave($options = array()) {         
            if (isset($this->data[$this->alias]['password'])) {
                $this->data[$this->alias]['password'] = AuthComponent::password($this->data[$this->alias]['password']);
            }
            return true;
        }

}

?>
