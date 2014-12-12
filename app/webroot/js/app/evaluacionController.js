var evaluacionController = angular.module('evaluacionControllers',[]);

evaluacionController.controller('evaluacionController', ['$scope','$routeParams','InscripcionFactory', 'PeriodoFactory', 'DimensionFactory', 'ActividadEvaluacionFactory', 'ClasificadorFactory', 'InscritosEvaluacionFactory', '$location', function($scope, $routeParams, InscripcionFactory, PeriodoFactory, DimensionFactory, ActividadEvaluacionFactory, ClasificadorFactory, InscritosEvaluacionFactory, $location) {
	$scope.estudiantes = null;       
	$scope.periodos = null;
	$scope.dimensiones = null;
	$scope.dimension = null;
	$scope.actividades = null;
	$scope.objetivos = null;
	$scope.periodo_id = null;
	$scope.actividad_id = null;
	$scope.periodo = null; // {name:'', id:0};
	$scope.objetivo = null;
	$scope.inscripciones = null;

	ActividadEvaluacionFactory.query({}, function(data){ $scope.actividades = data.actividades;});
	
	PeriodoFactory.query({}, function(data){$scope.periodos = data.periodos;});

	DimensionFactory.query({}, function(data){
		//$scope.dimensiones = data.dimensiones;
		ClasificadorFactory.query({query_id:107}, function(data){ $scope.dimensiones = data.datos; });
		});

	$scope.curso_id = $routeParams.curso_id;

	InscripcionFactory.query({curso_id: $routeParams.curso_id}, function(data){$scope.estudiantes = data.inscripciones;});

  //alert($routeParams.curso_id);

	// ObjetivosHolisticos
  $scope.mtdSelectObjetivos = function(idBimestre) {
  	//alert("BI " + idBimestre);
  	//alert($routeParams.asignado_id+"-"+idBimestre);

  	ClasificadorFactory.query({query_id:6, asignado_id: $routeParams.asignado_id, periodo_id: idBimestre}, function(data){ $scope.objetivos = data.datos; });
  };

  //Carga Inscritos y sus evaluaciones por cada Criterio
  $scope.mtdSelectCriterios = function(idDimencion) {
  		//alert("");
  		InscritosEvaluacionFactory.query({curso_id: $routeParams.curso_id}, function(data){ $scope.inscripciones = data.inscripciones; });
  		/*ClasificadorFactory.query({query_id:7, dimension_id: idDimencion, planificacion_clases_id: $scope.objetivo.id}, function(data){ $scope.criterios = data.datos; });*/
  }

}]);