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
class Persona extends AppModel {
	public $name = 'Persona';        
	public $useTable = 'personas';
    public $primaryKey = 'id';
}

?>
