var evaluacionController = angular.module('evaluacionControllers',[]);

evaluacionController.controller('evaluacionController', ['$scope','$routeParams', 'sesionesControl','InscripcionListFactory', 'PeriodoFactory', 'DimensionFactory', 'ActividadEvaluacionFactory', 'ObjetivoHolisticoFactory', 'ClasificadorFactory', 'InscritosEvaluacionFactory', 'EvaluacionFactory', 'PromedioDimensionFactory', 'PromedioActividadFactory', 'dialogs', 'CriteriosAccionFactory','CursosDocenteFactory', 'CursosDocenteAsignaturaFactory', 'usSpinnerService', '$location', function($scope, $routeParams, sesionesControl, InscripcionListFactory, PeriodoFactory, DimensionFactory, ActividadEvaluacionFactory, ObjetivoHolisticoFactory, ClasificadorFactory, InscritosEvaluacionFactory, EvaluacionFactory, PromedioDimensionFactory, PromedioActividadFactory, dialogs, CriteriosAccionFactory, CursosDocenteFactory, CursosDocenteAsignaturaFactory, usSpinnerService, $location) {
	//$scope.evaluacion = {criterios: null}
	$scope.idCurso = $routeParams.curso_id;
    	$scope.idAsignado = $routeParams.asignado_id;
    	$scope.periodo = null;
    	$scope.actividad = null;
    	$scope.habilitado = false;

    	$scope.dimensiones = [{id:1, dimension:'Ser'},
			      {id:2, dimension:'Saber'},
			      {id:3, dimension:'Hacer'},
			      {id:4, dimension:'Decidir'},
    			     ];

    	$scope.evaluacion = {periodo: 1, curso: 0, actividad: 0};
	$scope.criterio = {periodo: 0};

	// Lista de Cursos
	CursosDocenteFactory.query({query_id: 131, docente_id: sesionesControl.get('user_id'), gestion_id: sesionesControl.get('gestion')},function(data){
	      $scope.cursos = data.datos;            
	});

	

	$scope.menuCriterios = [
        	['Editar', function ($itemScope) {
        		console.log($itemScope);
        	}],        
        	['Eliminar', function ($itemScope) {
        		console.log($itemScope)                
        	}]
    	];
	

    	// Cuando se seleciona el Curso se modifica las asignaturas
	$scope.mtdSelectCurso = function(curso){
	      $scope.habilitado = false;	      
	      CursosDocenteAsignaturaFactory.query({query_id: 132, docente_id: sesionesControl.get('user_id'), curso_id: curso.id } ,
	        function(data){
	          	$scope.asignados = data.datos;
			          
	      });
    	}

    	// Cuando se selecciona la Asignatura se modifica los periodos
    	$scope.mtdSelectAsignatura = function(Asignado, Curso){	      		      	
		PeriodoFactory.query({}, function(data){
			$scope.periodos = data.periodos;
			$scope.periodo = $scope.periodos[0];			
			$scope.habilitado = true;
			// Aqui se refresca la vista
			$scope.mtdSelectPeriodo($scope.periodo, Asignado, Curso);
		});	    
    	}

    	$scope.mtdSelectPeriodo = function(Periodo, Asignado, Curso){    		
		$scope.actividad = {asignado_id:0, periodo_id: 0};
		$scope.objetivo = {asignado_id:0, periodo_id: 0};
		$scope.actividad.asignado_id = Asignado.id;
		$scope.actividad.periodo_id = Periodo.id;
		$scope.objetivo.asignado_id = Asignado.id;
		$scope.objetivo.periodo_id = Periodo.id;

		ActividadEvaluacionFactory.query($scope.actividad, function(data){ 		
			$scope.actividades = data.actividades;						
		});
		// Objetivo Holistico
		ObjetivoHolisticoFactory.query($scope.objetivo, function(data){ 		
			$scope.objetivo = data.objetivo_holistico[0];						
		});		
	 	/*$scope.periodo = Periodo;		
		$scope.evaluacion.curso = Curso.id;		
		$scope.evaluacion.periodo= $scope.periodo.id;
		$scope.evaluacion.asignado_id = Asignado.id;

		EvaluacionFactory.query($scope.evaluacion, function(data){			
			$scope.estudiantes = data.datos.inscritos;
			$scope.criterios = data.datos.criterios;f
			$scope.dimensiones = data.datos.dimensiones;
			$scope.evaluaciones = data.datos.evaluaciones;
		});*/
	}


	$scope.mtdSelectActividad = function(Actividad, Asignado, Curso, Periodo){
		if ($scope.habilitado) {		
		 	$scope.actividad = Actividad;		
			$scope.evaluacion.curso = Curso.id;
			$scope.evaluacion.periodo = Periodo.id;
			$scope.evaluacion.actividad = $scope.actividad.id;
			$scope.evaluacion.asignado_id = Asignado.id;

			EvaluacionFactory.query($scope.evaluacion, function(data){			
				$scope.estudiantes = data.datos.inscritos;
				$scope.criterios = data.datos.criterios;
				$scope.dimensiones = data.datos.dimensiones;
				$scope.evaluaciones = data.datos.evaluaciones;
				$scope.promedios = data.datos.promedios;
				$scope.notas = data.datos.notas;								
			});
		};		
	}

	$scope.mtdPromedioDimensiones = function(Curso, Asignado, Periodo){		
		if($scope.habilitado){
			$scope.promedio = {curso:0, periodo:0, asignado:0}
			$scope.promedio.curso = Curso.id;
			$scope.promedio.periodo = Periodo.id;
			$scope.promedio.asignado = Asignado.id;
			PromedioDimensionFactory.query($scope.promedio, function(data){
				$scope.estudiantes = data.datos.inscritos;
				$scope.promedios = data.datos.promedios;
				$scope.notas = data.datos.notas;				
			})	
		}
	}

	$scope.mtdPromedioActividades = function(Curso, Asignado, Periodo){		
		if($scope.habilitado){
			$scope.promedio = {curso:0, periodo:0, asignado:0}
			$scope.promedio.curso = Curso.id;
			$scope.promedio.periodo = Periodo.id;
			$scope.promedio.asignado = Asignado.id;
			PromedioActividadFactory.query($scope.promedio, function(data){
				$scope._actividades = data.datos.actividades;
				$scope.estudiantes = data.datos.inscritos;
				$scope.promedios = data.datos.promedios;
				$scope.notas = data.datos.notas;				
			})	
		}
	}


	$scope.mtdAddObjetivo = function(Periodo, Asignado){
		console.log('aqui');
		if($scope.habilitado == true){
			$scope._objetivo = {asignado_id:0, periodo_id: 0};
			$scope._objetivo.asignado_id = Asignado.id;
			$scope._objetivo.periodo_id = Periodo.id;
			var dlg = dialogs.create('/pages/dialogs/objetivo.html','objetivoController', $scope._objetivo, {size:'lg'});
            		dlg.result.then(function(data){            		
				ObjetivoHolisticoFactory.query($scope._objetivo, function(data){ 		
					$scope.objetivo = data.objetivo_holistico;						
				});
       			});
            	}
	}
	

	$scope.mtdAddActividad =function(Periodo, Asignado){
		if($scope.habilitado == true){
			$scope.actividad = {asignado_id:0, periodo_id: 0};
			$scope.actividad.asignado_id = Asignado.id;
			$scope.actividad.periodo_id = Periodo.id;
			var dlg = dialogs.create('/pages/dialogs/actividad.html','actividadController', $scope.actividad, {size:'sm'});
            		dlg.result.then(function(data){            		
				ActividadEvaluacionFactory.query($scope.actividad, function(data){ 		
					$scope.actividades = data.actividades;
				});
       			});
            	}
	}

	$scope.mtdAddCriterio = function(idPeriodo, idActividad, Asignado){		
		$scope.criterio.periodo_id = idPeriodo;
		$scope.criterio.actividad_evaluacion_id = idActividad;	
		$scope.criterio.asignado_id = Asignado.id;				
		var dlg = dialogs.create('/pages/dialogs/criterio.html','criterioController', $scope.criterio, {size:'sm'});
            	dlg.result.then(function(data){            		
			EvaluacionFactory.query($scope.evaluacion, function(data){			
				$scope.estudiantes = data.datos.inscritos;
				$scope.criterios = data.datos.criterios;
				$scope.dimensiones = data.datos.dimensiones;
				$scope.evaluaciones = data.datos.evaluaciones;
			});                                                       		            
       		});
	}

	$scope.mtdDelCriterio = function(Criterio){		
		var idCriterio = Criterio.idcriterio;		
		$.fn.jAlert({
	          'title':'Eliminar',
	          'message': '¿Desea dar de Baja el Criterio ' + Criterio.criterio + '?',          
	          'closeBtn': false,
	          'theme': 'info',
	          'btn': [{'label':'Eliminar', 
	                   'closeOnClick': false, 
	                   'cssClass': 'blue',
	                   'onClick': function(alert){
	                        usSpinnerService.spin('spinner-1');                     
	                        CriteriosAccionFactory.delete({id: idCriterio}, function(data){
	                            usSpinnerService.stop('spinner-1');
	                            if(data.message.eliminado){
	                                $.fn.jAlert({
	                                      'title':'¡Satisfactorio!',
	                                      'message': data.message.mensaje,
	                                      'theme': 'success',
	                                      'closeBtn': false,
	                                      'btn': [{'label':'Cerrar', 
	                                               'closeOnClick': true, 
	                                               'cssClass': 'green',                                
	                                             }],
	                                      'size': 'small',                      
	                                      'onClose': function(){
	                                          	usSpinnerService.spin('spinner-1');
	                                          	EvaluacionFactory.query($scope.evaluacion, function(data){			
	                                          		usSpinnerService.stop('spinner-1');
								$scope.estudiantes = data.datos.inscritos;
								$scope.criterios = data.datos.criterios;
								$scope.dimensiones = data.datos.dimensiones;
								$scope.evaluaciones = data.datos.evaluaciones;
							});
	                                      }
	                                    });

	                            }else{
	                                $.fn.jAlert({
	                                      'title':'Error!',
	                                      'message': data.message.mensaje,
	                                      'theme': 'error'
	                                    });
	                            }    
	                        });
	                        alert.closeAlert(true);
	                   }
	                 },
	                 {'label':'Cancelar', 
	                   'closeOnClick': true,                    
	                 }],
	          'size': 'small',          
	        })  
	}

	$scope.mtdEvaluar = function(Evaluaciones, Estudiante, Criterio, asignado_id){		
		if(Criterio.idcriterio !== Criterio.iddimension){		    
		    if(Evaluaciones.id == 0){
			var dlg = dialogs.create('/pages/dialogs/evaluacion.html','evaluarController', {estudiante: Estudiante, criterio: Criterio, asignado_id: asignado_id}, {size:'md'});
	            	dlg.result.then(function(data){            		
				EvaluacionFactory.query($scope.evaluacion, function(data){			
					$scope.estudiantes = data.datos.inscritos;
					$scope.criterios = data.datos.criterios;
					$scope.dimensiones = data.datos.dimensiones;
					$scope.evaluaciones = data.datos.evaluaciones;
					$scope.promedios = data.datos.promedios;
					$scope.notas = data.datos.notas;
				});                                                       		            
	       		});
	            }else {
	            	// Mostrar dialogo de Reforzamiento si la calificacion es menor que 51
	            	if(Evaluaciones.nota_cuantitativo < 51){
	            		var dlg = dialogs.create('/pages/dialogs/reforzamiento.html','reforzamientoController', {estudiante: Estudiante, criterio: Criterio, asignado_id: asignado_id, evaluaciones: Evaluaciones}, {size:'md'});
	            		dlg.result.then(function(data){            		
				EvaluacionFactory.query($scope.evaluacion, function(data){			
					$scope.estudiantes = data.datos.inscritos;
					$scope.criterios = data.datos.criterios;
					$scope.dimensiones = data.datos.dimensiones;
					$scope.evaluaciones = data.datos.evaluaciones;
					$scope.promedios = data.datos.promedios;
					$scope.notas = data.datos.notas;
					});                                                       		            
	       			});
	            	}else if(Evaluaciones.nota_cuantitativo >= 51){
	            		var dlg = dialogs.create('/pages/dialogs/verevaluaciones.html','verevaluacionesController', {estudiante: Estudiante, criterio: Criterio, asignado_id: asignado_id, evaluaciones: Evaluaciones}, {size:'md'});
	            		dlg.result.then(function(data){ });
	            	}
	            }
	       	}
	}
}]);


