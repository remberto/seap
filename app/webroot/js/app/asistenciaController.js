var asistenciaController = angular.module('asistenciaControllers',[]);

asistenciaController.controller('asistenciaController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionListFactory', 'AsistenciaFactory', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionListFactory, AsistenciaFactory, $location) {
    $scope.idCurso = $routeParams.curso_id;
    $scope.idAsignado = $routeParams.asignado_id;
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

    $scope.addAsistencia = function(idCurso, idAsignado){
        console.log(idCurso);
        $location.path('/registrarAsistencia/'+idAsignado+'/'+idCurso);
    }

    $scope.mtdVer = function(id, idCurso, idAsignado){                
        $scope.asistencia.mes = id;
        $scope.asistencia.curso = idCurso;
        $scope.asistencia.asignado = idAsignado;
        AsistenciaFactory.query($scope.asistencia, function(data){
            //console.log(data.datos);            //
           $scope.asistencia = data.datos.asistencia;
           $scope.estudiantes = data.datos.inscritos;
           $scope.dias = data.datos.dias;
        })
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