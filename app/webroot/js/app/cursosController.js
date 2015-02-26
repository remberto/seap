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
                                          CursosListFactory.query({query_id: 111, habilitado: true, user_id: sesionesControl.get('user_id')}, function(data){usSpinnerService.stop('spinner-1');$scope.cursos = data.datos;});
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
    };

    $scope.asignarDocentes = function(idCurso){
      $location.path('/assignCurso/'+idCurso);
    }



    CursosListFactory.query({query_id: 111, habilitado: true, user_id: sesionesControl.get('user_id')}, function(data){usSpinnerService.stop('spinner-1'); $scope.cursos = data.datos;});
}]);


// Controlador Principal de Cursos 
cursosController.controller('cursosDocenteController', ['$scope','CursosDocenteFactory','sesionesControl','$location', function($scope, CursosDocenteFactory, sesionesControl, $location) {
    $scope.cursos = null;

    CursosDocenteFactory.query({query_id: 131, docente_id: sesionesControl.get('user_id'), gestion_id: sesionesControl.get('gestion')},function(data){
      $scope.cursos = data.datos;
    });

    // Planificacion
    // Lista de Planificacion
    $scope.mtdPlanificacion = function(Curso){
	     $location.path('/listPlanificacion/'+Curso.id+'/'+Curso.nivel_id);
    }

    // Asistencia
    // Lista las Asignaturas del Curso
    $scope.mtdAsistencia = function(id){
        $location.path('/asistenciaAsignatura/'+id);
    }

    // Filiacion
    // Lista los Estudiantes inscritos en el Curso
    $scope.inscribir = function(idCurso){
      $location.path('/inscribir/'+idCurso);
    }

    $scope.lista = function(idCurso){
      $location.path('/listInscripciones/'+idCurso);
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

    CursosDocenteAsignaturaFactory.query({query_id: 132, docente_id: sesionesControl.get('user_id'), curso_id: $routeParams.id } ,
        function(data){
          console.log(data.datos);
          $scope.asignados = data.datos;
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
    $scope.curso = {Gestion: 2015, UnidadEducativa: '', Paralelo: null, Turno: null, cupo: 20}; 

    GestionesFactory.query({habilitado: true}, function(data){ usSpinnerService.stop('spinner-1'); $scope.gestiones = data.datos;});
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


cursosController.controller('assignCursoController', ['$scope', '$routeParams', 'AsignarFactory', 'ActionAsignarFactory', 'DocentesFactory', 'CursosFactory', 'CursoViewFactory', 'AsignaturasCursoFactory', '$location','sesionesControl', 'usSpinnerService', function($scope, $routeParams, AsignarFactory, ActionAsignarFactory, DocentesFactory, CursosFactory, CursoViewFactory, AsignaturasCursoFactory, $location, sesionesControl, usSpinnerService) {
    usSpinnerService.spin('spinner-1');
    $scope.asignar = {curso: null};
    $scope.inscripcion = {'curso_id': $routeParams.idCurso};
    $scope.asignados = null;
    // Visualiza el curso
    CursoViewFactory.query({query_id: 126, curso_id: $routeParams.idCurso}, function(data){
      usSpinnerService.stop('spinner-1'); 
      $scope.asignar.curso = data.datos[0];
    });

    // Selecciona las Asignaturas
    AsignaturasCursoFactory.query({query_id: 129, curso_id: $routeParams.idCurso}, function(data){
      usSpinnerService.stop('spinner-1');      
      $scope.asignatura = data.datos;
    });   
    
    DocentesFactory.query({query_id: 123, user_id: sesionesControl.get('user_id')}, function(data){
      usSpinnerService.stop('spinner-1');       
      $scope.docentes = data.datos;
    });    


    $scope.mtdAsignar = function(){
      AsignarFactory.create($scope.asignar, function(data){
        console.log(data);
        usSpinnerService.stop('spinner-1');
        if(data.message.guardado){
          $scope.mtdListarAsignados();                                
        }else{            
            $.fn.jAlert({
                  'title':'Error!',
                  'message': data.message.mensaje,
                  'theme': 'error'
                });
        }        
      });  
    };

    $scope.mtdEliminar = function(idAsignado){
      ActionAsignarFactory.delete({id: idAsignado}, function(data){
        $scope.mtdListarAsignados();
      }); 
    }
    
    $scope.mtdList = function(){        
        $location.path('/cursos'); 
        $scope.$apply();
    };    

    // Listado de Asignados: Asignaturas y Docentes
    $scope.mtdListarAsignados = function(){      
      usSpinnerService.spin('spinner-1');
      AsignaturasCursoFactory.query({query_id: 130, curso_id: $routeParams.idCurso}, function(data){
        usSpinnerService.stop('spinner-1');        
        $scope.asignados = data.datos;        
      });
    };

    // Asignados
    $scope.mtdListarAsignados();

}]);
