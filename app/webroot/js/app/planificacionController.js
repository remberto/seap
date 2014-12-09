var planificacionController = angular.module('planificacionControllers',[]);

planificacionController.controller('planificacionController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionFactory', 'AsistenciaFactory', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionFactory, AsistenciaFactory, $location) {
    $scope.planificaciones = [{id: 1, item: 'Planificacion Anual de Desarrollo Curricular'},
                              {id: 2, item: 'Planificacion Bimestral'},
                              {id: 3, item: 'Planificacion de Desarrollo de Clases'}];

    $scope.curso_id = $routeParams.id;

    $scope.mtdPlanificacion = function(id, curso_id){
        if(id == 1){
            $location.path('planificacionAnual/'+curso_id);
        }else if(id == 2){
            $location.path('planificacionBimestral/'+curso_id);
        }else if(id == 3){
            $location.path('planificacionClases/'+curso_id);
        }
    }
}]);

// Planificacion Anual

planificacionController.controller('planificacionAnualController', ['$scope','$routeParams','sesionesControl','ClasificadorFactory', 'EncabezadoFactory', 'ClasificadorAreasFactory', '$location', function($scope, $routeParams, sesionesControl, ClasificadorFactory, EncabezadoFactory, ClasificadorAreasFactory, $location) {

    $scope.curso_id = $routeParams.curso_id;
    // Encabezado
    EncabezadoFactory.query({query_id:5, curso_id: $scope.curso_id}, function(data){ $scope.encabezado = data.datos[0] });
    // Campos
    ClasificadorFactory.query({query_id:1}, function(data){ $scope.campos = data.datos; });
    // Areas
    ClasificadorFactory.query({query_id:0}, function(data){ $scope.areas = data.datos; });
    // Periodos
    ClasificadorFactory.query({query_id:2}, function(data){ $scope.periodos = data.datos; });

    // Metodos
    $scope.mtdSelectAreas = function(campo_id){
        ClasificadorAreasFactory.query({query_id:4, campo_id: campo_id}, function(data){ $scope.areas = data.datos; });
    }
}]);


// Planificacion Bimiestral
planificacionController.controller('planificacionBimestralController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionFactory', 'AsistenciaFactory', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionFactory, AsistenciaFactory, $location) {
    
}]);


// Pnificacion de Clases
planificacionController.controller('planificacionClasesController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionFactory', 'AsistenciaFactory', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionFactory, AsistenciaFactory, $location) {
    
}]);