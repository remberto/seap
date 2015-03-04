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
        		$scope.mtdBoletin($itemScope.estudiante);
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

    	$scope.mtdBoletin = function(Estudiante){
    		var dlg = dialogs.create('/pages/dialogs/boletin.html','boletinController', Estudiante, {size:'lg'});
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
			$scope.nivel_id = $scope.areas[0].nivel_id;
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


centralizadorController.controller('boletinController', ['$scope','$routeParams','$modalInstance', 'BoletinFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, BoletinFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}
	$scope.estudiante = data;


	$scope.periodos = [{id:1, descripcion:'Primer Bimestre', abreviacion: '1er. Bimestre'},
			{id:2, descripcion:'Segundo Bimestre', abreviacion: '2do. Bimestre'},
			{id:3, descripcion:'Tercer Bimestre', abreviacion: '3er. Bimestre'},
			{id:4, descripcion:'Cuarto Bimestre', abreviacion: '4to. Bimestre'},]

	BoletinFactory.query($scope.estudiante, function(data){
			$scope.cabezera = data.datos.cabezera;
			$scope.campos = data.datos.campos;
			$scope.areas = data.datos.areas;
			$scope.boletin = data.datos.boletin;
			$scope.nota_final = data.datos.nota_final;
			$scope.valoracion_cualitativa = data.datos.valoracion_cualitativa;
			$scope.promedio_trimestre = data.datos.promedio_trimestre;
			
		});	
	
	$scope.print = function(divName){
	      var printContents = document.getElementById(divName).innerHTML;
	      var originalContents = document.body.innerHTML;
	      console.log(navigator.userAgent.toLowerCase());
	      
	      if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	          var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
	          popupWin.window.focus();
	          popupWin.document.write('<!DOCTYPE html><html><head>' +
	              '<link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" />' +
	              '<link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" />' +
	              '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div>'+
	              '<table style="width:100%; text-align:center;"><tr><td><br/><br/>Firma del Maestro <br> Primer Bimestres</td>'+
	              '<td><br/><br/>Firma del Maestro <br> Segundo Bimestres</td>'+
	              '<td><br/><br/>Firma del Maestro <br> Tercer Bimestres</td>'+
	              '<td><br/><br/>Firma del Maestro <br> Cuarto Bimestres</td>'+
	              '</tr><tr><td><br/><br/>Firma del Director(a) <br> Primer Bimestres</td>'+
	              '<td><br/><br/>Firma del Director(a) <br> Segundo Bimestres</td>'+
	              '<td><br/><br/>Firma del Director(a) <br> Tercer Bimestres</td>'+
	              '<td><br/><br/>Firma del Director(a) <br> Cuarto Bimestres</td>'+
	              '</tr></table>'+
	              '</html>');
	          popupWin.onbeforeunload = function (event) {              
	              popupWin.close();
	              //return '.\n';
	          };
	          popupWin.onabort = function (event) {
	              popupWin.document.close();
	              popupWin.close();
	          }
	      } else {
	          var popupWin = window.open('', '_blank', 'width=800,height=600');
	          popupWin.document.open();
	          popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" /><link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" /></head><body onload="window.print()">' + printContents + 
	              '<table style="width:100%; text-align:center;"><tr><td><br/><br/>Firma del Maestro <br> Primer Bimestres</td>'+
	              '<td><br/><br/>Firma del Maestro <br> Segundo Bimestres</td>'+
	              '<td><br/><br/>Firma del Maestro <br> Tercer Bimestres</td>'+
	              '<td><br/><br/>Firma del Maestro <br> Cuarto Bimestres</td>'+
	              '</tr><tr><td><br/><br/>Firma del Director(a) <br> Primer Bimestres</td>'+
	              '<td><br/><br/>Firma del Director(a) <br> Segundo Bimestres</td>'+
	              '<td><br/><br/>Firma del Director(a) <br> Tercer Bimestres</td>'+
	              '<td><br/><br/>Firma del Director(a) <br> Cuarto Bimestres</td>'+
	              '</tr></table>'+
	              '</html>');
	          popupWin.document.close();
	      }
	      popupWin.document.close();
	};
    	
    
    	$scope.close = function(){    		
    		$modalInstance.close();    	
    	};
	
}]);