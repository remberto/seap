<?php

/**
 * Description of MenusController
 *
 * @author remberto
 */

class MenusController extends AppController {
    var $name = 'Menus';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Menu');
        
    
    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('index');
        }

        


    /**
     * index method
     *
     * @return void
     */
    public function index() {
        //$datas = $this->User->find('all',array('order'=>array('Perfil.paterno','Perfil.materno','Perfil.nombres')));
        $datas = $this->Menu->find('all',array('conditions'=>array('Menu.rol_id' => $this->request->query['rol_id']),
                                               'recursive'=>-1));        
        $menus = array();
        foreach($datas as $data):
            $menu = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):                  
                    $menu[$key] = $value;
                endforeach;                
            endforeach;
            array_push($menus, $menu);
        endforeach;
        //$estudiantes = $datas;
        $this->set(array(
            'menus' => $menus,
            '_serialize' => array('menus')
        ));
    }

    /**
     * view method
     *
     * @throws NotFoundException
     * @param string $id
     * @return void
     */
    public function view($id = null) {
        if (!$this->User->exists($id)) {
            throw new NotFoundException(__('Invalid user'));
        }
        $options = array('conditions' => array('User.' . $this->User->primaryKey => $id));
        $this->set('user', $this->User->find('first', $options));
    }

    /**
     * add method
     *
     * @return void
     */
    public function add() {
        $datasource = $this->User->getDataSource();
        $datasource->useNestedTransactions = TRUE;
        $datasource->begin();
        try{
            $this->Persona->create();
            $this->request->data['Persona']['paterno'] = $this->request->data['paterno'];
            $this->request->data['Persona']['materno'] = $this->request->data['materno'];
            $this->request->data['Persona']['nombres'] = $this->request->data['nombres'];
            //$this->request->data['Persona']['fecha_nacimiento'] = $this->request->data['fecha_nacimiento'];
            $this->request->data['Persona']['genero'] = $this->request->data['genero'];
            $this->Persona->save($this->request->data);
            $this->User->create();
            $this->request->data['User']['id'] = $this->Persona->getLastInsertID();
            $this->request->data['User']['username'] = $this->request->data['username'];
            $this->request->data['User']['password'] = $this->request->data['password'];            
            $this->User->save($this->request->data);
            $datasource->commit();
            $message = 'Guardado';
        }catch(Exception $e) {
            $datasource->rollback();
            $message = 'Error al Guardar los datos ->'.$e->getMessage();
        }
        
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));

    }

    public function isAuthorized($user) {
        // All registered users can add posts
        if ($this->action === 'add') {
            return true;
        }

        // The owner of a post can edit and delete it
        if (in_array($this->action, array('edit', 'delete'))) {
            $postId = (int) $this->request->params['pass'][0];
            if ($this->Post->isOwnedBy($postId, $user['id'])) {
                return true;
            }
        }
        return parent::isAuthorized($user);
    }
}

