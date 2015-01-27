var usuariosController = angular.module('usuariosControllers',[]);

usuariosController.controller('usuariosController', ['$scope','UsuariosListFactory','UsuarioFactory','$location', 'usSpinnerService', 'sesionesControl', function($scope, UsuariosListFactory, UsuarioFactory, $location, usSpinnerService, sesionesControl) {
    $scope.usuarios = null;

    $scope.__construct = function(){
      usSpinnerService.spin('spinner-1');
      UsuariosListFactory.query({query_id: 127, user_id: sesionesControl.get('user_id')}, function(data){
        usSpinnerService.stop('spinner-1');
        $scope.usuarios = data.datos;
      });  
    }

    $scope.addUsuario = function(){
       $location.path('/addUsuario');
    };

    $scope.deleteUsuario = function(usuarioId){
      usSpinnerService.spin('spinner-1');
      UsuarioFactory.delete({id: usuarioId}, function(data) {
        usSpinnerService.stop('spinner-1');
        $scope.usuarios = data.datos;
      });       
    };
    
    $scope.__construct();
}]);


usuariosController.controller('usuarioController', ['$scope','UsuariosFactory','DocentesUsuarioFactory', 'sesionesControl', '$location', 'usSpinnerService', function($scope, UsuariosFactory, DocentesUsuarioFactory, sesionesControl, $location, usSpinnerService) {
    $scope.usuario = {id: 0, rol_id: 3, paterno:'', materno:'', nombres:'', fecha_nacimiento:'', genero:''};
    $scope.$watch("usuario.carnet", function(newValue, oldValue){
      DocentesUsuarioFactory.query({query_id: 128, carnet: newValue, user_id: sesionesControl.get('user_id')}, function(data){        
        if(data.datos.length > 0){          
          $scope.usuario.id = data.datos[0].id;
          $scope.usuario.unidad_educativa = data.datos[0].unidad_educativa;
          $scope.usuario.rol_id = 3;
          $scope.usuario.paterno = data.datos[0].paterno;
          $scope.usuario.materno = data.datos[0].materno;
          $scope.usuario.nombres = data.datos[0].nombres;
          $scope.usuario.fecha_nacimiento = data.datos[0].fecha_nacimiento;
          $scope.usuario.genero = data.datos[0].genero;
        }else{
          $scope.usuario.id = null;
          $scope.usuario.unidad_educativa = null;
          $scope.usuario.rol_id = 2;
          $scope.usuario.paterno = null;
          $scope.usuario.materno = null;
          $scope.usuario.nombres = null;
          $scope.usuario.fecha_nacimiento = null;
          $scope.usuario.genero = null;
        }
      });
    });

    $scope.newUsuario = function(){
        usSpinnerService.spin('spinner-1');
        UsuariosFactory.create($scope.usuario, function(data){
          usSpinnerService.stop('spinner-1');
          if(data.message.guardado){
              $.fn.jAlert({
                    'title':'¡Satisfactorio!',
                    'message': data.message.mensaje,
                    'theme': 'success',
                    'closeBtn': false,
                    'btn': [{'label':'Cerrar', 
                             'closeOnClick': true, 
                             'cssClass': 'green',                                
                           }],
                    'size': 'small',                      
                    'onClose': function(){
                        $scope.mtdList();
                    }
                  });

          }else{
              $.fn.jAlert({
                    'title':'Error!',
                    'message': data.message.mensaje,
                    'theme': 'error'
                  });
          }
        });    
    };

    $scope.mtdList = function(){        
        $location.path('/usuariosUnidadEducativa');
        $scope.$apply();
    }

}]);


usuariosController.controller('usuarioAdministraController', ['$scope','UsuariosFactory','DocentesUsuarioFactory', 'UnidadesEducativasUsuarioFactory', 'sesionesControl', '$location', 'usSpinnerService', function($scope, UsuariosFactory, DocentesUsuarioFactory, UnidadesEducativasUsuarioFactory, sesionesControl, $location, usSpinnerService) {
    $scope.usuario = {id: 0, rol_id: 3, paterno:'', materno:'', nombres:'', fecha_nacimiento:'', genero:''};
    UnidadesEducativasUsuarioFactory.query({query_id:113, user_id: sesionesControl.get('user_id')}, function(data){
        $scope.unidadesEducativas = data.datos;
    }); 

    $scope.$watch("usuario.carnet", function(newValue, oldValue){
      DocentesUsuarioFactory.query({query_id: 128, carnet: newValue, user_id: sesionesControl.get('user_id')}, function(data){        
        if(data.datos.length > 0){          
          $scope.usuario.id = data.datos[0].id;          
          $scope.usuario.rol_id = 3;
          $scope.usuario.paterno = data.datos[0].paterno;
          $scope.usuario.materno = data.datos[0].materno;
          $scope.usuario.nombres = data.datos[0].nombres;
          $scope.usuario.fecha_nacimiento = data.datos[0].fecha_nacimiento;
          $scope.usuario.genero = data.datos[0].genero;
        }else{
          $scope.usuario.id = null;          
          $scope.usuario.rol_id = 2;
          $scope.usuario.paterno = null;
          $scope.usuario.materno = null;
          $scope.usuario.nombres = null;
          $scope.usuario.fecha_nacimiento = null;
          $scope.usuario.genero = null;
        }
      });
    });

    $scope.newUsuario = function(){
        usSpinnerService.spin('spinner-1');
        UsuariosFactory.create($scope.usuario, function(data){
          usSpinnerService.stop('spinner-1');
          if(data.message.guardado){
              $.fn.jAlert({
                    'title':'¡Satisfactorio!',
                    'message': data.message.mensaje,
                    'theme': 'success',
                    'closeBtn': false,
                    'btn': [{'label':'Cerrar', 
                             'closeOnClick': true, 
                             'cssClass': 'green',                                
                           }],
                    'size': 'small',                      
                    'onClose': function(){
                        $scope.mtdList();
                    }
                  });

          }else{
              $.fn.jAlert({
                    'title':'Error!',
                    'message': data.message.mensaje,
                    'theme': 'error'
                  });
          }
        });    
    };

    $scope.mtdList = function(){        
        $location.path('/usuariosUnidadEducativa');
        $scope.$apply();
    }

}]);

// Unidad Educativa Configuracion
usuariosController.controller('configuracionController', ['$scope','UsuariosFactory','$location', function($scope, UsuariosFactory, $location) {

  $scope.selectMenu = function(url){
    $location.path(url);
  }
    
}]);


usuariosController.controller('usuariosUnidadEducativaController', ['$scope','UsuariosListFactory', 'UsuariosFactory','UsuarioFactory','$location', 'sesionesControl', 'usSpinnerService', function($scope, UsuariosListFactory, UsuariosFactory, UsuarioFactory, $location, sesionesControl, usSpinnerService) {
    // Variables
    $scope.usuarios = null;    
    // constructor
    $scope.__construct = function(){
      usSpinnerService.spin('spinner-1');
      UsuariosListFactory.query({query_id: 127, user_id: sesionesControl.get('user_id')}, function(data){
        usSpinnerService.stop('spinner-1');
        $scope.usuarios = data.datos;
      });       
    }

    $scope.addUsuario = function(){
       $location.path('/addUsuario');
    };

    $scope.deleteUsuario = function(usuarioId){
       UsuarioFactory.delete({id: usuarioId});
       UsuariosFactory.query(function(data){
        $scope.usuarios = data.usuarios;});
    };
    
    // inciar
    $scope.__construct();
    
}]);

