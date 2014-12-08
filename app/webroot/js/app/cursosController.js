var cursosController = angular.module('cursosControllers',[]);

cursosController.controller('cursosController', ['$scope','CursosFactory','CursoFactory','$location', function($scope, CursosFactory, CursoFactory, $location) {
    $scope.cursos = null;

    $scope.addCurso = function(){
       $location.path('/addCurso');
    };

    $scope.deleteCurso = function(cursoId){
       CursoFactory.delete({id: cursoId});
       CursosFactory.query(function(data){$scope.cursos = data.cursos;});
    };    
    CursosFactory.query(function(data){$scope.cursos = data.cursos;});
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
    CursosDocenteAsignaturaFactory.query({curso_id: $routeParams.id, docente_id: sesionesControl.get('user_id')},function(data){$scope.asignados = data.asignados;});
    $scope.mtdAsistencia = function(asignado_id, curso_id){
        $location.path('/registroAsistencia/'+asignado_id+'/'+curso_id);
    }

    //evaluacion
    $scope.mtdEvaluacion = function(asignado_id, curso_id){
        $location.path('/registroEvaluacion/'+asignado_id+'/'+curso_id);
    }
}]);


cursosController.controller('cursoController', ['$scope','GestionesFactory','UnidadesEducativasFactory','NivelesFactory','GradosFactory','ParalelosFactory','TurnosFactory','CursosFactory','$location', function($scope, GestionesFactory, UnidadesEducativasFactory, NivelesFactory, GradosFactory, ParalelosFactory, TurnosFactory, CursosFactory, $location) {
    $scope.niveles = null;
    $scope.grados = null;						     
    $scope.nivel = {name:'', id:0};
    
    $scope.selectNivel = function(id){
	GradosFactory.query({nivel_id: id}, function(data){ $scope.grados = data.grados });
    };
    
    $scope.newCurso = function(){
        CursosFactory.create($scope.curso);
        $location.path('/cursos');
    };
 
    GestionesFactory.query(function(data){$scope.gestiones = data.gestiones;});
    UnidadesEducativasFactory.query(function(data){$scope.unidadesEducativas = data.unidades_educativas;});
    NivelesFactory.query(function(data){$scope.niveles = data.niveles;});
    ParalelosFactory.query(function(data){$scope.paralelos = data.paralelos;});
    TurnosFactory.query(function(data){$scope.turnos = data.turnos;});
    
}]);
