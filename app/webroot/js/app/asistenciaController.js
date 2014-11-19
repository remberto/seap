var asistenciaController = angular.module('asistenciaControllers',[]);

asistenciaController.controller('asistenciaController', ['$scope','$routeParams','InscripcionFactory','$location', function($scope, $routeParams, InscripcionFactory, $location) {
    $scope.estudiantes = null;
    $scope.asistencia = {fecha: '2014-11-15'};

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

    InscripcionFactory.query({curso_id: $routeParams.curso_id}, function(data){$scope.estudiantes = data.inscripciones;});

}]);