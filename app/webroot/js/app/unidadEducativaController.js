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


unidadEducativaController.controller('unidadEducativaViewController', ['$scope','UnidadesEducativasUsuarioFactory','$location', 'sesionesControl', function($scope, UnidadesEducativasUsuarioFactory, $location, sesionesControl) {
    $scope.unidadEducativa = null;
    UnidadesEducativasUsuarioFactory.query({query_id: 118, user_id: sesionesControl.get('user_id')}, function(data){$scope.unidadEducativa = data.datos[0];});    
}]);