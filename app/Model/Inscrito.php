<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Inscrito
 * Tabla estudiantes
 *
 * @author Remberto Quispe Gutierrez <rquispe@odespro.com>
 * @see AppModel
 */
class Inscrito extends AppModel {
	public $name = 'Inscrito';        
	public $useTable = 'inscritos';
    public $primaryKey = 'id';

    public function isOwnedBy($id, $user) {
        return $this->field('id', array('id' => $id, 'user_id' => $user)) !== false;
    }
}

?>
