var estudianteController = angular.module('estudiantesControllers',[]);

estudianteController.controller('estudiantesController', ['$scope','EstudiantesFactory','EstudianteFactory','$location', function($scope, EstudiantesFactory, EstudianteFactory, $location) {
    $scope.estudiantes = null;

    $scope.addEstudiante = function(){
	   $location.path('/addEstudiante');
    };

    $scope.deleteEstudiante = function(estudianteId){
	   EstudianteFactory.delete({id: estudianteId});
	   EstudiantesFactory.query(function(data){$scope.estudiantes = data.estudiantes;});
    };

    $scope.viewEstudiante = function(estudianteId){
	   EstudianteFactory.view({id: estudianteId}, function(data){console.log(data)});
	   //EstudiantesFactory.query(function(data){$scope.estudiantes = data.estudiantes;});
    };
    
    EstudiantesFactory.query(function(data){$scope.estudiantes = data.estudiantes;});
}]);

estudianteController.controller('estudianteController', ['$scope','EstudiantesFactory','sesionesControl','$location', function($scope, EstudiantesFactory, sesionesControl, $location) {

    $scope.newEstudiante = function(){
	$scope.estudiante.user_id = sesionesControl.get('user_id');
        EstudiantesFactory.create($scope.estudiante);
        $location.path('/filiacion');
    };
}]);
