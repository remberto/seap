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

cursosController.controller('cursoController', ['$scope','CursosFactory','$location', function($scope, CursosFactory, $location) {

    $scope.newCurso = function(){
        CursosFactory.create($scope.cursos);
        $location.path('/cursos');
    };
}]);

cursosController.controller('nivelesController', ['$scope',
						  'NivelesFactory',
						  'GradosFactory',
						  '$location', 
						  function($scope, 
							   NivelesFactory, 
							   GradosFactory,
							   $location) {
    $scope.niveles = null;
    $scope.grados = null;						     
    $scope.nivel = {name:'', id:0};
    
    $scope.selectNivel = function(id){
	GradosFactory.query({nivel_id: id}, function(data){ $scope.grados = data.grados });
    };
 
    NivelesFactory.query(function(data){$scope.niveles = data.niveles;});
    
}]);
