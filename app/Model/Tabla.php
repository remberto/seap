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
class Tabla extends AppModel {
	public $name = 'Tabla';        
    public $useTable = 'tmp_nro_tabla';
    public $primaryKey = 'id';

    public $hasMany = array(
        'Target' => array(
            'className'=>'TablaTarget',
            'type'=>'INNER',
            'foreignKey' => 'tmp_nro_tabla_id',
        ),
    );
}

?>
