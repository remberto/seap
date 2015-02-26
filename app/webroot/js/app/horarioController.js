var horarioController = angular.module('horarioControllers',[]);

horarioController.controller('horarioController', ['$scope','$routeParams','sesionesControl','dialogs','HorarioFactory','HorariosFactory','PeriodoHorarioFactory','InscripcionListFactory', 'AsistenciaFactory', 'usSpinnerService', '$location', function($scope, $routeParams, sesionesControl, dialogs, HorarioFactory, HorariosFactory, PeriodoHorarioFactory, InscripcionListFactory, AsistenciaFactory, usSpinnerService, $location) {
    $scope.idCurso = $routeParams.curso_id;
    $scope.idAsignado = $routeParams.asignado_id;

    HorarioFactory.query({docente_id: sesionesControl.get('user_id')}, function(data){
      $scope.dias = data.datos.dias;
      $scope.periodos = data.datos.periodos;
      $scope.horarios = data.datos.horario;      
    });

    $scope.asistencia = {curso: 0, mes: 0};

    $scope.selected = 'None';

    $scope.menuOptions = [
        ['Select', function ($itemScope) {

            console.log($itemScope.dia);
        }],
        null, // Dividier
        ['Remove', function ($itemScope) {
            console.log($itemScope);
        }]
    ];

    $scope.menuPeriodo = [
        ['Editar', function ($itemScope) {

            console.log($itemScope);
        }],        
        ['Eliminar', function ($itemScope) {
          PeriodoHorarioFactory.delete({id:$itemScope.periodo.id}, function(data){
              HorarioFactory.query({docente_id: sesionesControl.get('user_id')}, function(data){
                $scope.dias = data.datos.dias;
                $scope.periodos = data.datos.periodos;
                $scope.horarios = data.datos.horario;
              });
            });   
        }]
    ];


    $scope.mtdAddClase = function($event, idDia, idPeriodo){  
      $event.preventDefault();    
      var dlg = dialogs.create('/pages/dialogs/horario.html','claseController', {diaId: idDia, periodoId: idPeriodo}, {size:'lg'});
      dlg.result.then(function(data){
          if(data.result === 'addAsignatura'){
            var dlg = dialogs.create('/pages/dialogs/addAsignatura.html','addasignaturaController',{}, {size:'lg'});
            dlg.result.then(function(data){
              $scope.mtdAddClase($event, idDia, idPeriodo);
            });
          }else{
            HorarioFactory.query({docente_id: sesionesControl.get('user_id')}, function(data){
              console.log(data);
              $scope.dias = data.datos.dias;
              $scope.periodos = data.datos.periodos;
              $scope.horarios = data.datos.horario;  
            });
          }                       
      });
    }

    $scope.mtdDelClase = function($event, idClase){
      $event.preventDefault();         
        $.fn.jAlert({
                'title':'Eliminar',
                'message': '¿Desea dar Eliminar la Clase?',          
                'closeBtn': false,
                'theme': 'info',
                'btn': [{'label':'Eliminar', 
                         'closeOnClick': false, 
                         'cssClass': 'blue',
                         'onClick': function(alert){
                              usSpinnerService.spin('spinner-1');                     
                              HorariosFactory.delete({id: idClase}, function(data){
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
                                                  HorarioFactory.query({docente_id: sesionesControl.get('user_id')}, function(data){
                                                    usSpinnerService.stop('spinner-1');
                                                    $scope.dias = data.datos.dias;
                                                    $scope.periodos = data.datos.periodos;
                                                    $scope.horarios = data.datos.horario; 
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
    }

    $scope.mtdAddPeriodo = function(){
      var dlg = dialogs.create('/pages/dialogs/periodo.html','periodoController', {}, {size:'sm'});
      dlg.result.then(function(data){
          HorarioFactory.query({docente_id: sesionesControl.get('user_id')}, function(data){
            $scope.dias = data.datos.dias;
            $scope.periodos = data.datos.periodos;
            $scope.horarios = data.datos.horario; 
          });                       
      });
    }

    $scope.mtdViewAdd = function(event){
      $(event.target).addClass('active');
    }

    $scope.mtdViewRem = function(event){
      $(event.target).removeClass('active');
    }

    $scope.mtdDelPeriodo = function(){
      
    }

}]);

horarioController.controller('periodoController', ['$scope','PeriodosHorarioFactory','$routeParams','$modalInstance', '$location', 'data',  function($scope, PeriodosHorarioFactory, $routeParams, $modalInstance, $location, data) {
  //$scope.evaluacion = {criterios: null}
  $scope.periodo = data; 

  $scope.cancel = function(){
    $modalInstance.dismiss('Canceled');
      }; // end cancel
    
  $scope.save = function(){
      PeriodosHorarioFactory.create($scope.periodo, function(data){
          $modalInstance.close();
        });                    
  };
  
}]);

horarioController.controller('claseController', ['$scope','GestionesFactory','UnidadesEducativasUsuarioFactory','NivelesUnidadEducativaFactory','GradosNivelFactory','ParalelosFactory','TurnosFactory','HorarioFactory','PeriodosHorarioFactory','$routeParams','$modalInstance', '$location', 'usSpinnerService', 'sesionesControl', 'AsignaturasNivelFactory', 'data',  function($scope, GestionesFactory, UnidadesEducativasUsuarioFactory, NivelesUnidadEducativaFactory, GradosNivelFactory, ParalelosFactory, TurnosFactory, HorarioFactory, PeriodosHorarioFactory, $routeParams, $modalInstance, $location, usSpinnerService, sesionesControl, AsignaturasNivelFactory, data) {
  //$scope.evaluacion = {criterios: null}   
  usSpinnerService.spin('spinner-1');
  $scope.periodo = data;
  $scope.niveles = null;
  $scope.grados = null;                    
  $scope.curso = {Gestion: 2015, UnidadEducativa: '', Paralelo: null, Turno: null, cupo: 20, dia_id: data.diaId, periodo_id: data.periodoId}; 

  GestionesFactory.query({habilitado: true}, function(data){ usSpinnerService.stop('spinner-1'); $scope.gestiones = data.datos;});
    UnidadesEducativasUsuarioFactory.query({query_id: 113, user_id: sesionesControl.get('user_id')}, function(data){
        $scope.curso.UnidadEducativa = data.datos[0]; 
        $scope.curso.docente_id =  sesionesControl.get('user_id');     
        NivelesUnidadEducativaFactory.query({unidad_educativa_id: $scope.curso.UnidadEducativa.id},function(data){
          usSpinnerService.stop('spinner-1'); 
          $scope.niveles = data.datos;

        });
    });
    ParalelosFactory.query(function(data){usSpinnerService.stop('spinner-1'); $scope.paralelos = data.datos;});
    TurnosFactory.query(function(data){usSpinnerService.stop('spinner-1'); $scope.turnos = data.datos;});

    $scope.selectNivel = function(id){        
        if(typeof id === 'undefined'){
            $scope.grados = null;
            $scope.curso.Grado = null;
        }else{
            usSpinnerService.spin('spinner-1');
            GradosNivelFactory.query({nivel_id: id}, function(data){usSpinnerService.stop('spinner-1'); $scope.grados = data.datos });
            AsignaturasNivelFactory.query({query_id: 135, nivel_id: id}, function(data){
              usSpinnerService.stop('spinner-1');      
              $scope.asignaturas = data.datos;
            });
        }    
    };

  $scope.mtdAddAsignatura = function(){
    $modalInstance.close({result: 'addAsignatura'});
  } 

  $scope.cancel = function(){
    $modalInstance.dismiss('Canceled');
      }; // end cancel
    
  $scope.save = function(){
      usSpinnerService.spin('spinner-1');        
        HorarioFactory.create($scope.curso, function(data){            
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
                        $modalInstance.close({result: ''});   
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
  
}]);


horarioController.controller('addasignaturaController', ['$scope','GestionesFactory','UnidadesEducativasUsuarioFactory','NivelesUnidadEducativaFactory','ClasificadorFactory','AsignaturaFactory','$routeParams','$modalInstance', '$location', 'usSpinnerService', 'sesionesControl', 'data',  function($scope, GestionesFactory, UnidadesEducativasUsuarioFactory, NivelesUnidadEducativaFactory, ClasificadorFactory, AsignaturaFactory, $routeParams, $modalInstance, $location, usSpinnerService, sesionesControl, data) {
  //$scope.evaluacion = {criterios: null}   
  usSpinnerService.spin('spinner-1');
  $scope.niveles = null;
  $scope.curso = {Gestion: 2015, UnidadEducativa: '', Paralelo: null, Turno: null, cupo: 20, dia_id: data.diaId, periodo_id: data.periodoId}; 

  GestionesFactory.query({habilitado: true}, function(data){ usSpinnerService.stop('spinner-1'); $scope.gestiones = data.datos;});
    UnidadesEducativasUsuarioFactory.query({query_id: 113, user_id: sesionesControl.get('user_id')}, function(data){
        $scope.curso.UnidadEducativa = data.datos[0]; 
        $scope.curso.docente_id =  sesionesControl.get('user_id');     
        NivelesUnidadEducativaFactory.query({unidad_educativa_id: $scope.curso.UnidadEducativa.id},function(data){
          usSpinnerService.stop('spinner-1'); 
          $scope.niveles = data.datos;
        });
    });

  ClasificadorFactory.query({query_id:3}, function(data){
    $scope.areas = data.datos;
  })

  $scope.cancel = function(){
    $modalInstance.close();
  }; // end cancel
    
  $scope.save = function(){
    usSpinnerService.spin('spinner-1');        
        AsignaturaFactory.create($scope.asignatura, function(data){            
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
                        $modalInstance.close();   
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
  
}]);