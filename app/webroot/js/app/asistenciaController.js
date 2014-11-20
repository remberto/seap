var asistenciaController = angular.module('asistenciaControllers',[]);

asistenciaController.controller('asistenciaController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionFactory', 'AsistenciaFactory', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionFactory, AsistenciaFactory, $location) {
    $scope.estudiantes = null;
    $scope.asistencia = {fecha: '2014-11-15'};

    $scope.today = function() {
        $scope.asistencia.fecha = new Date();
    };

    $scope.asignado_id = $routeParams.asignado_id;
    
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

    InscripcionFactory.query({curso_id: $routeParams.curso_id}, function(data){$scope.estudiantes = data.inscripciones;});

    //Registra Asistencia del Inscrito
    $scope.mtdRegistraAsistencia = function(id, asiste)
    {   
        $scope.asistencia.asignado_id = $scope.asignado_id;
        $scope.asistencia.inscripcion_id = id;
        $scope.asistencia.calendario_fecha = $scope.asistencia.fecha;
        $scope.asistencia.estado_asistencia = asiste;
        //$scope.asistencia.docente_id = sesionesControl.get('user_id');   
        
        AsistenciaFactory.create($scope.asistencia);
    };

}]);