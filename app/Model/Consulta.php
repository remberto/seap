<?php
/**
 * Asignado (Relacion de Docentes con curso y asignatura)
 * Tabla asignados
 *
 * @author Rolando Fernandez <rolysoft@gmail.com>
 * @see AppModel
 */
class Consulta extends AppModel {
	public $name = 'Consulta';        
    public $useTable = 'consultas';
    public $primaryKey = 'id';

    public $hasMany = array(
        'Parametros' => array(
            'className' => 'ConsultaParametro',
            'type' => 'INNER',
            'foreignKey' => 'consulta_id'
        ),
    );    

}

?>