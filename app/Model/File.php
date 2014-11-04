<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * File
 * Tabla files
 *
 * @author Remberto Quispe Gutierrez <rembertoy2k3@gmail.com>
 * @see AppModel
 */
class File extends AppModel {
	public $name = 'File';        
	public $useTable = 'files';
	public $primaryKey = 'id';

	 public function processUpload($check=array()) {
        // deal with uploaded file
    if (!empty($check['path_html']['tmp_name'])) {
        // check file is uploaded
        if (!is_uploaded_file($check['path_html']['tmp_name'])) {
            return FALSE;
        }

        // build full filename
        $filename =  Configure::read('Directory_Upload') . DS . Inflector::slug(pathinfo($check['path_html']['name'], PATHINFO_FILENAME)).'.'.pathinfo($check['path_html']['name'], PATHINFO_EXTENSION);

        // @todo check for duplicate filename

        // try moving file
        if (!move_uploaded_file($check['path_html']['tmp_name'], $filename)) {
            return FALSE;

        // file successfully uploaded
        } else {
            // save the file path relative from WWW_ROOT e.g. uploads/example_filename.jpg
            $this->data[$this->alias]['filepath'] = $check['path_html']['name'];
        }
    }
        else{
            return FALSE;
        }
    return TRUE;
    }
    
    public function beforeSave($options = array()) {
    // Cambiar el path para almacenar en la base de datos
    if (!empty($this->data[$this->alias]['filepath'])) {
            $this->data[$this->alias]['path'] = $this->data[$this->alias]['filepath'];
    }
    
    return parent::beforeSave($options);
    }
}

?>
