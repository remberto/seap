var loginApp = angular.module('loginApp', ['loginControllers']);

var loginController = angular.module('loginControllers',[]);

loginApp.controller('loginController',['$scope',function($scope){
    $scope.user = null;
    console.log('aqui');   
}]);
