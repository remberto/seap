var filiacionController = angular.module('filiacionControllers',[]);

filiacionController.controller('filiacionController', ['$scope','$routeParams','InscripcionFactory','$location', function($scope, $routeParams, InscripcionFactory, $location) {
    $scope.estudiantes = null;    
    InscripcionFactory.query({curso_id: $routeParams.curso_id}, function(data){$scope.estudiantes = data.inscripciones;});

}]);