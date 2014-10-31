var usuariosController = angular.module('usuariosControllers',[]);

usuariosController.controller('usuariosController', ['$scope','UsuariosFactory','UsuarioFactory','$location', function($scope, UsuariosFactory, UsuarioFactory, $location) {
    $scope.usuarios = null;

    $scope.addUsuario = function(){
       $location.path('/addUsuario');
    };

    $scope.deleteUsuario = function(usuarioId){
       UsuarioFactory.delete({id: usuarioId});
       UsuariosFactory.query(function(data){$scope.usuarios = data.usuarios;});
    };
    
    UsuariosFactory.query(function(data){$scope.usuarios = data.usuarios;});
}]);

usuariosController.controller('usuarioController', ['$scope','UsuariosFactory','$location', function($scope, UsuariosFactory, $location) {

    $scope.newUsuario = function(){
        UsuariosFactory.create($scope.usuario);
        $location.path('/usuarios');
    };
}]);
