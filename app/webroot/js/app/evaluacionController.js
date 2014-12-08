var evaluacionController = angular.module('evaluacionControllers',[]);

evaluacionController.controller('evaluacionController', ['$scope','$routeParams','InscripcionFactory', 'PeriodoFactory', 'DimensionFactory', 'ActividadEvaluacionFactory', '$location', function($scope, $routeParams, InscripcionFactory, PeriodoFactory, DimensionFactory, ActividadEvaluacionFactory, $location) {
	$scope.estudiantes = null;       
	$scope.periodos = null;
	$scope.dimenciones = null;
	$scope.actividades = null;
	$scope.objetivos = null;

	ActividadEvaluacionFactory.query({}, function(data){ $scope.actividades = data.actividades;});
	
	PeriodoFactory.query({}, function(data){$scope.periodos = data.periodos;});

	DimensionFactory.query({}, function(data){$scope.dimensiones = data.dimensiones;});

	InscripcionFactory.query({curso_id: $routeParams.curso_id}, function(data){$scope.estudiantes = data.inscripciones;});


}]);