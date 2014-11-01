//var cuadernoApp = angular.module('cuadernoApp', []);

cuadernoApp.service('dataService', function($http) {
delete $http.defaults.headers.common['X-Requested-With'];
this.getData = function(callbackFunc) {
    $http({
        method: 'GET',
        url: 'http://127.0.0.1:54007/index.php/estudiantes/listar.json',
        //params: 'limit=10, sort_by=created:desc',
        //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
     }).success(function(data){
        // With the data succesfully returned, call our callback
        callbackFunc(data);
    }).error(function(){
        alert("error");
    });
 }
});

cuadernoApp.controller('estudiantesController', function($scope, dataService) {
    $scope.estudiantes = null;
    dataService.getData(function(dataResponse) {
        $scope.estudiantes = dataResponse.estudiantes;
    });
});
