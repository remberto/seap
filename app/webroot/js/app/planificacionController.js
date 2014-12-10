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

planificacionController.controller('planificacionAnualController', ['$scope','$routeParams','sesionesControl','ClasificadorFactory', 'EncabezadoFactory', 'PlanificacionAnualFactory', 'PlanificacionAnualDetalleFactory', 'ClasificadorAreasFactory', '$location', function($scope, $routeParams, sesionesControl, ClasificadorFactory, EncabezadoFactory, PlanificacionAnualFactory, PlanificacionAnualDetalleFactory, ClasificadorAreasFactory, $location) {

    $scope.curso_id = $routeParams.curso_id;
    $scope.planificacion_anual = {id:'', curso_id: $scope.curso_id, objetivo_holistico_anual: ''};
    $scope.planificacion_anual_detalle = {id:'', area_id: '', periodo_id: '', planificacion_id: '', contenido: ''};
    // Encabezado
    EncabezadoFactory.query({query_id:5, curso_id: $scope.curso_id},
        function(data){ $scope.encabezado = data.datos[0];
                        $scope.planificacion_anual.id = $scope.encabezado.planificacion_id;
                        $scope.planificacion_anual.curso_id = $scope.encabezado.curso_id;
                        $scope.planificacion_anual.objetivo_holistico_anual = $scope.encabezado.objetivo_holistico_anual;
                        $scope.objetivo_holistico_anual = $scope.encabezado.objetivo_holistico_anual;
        });
    // Campos
    ClasificadorFactory.query({query_id:1}, function(data){ $scope.campos = data.datos; });
    // Areas
    ClasificadorFactory.query({query_id:0}, function(data){ $scope.areas = data.datos; });
    // Periodos
    ClasificadorFactory.query({query_id:2}, function(data){ $scope.periodos = data.datos; });
    // Detalles
    

    // Metodos
    $scope.mtdGuardar = function(planificacion_id, curso_id){
        $scope.planificacion_anual.id = planificacion_id;
        $scope.planificacion_anual.curso_id = curso_id;
        $scope.planificacion_anual.objetivo_holistico_anual = $scope.objetivo_holistico_anual;        
        PlanificacionAnualFactory.create($scope.planificacion_anual, function(data){
            EncabezadoFactory.query({query_id:5, curso_id: $scope.curso_id},
                function(data){ $scope.encabezado = data.datos[0];
                        $scope.planificacion_anual.id = $scope.encabezado.planificacion_id;
                        $scope.planificacion_anual.curso_id = $scope.encabezado.curso_id;
                        $scope.planificacion_anual.objetivo_holistico_anual = $scope.encabezado.objetivo_holistico_anual;
                });
        });        
    };

    $scope.mtdSelectAreas = function(campo_id){
        ClasificadorAreasFactory.query({query_id:4, campo_id: campo_id}, function(data){ $scope.areas = data.datos; });
    };

    $scope.mtdAddPlanificacion = function(planificacion_anual_id, area_id, periodo_id){
        // validar                
        $scope.planificacion_anual_detalle.area_id = area_id;
        $scope.planificacion_anual_detalle.periodo_id = periodo_id;
        $scope.planificacion_anual_detalle.contenido = $scope.contenido;
        $scope.planificacion_anual_detalle.planificacion_anual_id = planificacion_anual_id;
        PlanificacionAnualDetalleFactory.create($scope.planificacion_anual_detalle, function(data){
            console.log(data);
        })
        console.log($scope.planificacion_anual_detalle);
    }
}]);


// Planificacion Bimiestral
planificacionController.controller('planificacionBimestralController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionFactory', 'AsistenciaFactory', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionFactory, AsistenciaFactory, $location) {
    
}]);


// Pnificacion de Clases
planificacionController.controller('planificacionClasesController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionFactory', 'AsistenciaFactory', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionFactory, AsistenciaFactory, $location) {
    
}]);