evaluacionController.controller('objetivoController', ['$scope','$routeParams','$modalInstance', 'ObjetivoHolisticoFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, ObjetivoHolisticoFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}
	$scope.objetivo = data;

	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    	}; // end cancel
    
    	$scope.save = function(){    		
    		ObjetivoHolisticoFactory.create($scope.objetivo, function(data){
    			$modalInstance.close();
    		});        	
    	};
	
}]);


evaluacionController.controller('actividadController', ['$scope','$routeParams','$modalInstance', 'ClasificadorFactory','ActividadEvaluacionFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, ClasificadorFactory, ActividadEvaluacionFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}
	$scope.actividad = data;	
	ClasificadorFactory.query({query_id:136}, function(data){ $scope.actividades = data.datos; });

	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    	}; // end cancel
    
    	$scope.save = function(){
    		$scope.actividad.actividad_evaluacion_id = $scope.actividad.actividad_evaluacion.id;    		
    		ActividadEvaluacionFactory.create($scope.actividad, function(data){
    			$modalInstance.close();
    		});
    	};
	
}]);

evaluacionController.controller('criterioController', ['$scope','$routeParams','$modalInstance', 'ClasificadorFactory','CriteriosFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, ClasificadorFactory, CriteriosFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}
	$scope.criterio = data;	
	ClasificadorFactory.query({query_id:107}, function(data){ $scope.dimensiones = data.datos; });

	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    	}; // end cancel
    
    	$scope.save = function(){    		
    		CriteriosFactory.create($scope.criterio, function(data){
    			$modalInstance.close();
    		});        	
    	};
	
}]);

