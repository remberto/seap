var cursosController = angular.module('cursosControllers',[]);

cursosController.controller('cursosController', ['$scope','CursosListFactory','CursoFactory','$location', 'sesionesControl', 'usSpinnerService', function($scope, CursosListFactory, CursoFactory, $location, sesionesControl, usSpinnerService) {
    usSpinnerService.spin('spinner-1');
    $scope.cursos = null;

    $scope.addCurso = function(){
       $location.path('/addCurso');
    };

    $scope.deleteCurso = function(cursoId){
        $.fn.jAlert({
          'title':'Eliminar',
          'message': '¿Desea dar de Baja el Curso de la UnidadEducativa?',          
          'closeBtn': false,
          'theme': 'info',
          'btn': [{'label':'Eliminar', 
                   'closeOnClick': false, 
                   'cssClass': 'blue',
                   'onClick': function(alert){
                        usSpinnerService.spin('spinner-1');                     
                        CursoFactory.delete({id: cursoId}, function(data){
                            usSpinnerService.stop('spinner-1');
                            if(data.message.eliminado){
                                $.fn.jAlert({
                                      'title':'¡Satisfactorio!',
                                      'message': 'Se dio de baja correctamente',
                                      'theme': 'success',
                                      'closeBtn': false,
                                      'btn': [{'label':'Cerrar', 
                                               'closeOnClick': true, 
                                               'cssClass': 'green',                                
                                             }],
                                      'size': 'small',                      
                                      'onClose': function(){
                                          usSpinnerService.spin('spinner-1');
                                          CursosListFactory.query({habilitado: 1, user_id: sesionesControl.get('user_id')}, function(data){usSpinnerService.stop('spinner-1');$scope.cursos = data.datos;});
                                      }
                                    });

                            }else{
                                $.fn.jAlert({
                                      'title':'Error!',
                                      'message': 'No Puede ser eliminado el Personal Administrativo',
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
    };



    CursosListFactory.query({habilitado: 1, user_id: sesionesControl.get('user_id')}, function(data){usSpinnerService.stop('spinner-1'); $scope.cursos = data.datos;});
}]);


// Controlador Principal de Cursos 
cursosController.controller('cursosDocenteController', ['$scope','CursosDocenteFactory','sesionesControl','$location', function($scope, CursosDocenteFactory, sesionesControl, $location) {
    $scope.cursos = null;

    CursosDocenteFactory.query({docente_id: sesionesControl.get('user_id'), gestion_id: '2014'},function(data){$scope.cursos = data.cursos;});

    // Planificacion
    // Lista de Planificacion
    $scope.mtdPlanificacion = function(id){
	$location.path('/listPlanificacion/'+id);
    }

    // Asistencia
    // Lista las Asignaturas del Curso
    $scope.mtdAsistencia = function(id){
        $location.path('/asistenciaAsignatura/'+id);
    }

    // Filiacion
    // Lista los Estudiantes inscritos en el Curso
    $scope.mtdFiliacion = function(id){        
        $location.path('/filiacionEstudiantes/'+id);
    }

    // Evaluacion
    // Lista los Estudiantes inscritos en el Curso
    $scope.mtdEvaluacion = function(id){        
        $location.path('/evaluacionAsignatura/'+id);
    }

    // Reportes

}]);


cursosController.controller('cursosDocenteAsignaturaController', ['$scope','$routeParams','CursosDocenteAsignaturaFactory','sesionesControl','$location', function($scope, $routeParams, CursosDocenteAsignaturaFactory, sesionesControl, $location) {
    $scope.cursos = null;

    CursosDocenteAsignaturaFactory.query({curso_id: $routeParams.id, docente_id: sesionesControl.get('user_id')},
        function(data){$scope.asignados = data.asignados;
    });
    
    // metodos
    $scope.mtdPlanificacionClases = function(asignado_id, curso_id){
        $location.path('/planificacionClasesAsignatura/'+asignado_id+'/'+curso_id);
    }

    $scope.mtdAsistencia = function(asignado_id, curso_id){
        $location.path('/registroAsistencia/'+asignado_id+'/'+curso_id);
    }

    //evaluacion
    $scope.mtdEvaluacion = function(asignado_id, curso_id){
        $location.path('/registroEvaluacion/'+asignado_id+'/'+curso_id);
    }
}]);


cursosController.controller('cursoController', ['$scope','GestionesFactory','UnidadesEducativasUsuarioFactory','NivelesUnidadEducativaFactory','GradosNivelFactory','ParalelosFactory','TurnosFactory','CursosFactory','$location','sesionesControl', 'usSpinnerService', function($scope, GestionesFactory, UnidadesEducativasUsuarioFactory, NivelesUnidadEducativaFactory, GradosNivelFactory, ParalelosFactory, TurnosFactory, CursosFactory, $location, sesionesControl, usSpinnerService) {
    usSpinnerService.spin('spinner-1');
    $scope.niveles = null;
    $scope.grados = null;						         
    $scope.curso = {Gestion: 2015, UnidadEducativa: '', Paralelo: null, Turno: null}; 

    GestionesFactory.query({habilitado: 1}, function(data){ usSpinnerService.stop('spinner-1'); $scope.gestiones = data.datos;});
    UnidadesEducativasUsuarioFactory.query({query_id: 113, user_id: sesionesControl.get('user_id')}, function(data){
        $scope.curso.UnidadEducativa = data.datos[0];        
        NivelesUnidadEducativaFactory.query({unidad_educativa_id: $scope.curso.UnidadEducativa.id},function(data){usSpinnerService.stop('spinner-1'); $scope.niveles = data.datos;});
    });
    ParalelosFactory.query(function(data){usSpinnerService.stop('spinner-1'); $scope.paralelos = data.datos;});
    TurnosFactory.query(function(data){usSpinnerService.stop('spinner-1'); $scope.turnos = data.datos;});

    $scope.selectNivel = function(id){        
        if(typeof id === 'undefined'){
            $scope.grados = null;
            $scope.curso.Grado = null;
        }else{
            usSpinnerService.spin('spinner-1');
            GradosNivelFactory.query({nivel_id: id}, function(data){usSpinnerService.stop('spinner-1'); $scope.grados = data.datos });
        }	   
    };
    
    $scope.newCurso = function(){
        usSpinnerService.spin('spinner-1');        
        CursosFactory.create($scope.curso, function(data){            
            if(data.message.guardado){
                usSpinnerService.stop('spinner-1');
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
                          $scope.mtdList();
                      }
                    });

            }else{
                usSpinnerService.stop('spinner-1');
                $.fn.jAlert({
                      'title':'Error!',
                      'message': data.message.mensaje,
                      'theme': 'error'
                    });
            }            
        });               
    };
    
    $scope.mtdList = function(){        
        $location.path('/cursos'); 
        $scope.$apply();
    }

}]);
