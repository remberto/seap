var evaluacionController = angular.module('evaluacionControllers',[]);

evaluacionController.controller('evaluacionController', ['$scope','$routeParams','InscripcionFactory','$location', function($scope, $routeParams, InscripcionFactory, $location) {
    $scope.estudiantes = null;       

    InscripcionFactory.query({curso_id: $routeParams.curso_id}, function(data){$scope.estudiantes = data.inscripciones;});

}]);