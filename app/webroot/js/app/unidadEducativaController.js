var unidadEducativaController = angular.module('unidadEducativaControllers',[]);

unidadEducativaController.controller('unidadesEducativasController', ['$scope','UnidadesEducativasFactory','UnidadEducativaFactory', 'UnidadesEducativasUsuarioFactory', '$location', 'usSpinnerService', 'sesionesControl',  function($scope, UnidadesEducativasFactory, UnidadEducativaFactory, UnidadesEducativasUsuarioFactory, $location, usSpinnerService, sesionesControl) {
    $scope.unidades_educativas = null;

    $scope.__construct = function(){
      usSpinnerService.spin('spinner-1');
      UnidadesEducativasUsuarioFactory.query({query_id:113, user_id: sesionesControl.get('user_id')}, function(data){
        usSpinnerService.stop('spinner-1');
        $scope.unidades_educativas = data.datos;
      });   
    }

    $scope.addUnidadEducativa = function(){
       $location.path('/addUnidadEducativa');
    };

    $scope.deleteUnidadEducativa = function(idUnidadEducativa){
      $.fn.jAlert({
          'title':'Eliminar',
          'message': '¿Desea dar de Baja la UnidadEducativa?',          
          'closeBtn': false,
          'theme': 'info',
          'btn': [{'label':'Eliminar', 
                   'closeOnClick': false, 
                   'cssClass': 'blue',
                   'onClick': function(alert){
                        usSpinnerService.spin('spinner-1');                     
                        UnidadEducativaFactory.delete({id: idUnidadEducativa}, function(data){
                            usSpinnerService.stop('spinner-1');
                            if(data.message.eliminado){
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
                                          usSpinnerService.spin('spinner-1');
                                          UnidadesEducativasUsuarioFactory.query({query_id:113, user_id: sesionesControl.get('user_id')}, function(data){
                                            usSpinnerService.stop('spinner-1');
                                            $scope.unidades_educativas = data.datos;
                                          });
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
                        alert.closeAlert(true);
                   }
                 },
                 {'label':'Cancelar', 
                   'closeOnClick': true,                    
                 }],
          'size': 'small',          
        })
    };
    
    $scope.__construct();
}]);


unidadEducativaController.controller('unidadEducativaController', ['$scope','UnidadesEducativasFactory','UnidadesEducativasOficialFactory','$location', 'usSpinnerService', 'sesionesControl', function($scope, UnidadesEducativasFactory, UnidadesEducativasOficialFactory, $location, usSpinnerService, sesionesControl) {
  $scope.unidadEducativa = {user_id:  sesionesControl.get('user_id') }

  $scope.__construct = function()
  {
    $scope.$watch("unidadEducativa.id", function(newValue, oldValue){
      UnidadesEducativasOficialFactory.query({query_id: 134, unidad_educativa_id: newValue}, function(data){        
        if(data.datos.length > 0){          
          $scope.unidadEducativa.id = data.datos[0].id;
          $scope.unidadEducativa.descripcion = data.datos[0].descripcion;
          $scope.unidadEducativa.user_id = sesionesControl.get('user_id');
        }else{
          //$scope.unidadEducativa.id = null;
          $scope.unidadEducativa.descripcion = null;
          $scope.unidadEducativa.user_id = sesionesControl.get('user_id');
        }
      });
    });
  }

  $scope.newUnidadEducativa = function(){
    usSpinnerService.spin('spinner-1');        
    UnidadesEducativasFactory.create($scope.unidadEducativa, function(data){            
        if(data.message.guardado){
            usSpinnerService.stop('spinner-1');
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
            usSpinnerService.stop('spinner-1');
            $.fn.jAlert({
                  'title':'Error!',
                  'message': data.message.mensaje,
                  'theme': 'error'
                });
        }            
    });      
  };

  $scope.mtdList = function(){        
    $location.path('/UnidadesEducativas');
    $scope.$apply();
  };

  $scope.__construct(); 
     
}]);


unidadEducativaController.controller('unidadEducativaViewController', ['$scope','UnidadesEducativasUsuarioFactory','$location', 'sesionesControl', function($scope, UnidadesEducativasUsuarioFactory, $location, sesionesControl) {
    $scope.unidadEducativa = null;
    UnidadesEducativasUsuarioFactory.query({query_id: 118, user_id: sesionesControl.get('user_id')}, function(data){$scope.unidadEducativa = data.datos[0];});    
}]);