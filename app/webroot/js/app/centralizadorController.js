var centralizadorController = angular.module('centralizadorControllers',[]);

centralizadorController.controller('centralizadorController', ['$scope','$routeParams', 'sesionesControl','CentralizadorFactory', 'dialogs', 'CursosDocenteFactory', 'usSpinnerService', '$location', function($scope, $routeParams, sesionesControl, CentralizadorFactory, dialogs, CursosDocenteFactory, usSpinnerService, $location) {
	//$scope.evaluacion = {criterios: null}
	$scope.idCurso = $routeParams.curso_id;
    	$scope.idAsignado = $routeParams.asignado_id;
    	$scope.periodo = null;
    	$scope.actividad = null;
    	$scope.habilitado = false;

	// Lista de Cursos
	CursosDocenteFactory.query({query_id: 131, docente_id: sesionesControl.get('user_id'), gestion_id: sesionesControl.get('gestion')},function(data){
	      $scope.cursos = data.datos;            
	});

	$scope.menuEvaluaciones = [
        	['Evaluacion Cualitativa', function ($itemScope) {
        		$scope.mtdEvaluacionCualitativa($itemScope.estudiante);
        		
        	}],        
        	['Boletin de Notas', function ($itemScope) {
        		console.log($itemScope.estudiante)                
        	}]
    	];
	
    	// Cuando se seleciona el Curso se modifica las asignaturas
	$scope.mtdSelectCurso = function(Curso){
	      $scope.habilitado = true;	      
	      CentralizadorFactory.query({curso_id: Curso.id}, function(data){
	      	$scope.estudiantes = data.datos.inscritos;
	      	$scope.areas =data.datos.areas;
	      	$scope.periodos =data.datos.periodos;
	      	$scope.centralizador =data.datos.centralizador;
	      	$scope.promedios =data.datos.promedios;
	      })
    	}
    	$scope.mtdEvaluacionCualitativa = function(Estudiante){
    		var dlg = dialogs.create('/pages/dialogs/evaluacioncualitativa.html','evaluacioncualitativaController', Estudiante, {size:'lg'});
    		dlg.result.then(function(data){ 			
		});
    	}

    	
}]);

centralizadorController.controller('evaluacioncualitativaController', ['$scope','$routeParams','$modalInstance', 'EvaluacionCualitativaFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, EvaluacionCualitativaFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}
	$scope.estudiante = data;

	$scope.periodos = [{id:1, descripcion:'Primer Bimestre'},
			{id:2, descripcion:'Segundo Bimestre'},
			{id:3, descripcion:'Tercer Bimestre'},
			{id:4, descripcion:'Cuarto Bimestre'},]

	$scope.mtdSelectPeriodo = function(Periodo){
		EvaluacionCualitativaFactory.query({estudiante_id: $scope.estudiante.id, periodo_id: Periodo.id}, function(data){
			$scope.dimensiones = data.datos.dimensiones;
			$scope.areas = data.datos.areas;
			$scope.centralizador = data.datos.centralizador;
			$scope.promedios = data.datos.promedios;
			if(data.datos.valoracion_cualitativa != null){
				$scope.valoracion_cualitativa = data.datos.valoracion_cualitativa;
			}
			$scope.valoracion_cualitativa.periodo = Periodo;
		});	
	};

	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    	}; // end cancel
    
    	$scope.save = function(){    		
    		$scope.valoracion_cualitativa.inscrito_id = $scope.estudiante.id;
    		$scope.valoracion_cualitativa.periodo_id = $scope.valoracion_cualitativa.periodo.id;
    		EvaluacionCualitativaFactory.create($scope.valoracion_cualitativa, function(data){
    			$modalInstance.close();
    		});        	
    	};
	
}]);