evaluacionController.controller('evaluarController', ['$scope','$routeParams','$modalInstance', 'ClasificadorFactory','EvaluacionFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, ClasificadorFactory, EvaluacionFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}			
	$scope.estudiante = data.estudiante;
	$scope.criterio = data.criterio;
	$scope.asignado_id = data.asignado_id;

	$scope.evaluacion = {inscripcion_id:0, asignado_id:0, criterio_id:0, cualitativo:0}

	$scope.mtdChange = function(){
		if($scope.evaluacion.cuantitativo < 51){
			$scope.evaluacion.cualitativo = 1;
			$scope._cualitativo = 'En Desarrollo';
		}else if($scope.evaluacion.cuantitativo >= 51 && $scope.evaluacion.cuantitativo <= 68){
			$scope.evaluacion.cualitativo = 2;
			$scope._cualitativo = 'Desarrollo Aceptable';
		}else if($scope.evaluacion.cuantitativo > 68 && $scope.evaluacion.cuantitativo <= 84){
			$scope.evaluacion.cualitativo = 3;
			$scope._cualitativo = 'Desarrollo Optimo';
		}else if($scope.evaluacion.cuantitativo > 84 && $scope.evaluacion.cuantitativo <= 100){
			$scope.evaluacion.cualitativo = 4;
			$scope._cualitativo = 'Desarrollo Pleno';		
		}
		$scope.evaluacion.convertida = ($scope.evaluacion.cuantitativo * $scope.criterio.valor) / 100;
	}

	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    	}; // end cancel
    
    	$scope.save = function(){
    		$scope.evaluacion.inscrito_id = $scope.estudiante.id;
    		$scope.evaluacion.asignado_id = $scope.asignado_id;
    		$scope.evaluacion.criterio_id = $scope.criterio.idcriterio;
    		EvaluacionFactory.create($scope.evaluacion, function(data){
    			$modalInstance.close();
    		});        	
    	};
	
}]);

