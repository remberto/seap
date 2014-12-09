<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class ConsultasController extends AppController{
    var $name = 'Consultars';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Consulta');
    
    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('index');
    }

    public function index()
    {
        //$this->layout = 'json';
        header("Pragma: no-cache");
        header("Cache-Control: no-store, no-cache, max-age=0, must-revalidate");
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        $datos = array();
        if(isset($this->request->query['query_id'])):
            $query_search = $this->Consulta->find('first', array(
                                                  'conditions'=>array('Consulta.id'=>$_GET['query_id']),
            ));
            foreach($query_search['Parametros'] as $parametro):
                if($parametro['tipo'] == 'int'):
                    $query_search['Consulta']['query'] = str_replace(':'.$parametro['parametro'], $_GET[$parametro['parametro']], $query_search['Consulta']['query']);
                elseif($parametro['tipo'] == 'str'):
                    $query_search['Consulta']['query'] = str_replace(':'.$parametro['parametro'], '\''.$_GET[$parametro['parametro']].'\'', $query_search['Consulta']['query']);
                endif;
            endforeach;
            // Selecciona las cotizaciones
            $query = $this->Consulta->query($query_search['Consulta']['query']);
            $datos = array();
            foreach($query as $q)
            {
                foreach($q as $data)
                {
                    array_push($datos, $data);
                }
            }
        endif;
        $this->set('datos',$datos);
        $this->set(compact('datos'));
        // retorna en JSON los datos de cotizaciones
        $this->set('_serialize', array('datos'));
        //$this->render('reporte');
    }
    

}
?>