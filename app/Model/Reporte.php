<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Reporte
 * Tabla querys
 * listado de Reportes
 *
 * @author Remberto Quispe Gutierrez <rembertoy2k3@gmail.com>
 * @see AppModel
 */
class Reporte extends AppModel {
      public $name = 'Reporte';        
      public $useTable = 'querys';
      public $primaryKey = 'id';

      public $hasMany = array(
          'Parametros' => array(
            'className' => 'Parametro',
            'type' => 'INNER',
            'foreignKey' => 'query_id'
          ),
      );
}

?>
