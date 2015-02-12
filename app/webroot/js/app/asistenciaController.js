var asistenciaController = angular.module('asistenciaControllers',[]);

asistenciaController.controller('asistenciaController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionListFactory', 'AsistenciaFactory', 'AsistenciaResumenFactory', 'CursosDocenteFactory', 'CursosDocenteAsignaturaFactory', 'usSpinnerService','$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionListFactory, AsistenciaFactory, AsistenciaResumenFactory, CursosDocenteFactory, CursosDocenteAsignaturaFactory, usSpinnerService, $location) {
    $scope.habilitado = false;
    $scope.meses = [ {id: 2, title: 'Febrero'},
                     {id: 3, title: 'Marzo'},
                     {id: 4, title: 'Abril'},
                     {id: 5, title: 'Mayo'},
                     {id: 6, title: 'Junio'},
                     {id: 7, title: 'Julio'},
                     {id: 8, title: 'Agosto'},
                     {id: 9, title: 'Septiembre'},
                     {id: 10, title: 'Octubre'},
                     {id: 11, title: 'Noviembre'},                     
                      ];

    $scope.asistencia = {curso: 0, mes: 0};
    $scope.resumen = {curso: 0, asignado: 0};

    CursosDocenteFactory.query({query_id: 131, docente_id: sesionesControl.get('user_id'), gestion_id: sesionesControl.get('gestion')},function(data){
      $scope.cursos = data.datos;            
    });

    $scope.mtdSelectCurso = function(curso){
      $scope.habilitado = false;
      $scope.asistencia = null;
      $scope.asistencia = {curso: 0, mes: 0};
      $scope.resumen = null;
      $scope.resumen = {curso: 0, asignado: 0};
      CursosDocenteAsignaturaFactory.query({query_id: 132, docente_id: sesionesControl.get('user_id'), curso_id: curso.id } ,
        function(data){
          $scope.asignados = data.datos;          
      });
    }

    $scope.mtdView = function(Curso, Asignado){
      $scope.habilitado = true;
      $scope.mtdVer(2, Curso, Asignado);
      $scope.mtdResumen(Curso, Asignado);
    }

    $scope.mtdAddAsistencia = function(Estudiante, Mes, Dia, Curso, Asignado, estado){
        console.log(Dia);
        $scope.registro = {asignado_id:'', inscripcion_id:'',calendario_fecha:''};
        $scope.registro.asignado_id = Asignado.id;
        $scope.registro.inscripcion_id = Estudiante.id;
        $scope.registro.calendario_fecha = Dia.fecha;        
        if(estado == 0){
          $scope.registro.estado_asistencia = 1;
        } else if(estado == 1){
          $scope.registro.estado_asistencia = 2;
        } else if(estado == 2){
          $scope.registro.estado_asistencia = 3;
        }  else if(estado == 3){
          $scope.registro.estado_asistencia = 4;
        } else if(estado == 4){
          $scope.registro.estado_asistencia = 1;
        }
        $scope.registro.docente_id = sesionesControl.get('user_id');        
        usSpinnerService.spin('spinner-1');
        AsistenciaFactory.create($scope.registro, function(data){
            usSpinnerService.stop('spinner-1');            
            if(data.datos.guardado){
              $scope.mtdVer(Mes.id, Curso, Asignado);
            }else{
                $.fn.jAlert({
                      'title':'Error!',
                      'message': data.datos.message,
                      'theme': 'error'
                    });
            };
        });
    }

    $scope.mtdVer = function(id, Curso, Asignado){
        if($scope.habilitado == true){
          //$scope.asistencia = null;
          $scope.asistencia.mes = id;
          $scope.asistencia.curso = Curso.id;
          $scope.asistencia.asignado = Asignado.id;          
          AsistenciaFactory.query($scope.asistencia, function(data){
             // console.log(data.datos);            //
             $scope.asistencia = data.datos.asistencia;
             $scope.resumen = data.datos.resumen;
             $scope.estudiantes = data.datos.inscritos;
             $scope.dias = data.datos.dias;             
          })
        }
    }

    $scope.mtdResumen = function(Curso, Asignado){
      if($scope.habilitado == true){
          //$scope.asistencia = null;          
          $scope.resumen.curso = Curso.id;
          $scope.resumen.asignado = Asignado.id;          
          AsistenciaResumenFactory.query($scope.resumen, function(data){
             // console.log(data.datos);            //             
             $scope.resumen_anual = data.datos.resumen;
             $scope.estudiantes = data.datos.inscritos;             
          })
        }
    }

}]);

asistenciaController.controller('asistenciaCheckController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionListFactory', 'AsistenciaFactory', '$location', 'usSpinnerService', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionListFactory, AsistenciaFactory, $location, usSpinnerService) {
    
    $scope.estudiantes = null;
    $scope.asistencia = {fecha: '2014-11-15'};
    $scope.asignado_id = $routeParams.asignado_id;

    $scope.today = function() {
        $scope.asistencia.fecha = new Date();
    };    
    
    $scope.today();

    $scope.clear = function () {
        $scope.asistencia.fecha = null;
    };

  // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };
    
    $scope.format = 'yyyy-MM-dd';


    InscripcionListFactory.query({query_id: 124, curso_id: $routeParams.curso_id}, function(data){
        $scope.estudiantes = data.datos;
    });

    //Registra Asistencia del Inscrito
    $scope.mtdRegistraAsistencia = function(id, asiste)
    {           
        $scope.asistencia.asignado_id = $scope.asignado_id;
        $scope.asistencia.inscripcion_id = id;
        $scope.asistencia.calendario_fecha = $scope.asistencia.fecha;
        $scope.asistencia.estado_asistencia = asiste;
        $scope.asistencia.docente_id = sesionesControl.get('user_id');        
        usSpinnerService.spin('spinner-1');
        AsistenciaFactory.create($scope.asistencia, function(data){
            usSpinnerService.stop('spinner-1');
            if(!data.datos.guardado){
                $.fn.jAlert({
                      'title':'Error!',
                      'message': data.datos.message,
                      'theme': 'error'
                    });
            };
        });
    };    

}]);