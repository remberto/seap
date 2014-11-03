<?php

/**
 * Description of UsuariosController
 *
 * @author remberto
 */


class UsersController extends AppController {
    var $name = 'Users';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Persona','User');
        
    
/*    public function beforeFilter(){
        parent::beforeFilter();
        $this->Auth->allow('add','login');
        }*/

    public function login(){
    
	}

    

    public function logout() {
        if ($this->Auth->logout()) {
            $this->set(array(
                'message' => array(
                    'text' => __('Logout successfully'),
                    'type' => 'info'
                ),
                '_serialize' => array('message')
            ));
        }
    }

    public function in(){
		if($this->request->is('post')){
			$request = $this->request->data;
		}else{
			$request = $this->request->query; 
		}
		
		$options = array(
			'conditions' => array(
								'User.username' 		=> $request['username'],
								'User.password'		=> $this->Auth->password($request['password'])
						)
		);
		
		$user = $this->User->find('first',$options);	
		
		if($user == true){
			if($this->Auth->login($user)){
                $return['username'] = $user['User']['username'];
                $return['id'] = $user['User']['id'];
				$return['login'] = true;
			}else{
				$return['login'] = false;
			}	
		}else{
			$return['login'] = false;
		}
		$this->set(array(
            'return' => $return,
            '_serialize' => array('return')
        ));
		$this->render('returnjson','ajax');
	}


    /**
     * index method
     *
     * @return void
     */
    public function index() {
        $datas = $this->User->find('all',array('order'=>array('Perfil.paterno','Perfil.materno','Perfil.nombres')));
        $usuarios = array();
        foreach($datas as $data):
            $usuario = array();
            foreach ($data as $key => $val):                
                foreach ($val as $key => $value):
                    $usuario[$key] = $value;
                endforeach;                
            endforeach;
            array_push($usuarios, $usuario);
        endforeach;
        //$estudiantes = $datas;
        $this->set(array(
            'usuarios' => $usuarios,
            '_serialize' => array('usuarios')
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

