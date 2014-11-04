<?php

/**
 * Description of UsuariosController
 *
 * @author remberto
 */


class UploadController extends AppController {
    var $name = 'Upload';//inicializacion de variables
    public $components = array('RequestHandler');
    public $uses = array('Tabla','UnidadEducativa','Persona','Estudiante','Docente','Curso');
        
    
    /**
     * index method
     *
     * @return void
     */
    public function index() {
        if ( !empty( $_FILES ) ) {
            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $uploadPath = WWW_ROOT . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
            move_uploaded_file( $tempPath, $uploadPath );

            $gestor = fopen($uploadPath, "r");
            $contenido = fread($gestor, filesize($uploadPath));
            fclose($gestor);

            $result = utf8_encode(base64_decode($contenido));
            $lineas = explode('VCJM|',$result);
            $lineas = explode('<F>', $lineas[1]);
            $nro_tabla = 0;
            $name_campos = array();
            $name_tables = array();
            foreach($lineas as $linea):                
                $fields = explode('|', $linea);
                /*foreach ($fields as $key => $value) {
                    print_r($value);
                    echo "---------";
                }*/                
                if(strcmp($fields[0],'SieTypeFile')==0):
                    $error = 'Finalizado';
                elseif(($fields[0] == 1000) || ($fields[0] == 18)):
                    $error = 'iniciando';
                elseif ($fields[0] == $nro_tabla):
                    if($build):
                        $dato = array();                    
                        foreach ($fields as $key => $field) {
                            if($key > 0 && !empty($field)):
                                //print_r($name_campos[$key]);
                                $dato[$name_campos[$key]] = $field;
                            endif;
                        }
                        foreach ($name_tables as $key => $name_table) {
                            if(strcmp($name_table,'UnidadEducativa') == 0):
                                $dato['id'] = $dato['cod_ue_id'];
                                $dato['descripcion'] = $dato['desc_ue'];
                            endif;
                            if(strcmp($name_table,'Persona') == 0):
                                if(empty($dato['nombre'])) $dato['nombre'] = '--';
                                $dato['nombres'] = $dato['nombre'];
                            endif;
                            if(strcmp($name_table,'Curso') == 0):                                
                                $dato['unidad_educativa_id'] = $dato['cod_ue_id'];
                                $dato['grado_id'] = $dato['nivel_id'].$dato['grado_id'];
                                $dato['paralelo_id'] = (int) ord($dato['paralelo']) - 64;
                            endif;
                            $this->{$name_table}->create();
                            $this->{$name_table}->save($dato);
                            $dato['id'] = $this->{$name_table}->getLastInsertID();
                        }                        
                    endif;
                elseif ($fields[0] != $nro_tabla):
                    $build = false;
                    $table = $this->Tabla->findById($fields[0]);
                    if(isset($table['Target']) && !empty($table['Target'])):
                        $name_tables = array();
                        foreach($table['Target'] as $key => $value) {
                                array_push($name_tables,$value['name']);
                        } 
                        $name_campos = array();
                        foreach ($fields as $key => $field) {                            
                            if(!empty($field)):
                                array_push($name_campos,$field);
                            endif;
                        }                        
                        $build = true;                        
                    endif;
                    
                    /*if(isset($table['Tabla']['table'])):
                        $name_table = $table['Tabla']['table'];                        
                        $name_campos = array();
                        foreach ($fields as $key => $field) {                            
                            if(!empty($field)):
                                array_push($name_campos,$field);
                            endif;
                        }
                        $build = true;                      
                    endif;                  */
                    $nro_tabla = $fields[0];
                else:
                    $error = 'error archivo';
                endif;
                $fields = array();
            endforeach;            
            $datos = array( 'answer' => 'File transfer completed' );
        } else {
            $datos = array( 'answer' => 'No files' );
        }
        
        $this->set(array(
            'datos' => $datos,
            '_serialize' => array('datos')
        ));
        $this->render('/App/returnjson','ajax');
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

