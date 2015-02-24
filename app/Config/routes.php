<?php
/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different URLs to chosen controllers and their actions (functions).
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Config
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
/**
 * Here, we are connecting '/' (base path) to controller called 'Pages',
 * its action called 'display', and we pass a param to select the view file
 * to use (in this case, /app/View/Pages/home.ctp)...
 */
	Router::connect('/', array('controller' => 'pages', 'action' => 'display', 'home'));
	Router::connect('/login/*', array('controller' => 'users', 'action' => 'in'));
	//Router::connect('/', array('controller' => 'estudiantes', 'action' => 'display', 'listar'));
/**
 * ...and connect the rest of 'Pages' controller's URLs.
 */
	//Router::connect('/pages/*', array('controller' => 'pages', 'action' => 'display'));
	//Router::connect('/estudiantes/listar/', array('controller' => 'estudiantes', 'action' => 'listar'));
	
	
	Router::resourceMap(array(
		 array('action' => 'index', 'method' => 'GET', 'id' => false),
		 array('action' => 'accion', 'method' => 'GET', 'id' => true),
		 array('action' => 'add', 'method' => 'POST', 'id' => false),
		 //array('action' => 'edit', 'method' => 'PUT', 'id' => true),
		 //array('action' => 'delete', 'method' => 'DELETE', 'id' => true),
		 array('action' => 'update', 'method' => 'POST', 'id' => true)
		 ));

	Router::mapResources('consultas');
	Router::mapResources('planificacionAnual');
	Router::mapResources('planificacionAnualDetalle');
	Router::mapResources('planificacionBimestral');
	Router::mapResources('planificacionBimestralDetalle');
	Router::mapResources('planificacionClases');
	Router::mapResources('planificacionClasesDetalle');

	Router::mapResources('administrativos');
	Router::mapResources('asignados');
	Router::mapResources('inscripciones');
	Router::mapResources('estudiantes');
	Router::mapResources('users');
    Router::mapResources('gestiones');
    Router::mapResources('cursos');
    Router::mapResources('niveles');
    Router::mapResources('unidadeseducativas');
    Router::mapResources('docentes');
    Router::mapResources('horario');
    Router::mapResources('periodohorario');    
	Router::mapResources('asistencia');
	Router::mapResources('asistenciaresumen');
	Router::mapResources('reporte');
	Router::mapResources('evaluaciones');
	Router::mapResources('objetivoholistico');
	Router::mapResources('actividadevaluaciones');
	Router::mapResources('actividad');
	Router::mapResources('promediodimension');
	Router::mapResources('promedioactividad');
	Router::mapResources('criterios');
	Router::mapResources('centralizador');
	Router::mapResources('evaluacioncualitativa');
	Router::parseExtensions();
	
/**
 * Load all plugin routes. See the CakePlugin documentation on
 * how to customize the loading of plugin routes.
 */
	CakePlugin::routes();

/**
 * Load the CakePHP default routes. Only remove this if you do not want to use
 * the built-in default routes.
 */
	require CAKE . 'Config' . DS . 'routes.php';
