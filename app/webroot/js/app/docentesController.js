
var docentesController = angular.module('docentesControllers',['hhhh']);

docentesController.controller('docentesController', ['$scope','DocentesFactory', '$location', function($scope, DocentesFactory, $location) {
    $scope.cursos = null;

    $scope.addDocente = function(){
       $location.path('/addDocente');
    };

    /*$scope.deleteDocente = function(docenteId){
       DocenteFactory.delete({id: docenteId});
       DocentesFactory.query(function(data){$scope.docentes = data.docentes;});
    };*/
    $scope.newDocente = function(){
    
    try {
        DocentesFactory.create($scope.docente);
        alert($scope.docente);
    	$location.path('/docentes');
        } catch(err)
        {
	    console.log(err);
        	alert(err);
        }
    };

    DocentesFactory.query(function(data){$scope.docentes = data.docentes;});

}]);
