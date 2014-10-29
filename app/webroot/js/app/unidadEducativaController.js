var unidadEducativaController = angular.module('unidadEducativaControllers',[]);

unidadEducativaController.controller('unidadesEducativasController', ['$scope','UnidadesEducativasFactory','UnidadEducativaFactory','$location', function($scope, UnidadesEducativasFactory, UnidadEducativaFactory, $location) {
    $scope.unidades_educativas = null;

    $scope.addCurso = function(){
       $location.path('/addUnidadEducativa');
    };

    $scope.deleteCurso = function(unidadEducativaId){
       UnidadEducativaFactory.delete({id: unidadEducativaId});
       UnidadesEducativasFactory.query(function(data){$scope.unidades_educativas = data.unidades_educativas;});
    };
    
    UnidadesEducativasFactory.query(function(data){$scope.unidades_educativas = data.unidades_educativas;});
}]);

unidadEducativaController.controller('unidadEducativaController', ['$scope','UnidadesEducativasFactory','$location', function($scope, UnidadesEducativasFactory, $location) {

        $scope.newUnidadEducativa = function(){
	    UnidadesEducativasFactory.create($scope.unidadEducativa);
            $location.path('/unidadeseducativas');
	};
}]);
