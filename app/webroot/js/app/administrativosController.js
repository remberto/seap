
var administrativosController = angular.module('administrativosControllers',[]);

administrativosController.controller('administrativosController', ['$scope','AdministrativosFactory', 'ActionAdministrativoFactory','$location', 'sesionesControl', function($scope, AdministrativosFactory, ActionAdministrativoFactory, $location, sesionesControl) {
    

    $scope.addAdministrativo = function(){
       $location.path('/addAdministrativo');
    };

    $scope.deleteAdministrativo = function(Id){
        $.fn.jAlert({
          'title':'Eliminar',
          'message': '¿Desea Eliminar el Personal Administrativo?',          
          'closeBtn': false,
          'theme': 'info',
          'btn': [{'label':'Eliminar', 
                   'closeOnClick': false, 
                   'cssClass': 'blue',
                   'onClick': function(alert){
                        ActionAdministrativoFactory.delete({id: Id}, function(data){
                            if(data.message.eliminado){
                                $.fn.jAlert({
                                      'title':'¡Satisfactorio!',
                                      'message': 'Se elimino correctamente el personal administrativo',
                                      'theme': 'success',
                                      'closeBtn': false,
                                      'btn': [{'label':'Cerrar', 
                                               'closeOnClick': true, 
                                               'cssClass': 'green',                                
                                             }],
                                      'size': 'small',                      
                                      'onClose': function(){
                                          AdministrativosFactory.query({query_id: 119, user_id: sesionesControl.get('user_id')}, function(data){$scope.administrativos = data.datos;});
                                      }
                                    });

                            }else{
                                $.fn.jAlert({
                                      'title':'Error!',
                                      'message': 'No Puede ser eliminado el Personal Administrativo',
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
        });       
    };

    AdministrativosFactory.query({query_id: 119, user_id: sesionesControl.get('user_id')}, function(data){$scope.administrativos = data.datos;});

}]);


administrativosController.controller('administrativoController', ['$scope', 'UnidadesEducativasUsuarioFactory', 'AdministrativoFactory', 'CargoAdministrativoFactory', 'FinanciamientoFactory', 'FormacionFactory', '$location', 'sesionesControl', function($scope, UnidadesEducativasUsuarioFactory, AdministrativoFactory, CargoAdministrativoFactory, FinanciamientoFactory, FormacionFactory, $location, sesionesControl) {            
    $scope.administrativo = {UnidadEducativa: ''};    
    CargoAdministrativoFactory.query(function(data){ $scope.cargos = data.datos});
    FinanciamientoFactory.query(function(data){ $scope.financiamientos = data.datos});
    FormacionFactory.query(function(data){ $scope.formaciones = data.datos});    
    UnidadesEducativasUsuarioFactory.query({query_id: 113, user_id: sesionesControl.get('user_id')}, function(data){$scope.administrativo.UnidadEducativa = data.datos[0];});    
    $scope.newAdministrativo = function(){        
        AdministrativoFactory.create($scope.administrativo, function(data){            
            if(data.message.guardado){
                $.fn.jAlert({
                      'title':'¡Satisfactorio!',
                      'message': 'Se guardo correctamente el nuevo personal administrativo',
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
                      'message': 'El Nuevo Personal Administrativo no fue guardado correctamente',
                      'theme': 'error'
                    });
            }            
        });
    }

    $scope.mtdList = function(){        
        $location.path('/administrativos'); 
        $scope.$apply();
    }
}]);


    