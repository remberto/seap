var inscripcionesController = angular.module('inscripcionesControllers',[]);

inscripcionesController.controller('inscripcionCursoController', ['$scope','CursosListFactory','CursoFactory','$location', 'sesionesControl', 'usSpinnerService', function($scope, CursosListFactory, CursoFactory, $location, sesionesControl, usSpinnerService) {
    usSpinnerService.spin('spinner-1');
    $scope.cursos = null;    
    CursosListFactory.query({query_id: 125, habilitado: true, user_id: sesionesControl.get('user_id')}, function(data){usSpinnerService.stop('spinner-1'); $scope.cursos = data.datos;});

    $scope.inscribir = function(idCurso){
      $location.path('/inscribir/'+idCurso);
    }

    $scope.lista = function(idCurso){
      $location.path('/listInscripciones/'+idCurso);
    }

}]);


inscripcionesController.controller('inscribirController', ['$scope','$routeParams', 'DocentesFactory', 'CursoViewFactory','InscripcionFactory','$location', 'sesionesControl', 'usSpinnerService', function($scope, $routeParams, DocentesFactory, CursoViewFactory, InscripcionFactory, $location, sesionesControl, usSpinnerService) {
    usSpinnerService.spin('spinner-1');
    $scope.cursos = null;    
    $scope.inscripcion = {'curso_id': $routeParams.idCurso};
    CursoViewFactory.query({query_id: 126, curso_id: $routeParams.idCurso}, function(data){
      usSpinnerService.stop('spinner-1'); 
      $scope.curso = data.datos[0];
    });    
    

    
    $scope.newInscripcion = function(){
      usSpinnerService.spin('spinner-1');
      InscripcionFactory.create($scope.inscripcion, function(data){
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
                      $scope.mtdList($scope.inscripcion.curso_id);
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
    }

    $scope.mtdList = function(idCurso){        
        $location.path('/listInscripciones/'+idCurso); 
        $scope.$apply();
    }

}]);


inscripcionesController.controller('inscripcionListController', ['$scope','$routeParams','InscripcionListFactory','InscripcionActionFactory','CursoViewFactory','$location', 'sesionesControl', 'usSpinnerService', function($scope, $routeParams, InscripcionListFactory, InscripcionActionFactory, CursoViewFactory, $location, sesionesControl, usSpinnerService) {
    usSpinnerService.spin('spinner-1');
    $scope.curso = {id: $routeParams.idCurso};       

    InscripcionListFactory.query({query_id:124, curso_id:$routeParams.idCurso}, function(data){
      usSpinnerService.stop('spinner-1');
      $scope.inscripciones = data.datos;
    })

    CursoViewFactory.query({query_id: 126, curso_id: $routeParams.idCurso}, function(data){
      usSpinnerService.stop('spinner-1');       
      $scope.curso = data.datos[0];
    });

    $scope.mtdListCursos = function(){
      $location.path('/inscripciones');      
    }    

    $scope.mtdInscribir = function(idCurso){
      $location.path('/inscribir/'+idCurso);
    }    

    $scope.mtdPrint = function(divName){
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;
      
      if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
          var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWin.window.focus();
          popupWin.document.write('<!DOCTYPE html><html><head>' +
              '<link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" />' +
              '<link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" />' +
              '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div></html>');
          popupWin.onbeforeunload = function (event) {              
              popupWin.close();
              //return '.\n';
          };
          popupWin.onabort = function (event) {
              popupWin.document.close();
              popupWin.close();
          }
      } else {
          var popupWin = window.open('', '_blank', 'width=800,height=600');
          popupWin.document.open();
          popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" /><link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" /></head><body onload="window.print()">' + printContents + '</html>');
          popupWin.document.close();
      }
      popupWin.document.close();
    }

    $scope.deleteInscripcion = function(idEstudiante){          
        $.fn.jAlert({
          'title':'Eliminar',
          'message': '¿Desea dar de Baja la Inscripcion?',          
          'closeBtn': false,
          'theme': 'info',
          'btn': [{'label':'Eliminar', 
                   'closeOnClick': false, 
                   'cssClass': 'blue',
                   'onClick': function(alert){
                        usSpinnerService.spin('spinner-1');                     
                        InscripcionActionFactory.delete({id: idEstudiante }, function(data){
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
                                          InscripcionListFactory.query({query_id:124, curso_id:$routeParams.idCurso}, function(data){
                                            usSpinnerService.stop('spinner-1');
                                            $scope.inscripciones = data.datos;
                                          })
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

}]);