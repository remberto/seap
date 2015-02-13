<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class ReporteController extends AppController{
    var $name = 'Reporte';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Reporte');
    //funcion de inicio

    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('index');        

    }

    public function index() {       
//$this->layout = 'json';
        header("Pragma: no-cache");
        header("Cache-Control: no-store, no-cache, max-age=0, must-revalidate");
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');

        $id = $this->request->query('id');
        // Buscar el query
        $query_search = $this->Reporte->find('first', array(
            'conditions'=>array('Reporte.id'=>$id)));        
        
        foreach($query_search['Parametros'] as $parametro):
          if($parametro['tipo'] == 'int'):
             $query_search['Reporte']['query'] = str_replace(':'.$parametro['parametro'], $this->request->query[$parametro['parametro']],  $query_search['Reporte']['query']);
          elseif($parametro['tipo'] == 'str'):
             $query_search['Reporte']['query'] = str_replace(':'.$parametro['parametro'], '\''.$this->request->query[$parametro['parametro']].'\'', $query_search['Reporte']['query']);
          endif;
        endforeach;
        
        
        // Selecciona las cotizaciones
        $query = $this->Reporte->query($query_search['Reporte']['query']);
 
        
        
        if((strcmp($query_search['Reporte']['tipo_grafico'],'bar') == 0) || 
        (strcmp($query_search['Reporte']['tipo_grafico'],'line') == 0) || 
        (strcmp($query_search['Reporte']['tipo_grafico'],'column') == 0)):
            $categorias = array();
            $categorias_calculo = array();
            $data = array();
            // Envia la dimension tiempo en un array
            foreach ($query as $datos):
                foreach ($datos as $dato):
                     $data[$dato['categoria']][$dato['serie_id']] = $dato['valor'];
                     if(!in_array($dato['serie'], $categorias)):
                         array_push($categorias, $dato['serie']);
                     endif;
                     if(!in_array($dato['serie_id'], $categorias_calculo)):
                         array_push($categorias_calculo, $dato['serie_id']);
                     endif;
                endforeach;            
            endforeach;
        
            $series = array();
            foreach($data as $key => $row):
                $init = $categorias_calculo[0];
                $cell = array_fill(0, count($categorias_calculo), 0);
                $i = 0;
                foreach($categorias_calculo as $fila):
                    if(isset($row[$fila])):
                        $cell[$i++] = round($row[$fila],2);
                    endif;
                endforeach;
                $row = array('name' => $key, 'data' => $cell);
                array_push($series, $row);
            endforeach;
            //die();


            $datos = array();
            $datos['title']['text'] = $query_search['Reporte']['titulo'];
            $datos['subtitle']['text'] = $query_search['Reporte']['subtitulo'];
            $datos['options']['chart']['type'] = $query_search['Reporte']['tipo_grafico'];
            if(($query_search['Reporte']['tipo_grafico'] == 'column') &&
               isset($query_search['Reporte']['subtipo_grafico']) &&
               !empty($query_search['Reporte']['subtipo_grafico'])):
            $datos['options']['plotOptions']['series']['stacking'] = $query_search['Reporte']['subtipo_grafico'];
        $datos['options']['plotOptions']['series']['dataLabels']['enabled'] = true;
        $datos['yAxis']['stackLabels']['enabled'] = true;
        endif;
        $datos['ayuda'] = $query_search['Reporte']['ayuda'];
            $datos['yAxis']['title']['text'] = $query_search['Reporte']['y_titulo'];
            $datos['xAxis']['categories'] = $categorias;
            $datos['xAxis']['title']['text'] = $query_search['Reporte']['x_titulo'];
            $datos['series'] = $series;
      elseif(strcmp($query_search['Reporte']['tipo_grafico'],'pie') == 0):
            $series = array();
            // Envia la dimension tiempo en un array            
            foreach ($query as $datos):
                foreach ($datos as $dato):
                   $row = array('name'=> $dato['serie'], 'y' => (float)$dato['valor']);
                   //array_push($series, (float)$dato['valor']);
                   array_push($series, $row);
                endforeach;            
            endforeach;
        //die();

            $datos = array();
            $datos['title']['text'] = $query_search['Reporte']['titulo'];
            $datos['subtitle']['text'] = $query_search['Reporte']['subtitulo'];
            $datos['options']['chart']['type'] = $query_search['Reporte']['tipo_grafico'];
            $datos['options']['tooltip']['pointFormat'] = $query_search['Reporte']['ayuda'];
            $datos['options']['plotOptions']['pie']['dataLabels']['enabled'] = true;
            $datos['options']['plotOptions']['pie']['dataLabels']['format'] = $query_search['Reporte']['format_help'];
            $datos['series'][0]['name'] = $query_search['Reporte']['y_titulo'];
            $datos['series'][0]['data'] = $series;
      elseif(strcmp($query_search['Reporte']['tipo_grafico'],'map') == 0):
            $series = array();
            // Envia la dimension tiempo en un array
            foreach ($query as $datos):
                foreach ($datos as $dato):
                    $row = array('hc-key'=> $dato['serie'], 'value' => (float)$dato['valor']);
                    array_push($series, $row);
                endforeach;            
            endforeach;
            $datos = array();
            $datos['title']['text'] = $query_search['Reporte']['titulo'];
            $datos['subtitle']['text'] = $query_search['Reporte']['subtitulo'];
            $datos['yAxis']['labels']['enabled'] = false;
            $datos['yAxis']['title']['text'] = '';
            $datos['yAxis']['gridLineWidth'] = 0;
            $datos['xAxis']['labels']['enabled'] = false;
            //$datos['xAxis']['categories'] = array('');
            $datos['xAxis']['title']['text'] = '';
            $datos['xAxis']['gridLineWidth'] = 0;
            $datos['options']['chart']['type'] = $query_search['Reporte']['tipo_grafico'];
            
            // Pequeños Contribuyentes
  /*          $dataClases[0]['from'] = 0;
           $dataClases[0]['to'] = 50;
            $dataClases[0]['name'] = 'Pequeños';
            $dataClases[0]['color'] = '#8A0808';

            // Medianos Contribuyentes
            $dataClases[1]['from'] = 50;
            $dataClases[1]['to'] = 100;
            $dataClases[1]['name'] = 'Medianos';
            $dataClases[1]['color'] = '#FACC2E';

            // Grandes Contribuyentes
            $dataClases[2]['from'] = 100;
            $dataClases[2]['to'] = 1000;
            $dataClases[2]['name'] = 'Grandes';
            $dataClases[2]['color'] = '#088A29';
*/
//            $datos['options']['colorAxis']['dataClasses'] = $dataClases;
            
            $datos['options']['colorAxis']['stops'] = array(array('0','#8A0808'),array('0.5','#FACC2E'),array('1','#088A29'));
            //$datos['options']['legend']['layout'] = 'vertical';
            //$datos['options']['legend']['align'] = 'left';
            //$datos['options']['legend']['verticalAlign'] = 'bottom';
            $datos['options']['legend']['reversed'] = true;

            $datos['options']['mapNavigation']['enabled'] = true;
            $datos['options']['mapNavigation']['enableButtons'] = false;
            //$datos['options']['mapNavigation']['buttonOptions']['verticalAlign'] = 'bottom';
            //$datos['ayuda'] = $query_search['Reporte']['ayuda'];
            //$datos['yAxis']['title']['text'] = $query_search['Reporte']['y_titulo'];            
            $datos['series'][0]['data'] = $series;
            $datos['series'][0]['name'] = $query_search['Reporte']['y_titulo'];
            $datos['series'][0]['states']['hover']['color'] = '#BADA55';
            $datos['series'][0]['data'] = $series;
            $datos['series'][0]['dataLabels']['enabled'] = true;
            $datos['series'][0]['dataLabels']['format'] = '{point.name}';
            //$datos['size']['width'] = 220;
            //$datos['size']['height'] = 600;
      elseif(strcmp($query_search['Reporte']['tipo_grafico'],'cuadro') == 0):
            $series = array();
            // Envia la dimension tiempo en un array
            foreach ($query as $datos):
                foreach ($datos as $dato):
                    $row = array('name'=> $dato['serie'], 'y' => (float)$dato['valor']);
                    array_push($series, $row);
                endforeach;            
            endforeach;
            $datos = array();
            $datos['title']['text'] = $query_search['Reporte']['titulo'];
            $datos['subttle']['text'] = $query_search['Reporte']['subtitulo'];
            $datos['options']['chart']['type'] = $query_search['Reporte']['tipo_grafico'];
            $datos['ayuda'] = $query_search['Reporte']['ayuda'];
            $datos['y_titulo'] = $query_search['Reporte']['y_titulo'];
            $datos['background'] = $query_search['Reporte']['background'];
            $datos['icono'] = $query_search['Reporte']['icono'];
            $datos['url'] = $query_search['Reporte']['url'];
            $datos['series'] = $series;
      endif;
      $this->set('datos',$datos);
      $this->set(compact('datos'));
      // retorna en JSON los datos de cotizaciones
      $this->set('_serialize', array('datos'));
    }


    public function add(){
       
        /*$link =  "http://localhost:8080/Estudiante";
        
        $data = json_encode($this->request->data['Persona']);
        $httpSocket = new HttpSocket();
        $response = $httpSocket->post($link, $data );*/

        /*$this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));*/
    }

    public function delete($id){
        /*
        if($this->Estudiante->delete($id)):
          $message = 'Eliminado';
        else:
          $message = 'Error';
        endif;
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
           ));*/
    }        

}
?>