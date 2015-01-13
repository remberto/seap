var cursosController = angular.module('cursosControllers',[]);

cursosController.controller('cursosController', ['$scope','CursosListFactory','CursoFactory','$location', 'sesionesControl', function($scope, CursosListFactory, CursoFactory, $location, sesionesControl) {
    $scope.cursos = null;

    $scope.addCurso = function(){
       $location.path('/addCurso');
    };

    $scope.deleteCurso = function(cursoId){
       CursoFactory.delete({id: cursoId});
       CursosListFactory.query({habilitado: 1, user_id: sesionesControl.get('user_id')}, function(data){$scope.cursos = data.cursos;});
    };

    CursosListFactory.query({habilitado: 1, user_id: sesionesControl.get('user_id')}, function(data){$scope.cursos = data.datos;});
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


cursosController.controller('cursoController', ['$scope','GestionesFactory','UnidadesEducativasUsuarioFactory','NivelesUnidadEducativaFactory','GradosNivelFactory','ParalelosFactory','TurnosFactory','CursosFactory','$location','sesionesControl', function($scope, GestionesFactory, UnidadesEducativasUsuarioFactory, NivelesUnidadEducativaFactory, GradosNivelFactory, ParalelosFactory, TurnosFactory, CursosFactory, $location, sesionesControl) {
    $scope.niveles = null;
    $scope.grados = null;						     
    $scope.nivel = {name:'', id:0};

    GestionesFactory.query({habilitado: 1}, function(data){$scope.gestiones = data.datos;});
    UnidadesEducativasUsuarioFactory.query({user_id: sesionesControl.get('user_id')}, function(data){$scope.unidadesEducativas = data.datos;});
    ParalelosFactory.query(function(data){$scope.paralelos = data.datos;});
    TurnosFactory.query(function(data){$scope.turnos = data.datos;});

    $scope.selectUnidadEducativa = function(id)
    {
        NivelesUnidadEducativaFactory.query({unidad_educativa_id: id},function(data){$scope.niveles = data.datos;});
    }

    $scope.selectNivel = function(id){
	   GradosNivelFactory.query({nivel_id: id}, function(data){ $scope.grados = data.datos });
    };
    
    $scope.newCurso = function(){
        CursosFactory.create($scope.curso);
        $location.path('/cursos');
    };
    
}]);
