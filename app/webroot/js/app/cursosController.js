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

    $scope.mtdAsistencia = function(id)
    {        
        $location.path('/registroAsistencia/'+id);
    }
    
    CursosFactory.query(function(data){$scope.cursos = data.cursos;});
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
