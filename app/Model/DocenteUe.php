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
class DocenteUe extends AppModel {
	public $name = 'DocenteUe';        
	public $useTable = 'docente_ue';
    public $primaryKey = 'id';

     //Belongs
    public $belongsTo = array(
        'UnidadEducativa' => array(
            'className'=>'UnidadEducativa',
            'type'=>'INNER',
            'foreignKey' => 'unidad_educativa_id',
        ),
        'Docente' => array(
            'className'=>'Docente',
            'type'=>'INNER',
            'foreignKey' => 'docente_id',
        ),        
        'Financiamiento' => array(
            'className'=>'Financiamiento',
            'type'=>'INNER',
            'foreignKey' => 'financiamiento_id',
        ),        
    );
}
?>