
var docentesController = angular.module('docentesControllers',[]);

docentesController.controller('docentesController', ['$scope','DocentesFactory', 'ActionDocenteFactory', '$location', 'sesionesControl', 'usSpinnerService', function($scope, DocentesFactory, ActionDocenteFactory, $location, sesionesControl, usSpinnerService) {
    usSpinnerService.spin('spinner-1');

    $scope.addDocente = function(){
       $location.path('/addDocente');
    };

    $scope.deleteDocente = function(Id){
        $.fn.jAlert({
          'title':'Eliminar',
          'message': '¿Desea dar de Baja al Docente de la UnidadEducativa?',          
          'closeBtn': false,
          'theme': 'info',
          'btn': [{'label':'Eliminar', 
                   'closeOnClick': false, 
                   'cssClass': 'blue',
                   'onClick': function(alert){
                        usSpinnerService.spin('spinner-1');
                        ActionDocenteFactory.delete({id: Id}, function(data){
                            usSpinnerService.stop('spinner-1');
                            if(data.message.eliminado){
                                $.fn.jAlert({
                                      'title':'¡Satisfactorio!',
                                      'message': 'Se dio de baja correctamente',
                                      'theme': 'success',
                                      'closeBtn': false,
                                      'btn': [{'label':'Cerrar', 
                                               'closeOnClick': true, 
                                               'cssClass': 'green',                                
                                             }],
                                      'size': 'small',                      
                                      'onClose': function(){
                                          usSpinnerService.spin('spinner-1');
                                          DocentesFactory.query({query_id: 123, user_id: sesionesControl.get('user_id')}, function(data){
                                             usSpinnerService.stop('spinner-1');
                                            $scope.docentes = data.datos;});
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

    DocentesFactory.query({query_id: 123, user_id: sesionesControl.get('user_id')}, function(data){usSpinnerService.stop('spinner-1'); $scope.docentes = data.datos;});

}]);


docentesController.controller('docenteController', ['$scope', 'UnidadesEducativasUsuarioFactory', 'DocenteFactory', 'FinanciamientoFactory', 'FormacionFactory', '$location', 'sesionesControl', 'usSpinnerService', function($scope, UnidadesEducativasUsuarioFactory, DocenteFactory, FinanciamientoFactory, FormacionFactory, $location, sesionesControl, usSpinnerService) {            
    usSpinnerService.spin('spinner-1');
    $scope.docente = {UnidadEducativa: ''};        
    FinanciamientoFactory.query(function(data){usSpinnerService.stop('spinner-1'); $scope.financiamientos = data.datos});
    FormacionFactory.query(function(data){usSpinnerService.stop('spinner-1'); $scope.formaciones = data.datos});    
    UnidadesEducativasUsuarioFactory.query({query_id: 113, user_id: sesionesControl.get('user_id')}, function(data){usSpinnerService.stop('spinner-1'); $scope.docente.UnidadEducativa = data.datos[0];});    
    

    $scope.newDocente = function(){
        usSpinnerService.spin('spinner-1');        
        DocenteFactory.create($scope.docente, function(data){            
            if(data.message.guardado){
                usSpinnerService.stop('spinner-1');
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
                usSpinnerService.stop('spinner-1');
                $.fn.jAlert({
                      'title':'Error!',
                      'message': 'El Nuevo Personal Administrativo no fue guardado correctamente',
                      'theme': 'error'
                    });
            }            
        });
    }

    $scope.mtdList = function(){        
        $location.path('/docentes'); 
        $scope.$apply();
    }
}]);