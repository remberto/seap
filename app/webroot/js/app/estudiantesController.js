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
    console.log('aqui');
    $scope.estudiante = {paterno: '', materno:'', nombres:'', fecha_nacimiento: '1990-01-01'};
    
    $scope.today = function() {
	$scope.estudiante.fecha_nacimiento = new Date();
    };
    $scope.today();

    $scope.clear = function () {
	$scope.estudiante.fecha_nacimiento = null;
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

    $scope.newEstudiante = function(){
	$scope.estudiante.user_id = sesionesControl.get('user_id');
        EstudiantesFactory.create($scope.estudiante);
        $location.path('/filiacion');
    };
}]);
