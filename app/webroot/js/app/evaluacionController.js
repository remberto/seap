var evaluacionController = angular.module('evaluacionControllers',[]);

evaluacionController.controller('evaluacionController', ['$scope','$routeParams', 'sesionesControl','InscripcionListFactory', 'PeriodoFactory', 'DimensionFactory', 'ActividadEvaluacionFactory', 'ActividadEvaluacionesFactory', 'ObjetivoHolisticoFactory', 'ClasificadorFactory', 'InscritosEvaluacionFactory', 'EvaluacionFactory', 'PromedioDimensionFactory', 'PromedioActividadFactory', 'dialogs', 'CriteriosAccionFactory','CursosDocenteFactory', 'CursosDocenteAsignaturaFactory', 'usSpinnerService', '$location', function($scope, $routeParams, sesionesControl, InscripcionListFactory, PeriodoFactory, DimensionFactory, ActividadEvaluacionFactory, ActividadEvaluacionesFactory, ObjetivoHolisticoFactory, ClasificadorFactory, InscritosEvaluacionFactory, EvaluacionFactory, PromedioDimensionFactory, PromedioActividadFactory, dialogs, CriteriosAccionFactory, CursosDocenteFactory, CursosDocenteAsignaturaFactory, usSpinnerService, $location) {
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

	
	// Menu de Contecto de Criterios de Ebaluacion
	$scope.menuActividades = [        	        
        	['Eliminar', function ($itemScope) {        		
        		$scope.mtdDelActividad($itemScope.actividad, $scope.asignado, $scope.periodo);
        	}]
    	];

	// Menu de Contecto de Criterios de Ebaluacion
	$scope.menuCriterios = [
        	['Editar', function ($itemScope) {
        		$scope.mtdEditCriterio($itemScope.criterio);
        	}],        
        	['Eliminar', function ($itemScope) {
        		$scope.mtdDelCriterio($itemScope.criterio);
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
				$scope.actividad_evaluaciones = data.datos.actividad_evaluacion;				
			})	
		}
	}


	$scope.mtdAddObjetivo = function(Periodo, Asignado, Objetivo){		
		if($scope.habilitado == true){
			$scope._objetivo = {id: 0, asignado_id:0, periodo_id: 0, objetivo:''};			
			$scope._objetivo.asignado_id = Asignado.id;
			$scope._objetivo.periodo_id = Periodo.id;
			if(typeof Objetivo !== 'undefined'){
				$scope._objetivo.id = Objetivo.id;
				$scope._objetivo.objetivo_holistico = Objetivo.objetivo_holistico;
			}
			var dlg = dialogs.create('/pages/dialogs/objetivo.html','objetivoController', $scope._objetivo, {size:'lg'});
            		dlg.result.then(function(data){            		
				ObjetivoHolisticoFactory.query($scope._objetivo, function(data){					
					$scope.objetivo = data.objetivo_holistico[0];						
				});
       			});
            	}
	}
	

	$scope.mtdAddActividad =function(Periodo, Asignado){
		if($scope.habilitado == true){
			$scope.actividad = {asignado_id:0, periodo_id: 0};
			$scope.actividad.asignado_id = Asignado.id;
			$scope.actividad.periodo_id = Periodo.id;
			var dlg = dialogs.create('/pages/dialogs/actividad.html','actividadevaluacionController', $scope.actividad, {size:'md'});
            		dlg.result.then(function(data){
            			if(data.result === 'addActividad'){
            				var dlg = dialogs.create('/pages/dialogs/actividadevaluacion.html','actividadController', {size:'md'});
            				dlg.result.then(function(data){
            					$scope.mtdAddActividad(Periodo, Asignado);
            				});
            			}else{
					ActividadEvaluacionFactory.query($scope.actividad, function(data){ 		
						$scope.actividades = data.actividades;
					});
				}
       			});
            	}
	}

	$scope.mtdDelActividad = function(Actividad, Asignado, Periodo){
		var idActividad = Actividad.id;		
		$.fn.jAlert({
	          'title':'Eliminar Criterio',
	          'message': '¿Desea dar de Baja el Criterio de Evaluación : <b>"' + Actividad.descripcion + '"</b>?',          
	          'closeBtn': false,
	          'theme': 'info',
	          'btn': [{'label':'Eliminar', 
	                   'closeOnClick': false, 
	                   'cssClass': 'blue',
	                   'onClick': function(alert){
	                        usSpinnerService.spin('spinner-1');                     
	                        ActividadEvaluacionesFactory.delete({id: idActividad}, function(data){
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
		                                      	$scope.actividad.asignado_id = Asignado.id;
							$scope.actividad.periodo_id = Periodo.id;
							ActividadEvaluacionFactory.query($scope.actividad, function(data){ 		
								$scope.actividades = data.actividades;						
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
				$scope.promedios = data.datos.promedios;
				$scope.notas = data.datos.notas;
			});                                                       		            
       		});
	}

	$scope.mtdEditCriterio = function(Criterio){		
		var dlg = dialogs.create('/pages/dialogs/criterio.html','criterioController', Criterio, {size:'sm'});
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
	}

	$scope.mtdDelCriterio = function(Criterio){		
		var idCriterio = Criterio.idcriterio;		
		$.fn.jAlert({
	          'title':'Eliminar Criterio',
	          'message': '¿Desea dar de Baja el Criterio de Evaluación : <b>"' + Criterio.criterio + '"</b>?',          
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
								$scope.promedios = data.datos.promedios;
								$scope.notas = data.datos.notas;
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

	$scope.mtdEvaluar = function(Evaluaciones, Estudiante, Criterio, Curso, asignado_id){		
		if(Criterio.idcriterio !== Criterio.iddimension){		    
		    	if(Evaluaciones.id == 0){
				$scope.mtdSaveevaluacion(Evaluaciones, Estudiante, Criterio, Curso, asignado_id);
	            	}else {
	            		// Ver evaluaciones            		            		
            			var dlg = dialogs.create('/pages/dialogs/verevaluaciones.html','verevaluacionesController', {estudiante: Estudiante, criterio: Criterio, asignado_id: asignado_id, evaluaciones: Evaluaciones}, {size:'md'});
            			dlg.result.then(function(data){ 
            				if(data.result === 'editar'){
            					if(data.edit == 1){
            						$scope.mtdSaveevaluacion(Evaluaciones, Estudiante, Criterio, asignado_id);				
            					}else if(data.edit == 2){
            						$scope.mtdSaveReforzamiento(Evaluaciones, Estudiante, Criterio, asignado_id);	
            					}
            				}else if(data.result == 'reforzamiento'){
            					$scope.mtdSaveReforzamiento(Evaluaciones, Estudiante, Criterio, asignado_id);	
            				}	            			
            			});
	            	}	            
	       	}
	}

	$scope.mtdSaveevaluacion = function(Evaluaciones, Estudiante, Criterio, Curso, asignado_id){
		if(Curso.nivel_id == 11){
			var dlg = dialogs.create('/pages/dialogs/evaluacioninicial.html','evaluarinicialController', {estudiante: Estudiante, criterio: Criterio, asignado_id: asignado_id, evaluaciones: Evaluaciones}, {size:'md'});
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
		}else{
			var dlg = dialogs.create('/pages/dialogs/evaluacion.html','evaluarController', {estudiante: Estudiante, criterio: Criterio, asignado_id: asignado_id, evaluaciones: Evaluaciones}, {size:'md'});
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
	       	}
	}

	$scope.mtdSaveReforzamiento = function(Evaluaciones, Estudiante, Criterio, asignado_id){
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
	} 
}]);


evaluacionController.controller('objetivoController', ['$scope','$routeParams','$modalInstance', 'ObjetivoHolisticoFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, ObjetivoHolisticoFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}
	$scope.objetivo = data;	
	if($scope.objetivo.id == 0){
		$scope.title = "Añadir Objetivo Holistico";
	}else{
		$scope.title = "Editar Objetivo Holistico";
	}

	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    	}; // end cancel
    
    	$scope.save = function(){    		
    		ObjetivoHolisticoFactory.create($scope.objetivo, function(data){
    			$modalInstance.close();
    		});        	
    	};
	
}]);


evaluacionController.controller('actividadevaluacionController', ['$scope','$routeParams','$modalInstance', 'ClasificadorFactory','ActividadEvaluacionFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, ClasificadorFactory, ActividadEvaluacionFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}
	$scope.actividad = data;	
	ClasificadorFactory.query({query_id:136}, function(data){ $scope.actividades = data.datos; });

	$scope.mtdAddActividad = function(){
		$modalInstance.close({result: 'addActividad'});
	}
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    }; // end cancel
    
    $scope.save = function(){
    	$scope.actividad.actividad_evaluacion_id = $scope.actividad.actividad_evaluacion.id;    		
    	ActividadEvaluacionFactory.create($scope.actividad, function(data){
    		$modalInstance.close({result: ''});
    	});
    };
	
}]);

evaluacionController.controller('actividadController', ['$scope','$routeParams','$modalInstance', 'ActividadFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, ActividadFactory, $location, data) {
	$scope.cancel = function(){
		$modalInstance.dismiss('Canceled');
    }; // end cancel
    
    $scope.save = function(){    		
    	ActividadFactory.create($scope.actividad, function(data){
    		$modalInstance.close();
    	});
    };
	
}]);

evaluacionController.controller('criterioController', ['$scope','$routeParams','$modalInstance', 'ClasificadorFactory','CriteriosFactory', '$location', 'data',  function($scope, $routeParams, $modalInstance, ClasificadorFactory, CriteriosFactory, $location, data) {
	//$scope.evaluacion = {criterios: null}
	$scope.criterio = data;
	console.log($scope.criterio);
	if(typeof $scope.criterio.idcriterio === 'undefined'){
		$scope.title = "Añadir Criterio de Evaluacion";
		$scope.new = true;
	}else{
		$scope.title = "Editar Criterio de Evaluacion";
		$scope.edit = true;
	}	
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

evaluacionController.controller('evaluarController', ['$scope','$routeParams','$modalInstance', 'ClasificadorFactory','EvaluacionFactory', 'usSpinnerService', '$location', 'data',  function($scope, $routeParams, $modalInstance, ClasificadorFactory, EvaluacionFactory, usSpinnerService, $location, data) {
	//$scope.evaluacion = {criterios: null}			
	$scope.estudiante = data.estudiante;
	$scope.criterio = data.criterio;
	$scope.asignado_id = data.asignado_id;
	$scope.evaluaciones = data.evaluaciones;	

	if($scope.evaluaciones.id == 0){
		$scope.evaluacion = {inscripcion_id:0, asignado_id:0, criterio_id:0, cualitativo:0}
	}else{
		$scope.evaluacion = {id: $scope.evaluaciones.id,
				     inscripcion_id: $scope.estudiante.id, 
			             asignado_id: $scope.asignado_id, 
			             criterio_id: $scope.criterio.id, 
			             cuantitativo: $scope.evaluaciones.cuantitativo,
			             convertida: $scope.evaluaciones.valor,			             			             
			     	     observaciones: $scope.evaluaciones.observaciones,
			     	     reforzamiento_cuantitativo: $scope.evaluaciones.reforzamiento_cuantitativo,
			     	     reforzamiento_cualitativo: $scope.evaluaciones.reforzamiento_cualitativo,
			     	     reforzamiento_convertida: $scope.evaluaciones.reforzamiento_valor,
			     	     reforzamiento_observaciones: $scope.evaluaciones.reforzamiento_observaciones,
			     	};
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
	}

	$scope.mtdChange = function(){
		if($scope.evaluacion.cuantitativo > 0 && $scope.evaluacion.cuantitativo < 51){
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
    		usSpinnerService.spin('spinner-1');                     
    		EvaluacionFactory.create($scope.evaluacion, function(data){
    			usSpinnerService.stop('spinner-1');
    			if(data.message.guardado){
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
		                      'onClose': $modalInstance.close()
		                    });

		        }else{
		                $.fn.jAlert({
		                      'title':'Error!',
		                      'message': data.message.mensaje,
		                      'theme': 'error'
		                    });
		        }
    			
    		});        	
    	};
	
}]);


evaluacionController.controller('evaluarinicialController', ['$scope','$routeParams','$modalInstance', 'ClasificadorFactory','EvaluacionFactory', 'usSpinnerService', '$location', 'data',  function($scope, $routeParams, $modalInstance, ClasificadorFactory, EvaluacionFactory, usSpinnerService, $location, data) {
	//$scope.evaluacion = {criterios: null}			
	$scope.estudiante = data.estudiante;
	$scope.criterio = data.criterio;
	$scope.asignado_id = data.asignado_id;
	$scope.evaluaciones = data.evaluaciones;

	$scope.evaluacion_cualitativa = [{id: 1, evaluacion: 'En Desarrollo'},
					{id: 2, evaluacion: 'Desarrollo Aceptable'},
					{id: 3, evaluacion: 'Desarrollo Optimo'},
					{id: 4, evaluacion: 'Desarrollo Pleno'}];	

	if($scope.evaluaciones.id == 0){
		$scope.evaluacion = {inscripcion_id:0, asignado_id:0, criterio_id:0, cualitativo:0}
	}else{
		$scope.evaluacion = {id: $scope.evaluaciones.id,
				     inscripcion_id: $scope.estudiante.id, 
			             asignado_id: $scope.asignado_id, 
			             criterio_id: $scope.criterio.id, 
			             cuantitativo: $scope.evaluaciones.cuantitativo,
			             convertida: $scope.evaluaciones.valor,			             			             
			     	     observaciones: $scope.evaluaciones.observaciones,
			     	     reforzamiento_cuantitativo: $scope.evaluaciones.reforzamiento_cuantitativo,
			     	     reforzamiento_cualitativo: $scope.evaluaciones.reforzamiento_cualitativo,
			     	     reforzamiento_convertida: $scope.evaluaciones.reforzamiento_valor,
			     	     reforzamiento_observaciones: $scope.evaluaciones.reforzamiento_observaciones,
			     	};
		/*if($scope.evaluacion.cuantitativo < 51){
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
		}*/
	}

	$scope.mtdChange = function(){
		if($scope.evaluacion.cuantitativo > 0 && $scope.evaluacion.cuantitativo < 51){
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
    		$scope.evaluacion.cuantitativo = $scope.cualitativo.id;
    		$scope.evaluacion.cualitativo = $scope.cualitativo.id;
    		$scope.evaluacion.convertida = $scope.cualitativo.id;

    		usSpinnerService.spin('spinner-1');                     
    		EvaluacionFactory.create($scope.evaluacion, function(data){
    			usSpinnerService.stop('spinner-1');
    			if(data.message.guardado){
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
		                      'onClose': $modalInstance.close()
		                    });

		        }else{
		                $.fn.jAlert({
		                      'title':'Error!',
		                      'message': data.message.mensaje,
		                      'theme': 'error'
		                    });
		        }
    			
    		});        	
    	};
	
}]);

evaluacionController.controller('reforzamientoController', ['$scope','$routeParams','$modalInstance', 'ClasificadorFactory','EvaluacionesFactory', 'usSpinnerService', '$location', 'data',  function($scope, $routeParams, $modalInstance, ClasificadorFactory, EvaluacionesFactory, usSpinnerService, $location, data) {
	//$scope.evaluacion = {criterios: null}				
	$scope.estudiante = data.estudiante;
	$scope.criterio = data.criterio;
	$scope.asignado_id = data.asignado_id;
	$scope.evaluaciones = data.evaluaciones;	

	if($scope.evaluaciones.id == 0){
		$scope.evaluacion = {reforzamiento_cuantitativo:0, reforzamiento_cualitativo:0, reforzamiento_convertida:0, reforzamiento_observaciones: ''}
	}else{
		$scope.evaluacion = {id: $scope.evaluaciones.id,
				     inscripcion_id: $scope.estudiante.id, 
			             asignado_id: $scope.asignado_id, 
			             criterio_id: $scope.criterio.id, 
			             cuantitativo: $scope.evaluaciones.cuantitativo,
			             convertida: $scope.evaluaciones.valor,			             			             
			     	     observaciones: $scope.evaluaciones.observaciones,
			     	     reforzamiento_cuantitativo: $scope.evaluaciones.reforzamiento_cuantitativo,
			     	     reforzamiento_cualitativo: $scope.evaluaciones.reforzamiento_cualitativo,
			     	     reforzamiento_convertida: $scope.evaluaciones.reforzamiento_valor,
			     	     reforzamiento_observaciones: $scope.evaluaciones.reforzamiento_observaciones,
			     	};		
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
	}


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
    			usSpinnerService.stop('spinner-1');
    			if(data.message.guardado){
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
		                      'onClose': $modalInstance.close()
		                    });

		        }else{
		                $.fn.jAlert({
		                      'title':'Error!',
		                      'message': data.message.mensaje,
		                      'theme': 'error'
		                    });
		        }    			
    		});        	
    	};
	
}]);

evaluacionController.controller('verevaluacionesController', ['$scope','$routeParams','$modalInstance', '$location', 'data',  function($scope, $routeParams, $modalInstance, $location, data) {
	//$scope.evaluacion = {criterios: null}				
	$scope.estudiante = data.estudiante;
	$scope.criterio = data.criterio;
	$scope.asignado_id = data.asignado_id;
	$scope.evaluaciones = data.evaluaciones;	

	$scope.edit = function(idEdit){
		// Editar
		// 1. Evaluaciones
		// 2. Reforzamiento		
		$modalInstance.close({result: 'editar', edit: idEdit, data: data});
    	}; // end cancel

    	$scope.refozarmiento = function(){		
		$modalInstance.close({result: 'reforzamiento'});
    	};
    
    	$scope.save = function(){
		$modalInstance.close({result: ''});
    	};
	
}]);