evaluacionController.controller('reforzamientoController', ['$scope','$routeParams','$modalInstance', 'ClasificadorFactory','EvaluacionesFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, ClasificadorFactory, EvaluacionesFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}				
	$scope.estudiante = data.estudiante;
	$scope.criterio = data.criterio;
	$scope.asignado_id = data.asignado_id;
	$scope.evaluaciones = data.evaluaciones;

	$scope.evaluacion = {reforzamiento_cuantitativo:0, reforzamiento_cualitativo:0, reforzamiento_convertida:0, reforzamiento_observaciones: ''}

	$scope.mtdChange = function(){
		if($scope.evaluacion.reforzamiento_cuantitativo < 51){
			$scope.evaluacion.reforzamiento_cualitativo = 1;
			$scope._cualitativo = 'En Desarrollo';
		}else if($scope.evaluacion.reforzamiento_cuantitativo >= 51 && $scope.evaluacion.reforzamiento_cuantitativo <= 68){
			$scope.evaluacion.reforzamiento_cualitativo = 2;
			$scope._cualitativo = 'Desarrollo Aceptable';
		}else if($scope.evaluacion.reforzamiento_cuantitativo > 68 && $scope.evaluacion.reforzamiento_cuantitativo <= 84){
			$scope.evaluacion.reforzamiento_cualitativo = 3;
			$scope._cualitativo = 'Desarrollo Optimo';
		}else if($scope.evaluacion.reforzamiento_cuantitativo > 84 && $scope.evaluacion.reforzamiento_cuantitativo <= 100){
			$scope.evaluacion.reforzamiento_cualitativo = 4;
			$scope._cualitativo = 'Desarrollo Pleno';		
		}
		$scope.evaluacion.reforzamiento_convertida = ($scope.evaluacion.reforzamiento_cuantitativo * $scope.criterio.valor) / 100;
	}

	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    	}; // end cancel
    
    	$scope.save = function(){
    		$scope.evaluacion.id = $scope.evaluaciones.id;
    		$scope.evaluacion.cuantitativo = $scope.evaluaciones.cuantitativo;
    		$scope.evaluacion.valor = $scope.evaluaciones.valor;    		
    		EvaluacionesFactory.reforzamiento({id: $scope.evaluacion.id, evaluaciones: $scope.evaluacion }, function(data){
    			$modalInstance.close();
    		});        	
    	};
	
}]);

evaluacionController.controller('verevaluacionesController', ['$scope','$routeParams','$modalInstance', '$location', 'data',  function($scope, $routeParams, $modalInstance, $location, data) {
	//$scope.evaluacion = {criterios: null}				
	$scope.estudiante = data.estudiante;
	$scope.criterio = data.criterio;
	$scope.asignado_id = data.asignado_id;
	$scope.evaluaciones = data.evaluaciones;

	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    	}; // end cancel
    
    	$scope.save = function(){
		$modalInstance.close();
    	};
	
}]);