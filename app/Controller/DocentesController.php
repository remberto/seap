<?php


App::uses('AppController', 'Controller');
App::uses('HttpSocket', 'Network/Http');
/**
 */
class DocentesController extends AppController{
    
    var $name = 'Docentes';//inicializacion de variables
    
    public $components = array('RequestHandler');
    public $uses = array('Persona','Docente');
    
    public function index() {

        //$datas = $this->Docente->query('SELECT docentes.id as id FROM docentes');
        $datas = $this->Docente->find('all', array('order'=>array('Datos.paterno', 'Datos.materno','Datos.nombres')));

        //print_r($datas);
        //die();
        
        $docentes = array();
        foreach($datas as $data):
            $docente = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $docente[$key] = $value;
                endforeach;                
            endforeach;
            array_push($docentes, $docente);
        endforeach;
        $this->set(array(
            'docentes' => $docentes,
            '_serialize' => array('docentes')
        ));       
    }

    public function view($id){
        $docente = $this->Docente->findById($id);
        $this->set(array(
            'docente' => $docente,
            '_serialize' => array('docente')
        ));
    }

    public function add(){
        
        print_r("hi -- >");
        $datasource = $this->Docente->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        
        try{
            $this->Persona->create();
            $_persona = array();
            $_persona['paterno'] = $this->request->data['paterno'];
            $_persona['materno'] = $this->request->data['materno'];
            $_persona['nombres'] = $this->request->data['nombres'];
            $_persona['fecha_nacimiento'] = $this->request->data['fecha_nacimiento'];
            $_persona['genero'] = $this->request->data['genero'];
            $this->Persona->save($_persona);

            $this->Docente->create();
            $_docente = array();
            $_docente['id'] = $this->Persona->getLastInsertID();
            $_docente['carnet'] = $this->request->data['carnet'];
            $_docente['categoria'] = $this->request->data['categoria'];            
            $this->Docente->save($_docente);
            
            $datasource->commit();
            $message = 'Guardado';
        }catch(Exception $e) {
            $datasource->rollback();
            $message = 'Error al Guardar los datos';
        }
        
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }
}
?>