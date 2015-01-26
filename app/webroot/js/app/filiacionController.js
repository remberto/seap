var filiacionController = angular.module('filiacionControllers',[]);

filiacionController.controller('filiacionController', ['$scope','$routeParams','InscripcionListFactory','$location', 'usSpinnerService', function($scope, $routeParams, InscripcionListFactory, $location, usSpinnerService) {
    $scope.estudiantes = null;    
    usSpinnerService.spin('spinner-1');
    $scope.curso = {id: $routeParams.idCurso};       

    InscripcionListFactory.query({query_id:124, curso_id:$routeParams.curso_id}, function(data){
      usSpinnerService.stop('spinner-1');
      $scope.estudiantes = data.datos;
    })

}]);