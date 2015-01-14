<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Docentes
 * Tabla docentes
 *
 * @author Remberto Quispe Gutierrez <rquispe@odespro.com>
 * @see AppModel
 */
class Docente extends AppModel {
	public $name = 'Docente';        
	public $useTable = 'docentes';
    public $primaryKey = 'id';

    public $hasOne = array(
            'Datos' => array(
            'className'     => 'Persona',
            'foreignKey'    => 'id',
            'dependent' => true
		),
	);

     //Belongs
    public $belongsTo = array(                
        'Formacion' => array(
            'className'=>'Formacion',
            'type'=>'INNER',
            'foreignKey' => 'formacion_id',
        ),        
    );
}

?>
