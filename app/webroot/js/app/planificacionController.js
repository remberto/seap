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

planificacionController.controller('planificacionAnualController', ['$scope','$routeParams','sesionesControl','ClasificadorFactory', 'EncabezadoFactory', 'PlanificacionAnualFactory', 'PlanificacionAnualDetalleFactory', 'PlanificacionAnualDetallesFactory', 'ClasificadorPlanificacionFactory', 'ClasificadorAreasFactory', '$location', function($scope, $routeParams, sesionesControl, ClasificadorFactory, EncabezadoFactory, PlanificacionAnualFactory, PlanificacionAnualDetalleFactory, PlanificacionAnualDetallesFactory, ClasificadorPlanificacionFactory, ClasificadorAreasFactory, $location) {

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
                        // Detalle Planificacion Anual a Detalle
                        ClasificadorPlanificacionFactory.query({query_id: 100, planificacion_id: $scope.planificacion_anual.id}, function(data){ 
                                                                                                                                        $scope.planificacion_detalles = data.datos; 
                                                                                                                                });
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
            ClasificadorPlanificacionFactory.query({query_id: 100, planificacion_id: $scope.planificacion_anual.id}, 
                function(data){ 
                    $scope.planificacion_detalles = data.datos; 
            });  
        })
    }

    $scope.mtdDeletePlanificacion = function(planificacion_anual_detalle_id){
        PlanificacionAnualDetallesFactory.delete({id: planificacion_anual_detalle_id}, function(data){
            ClasificadorPlanificacionFactory.query({query_id: 100, planificacion_id: $scope.planificacion_anual.id}, 
                function(data){ 
                    $scope.planificacion_detalles = data.datos; 
                });  
        });
    }
}]);


// Planificacion Bimiestral

planificacionController.controller('planificacionBimestralController', ['$scope','$routeParams','sesionesControl','ClasificadorFactory', 'EncabezadoFactory', 'PlanificacionAnualFactory', 'PlanificacionAnualDetalleFactory', 'PlanificacionAnualDetallesFactory', 'PlanificacionBimestralFactory', 'PlanificacionBimestralDetalleFactory', 'ClasificadorPlanificacionBimestralFactory', 'ContenidoPlanificacionAnualFactory', 'ClasificadorPlanificacionFactory', 'ClasificadorAreasFactory', '$location', function($scope, $routeParams, sesionesControl, ClasificadorFactory, EncabezadoFactory, PlanificacionAnualFactory, PlanificacionAnualDetalleFactory, PlanificacionAnualDetallesFactory, PlanificacionBimestralFactory, PlanificacionBimestralDetalleFactory, ContenidoPlanificacionAnualFactory, ClasificadorPlanificacionBimestralFactory, ClasificadorPlanificacionFactory, ClasificadorAreasFactory, $location) {

    $scope.curso_id = $routeParams.curso_id;
    $scope.planificacion_anual = {id:'', curso_id: $scope.curso_id, objetivo_holistico_anual: ''};
    $scope.planificacion_anual_detalle = {id:'', area_id: '', periodo_id: '', planificacion_id: '', contenido: ''};
    $scope.planificacion_bimestral = {id:'', periodo_id: '', tematica_orientadora: '', objetivo_holistico: '', planificacion_anual_id: ''};
    $scope.planificacion_bimestral_detalle = {id:'', area_id:'', planificacion_anual_detalle_id:'', orientacion_metodologica_id:'', contenido:'', planificacion_bimestreal_id: ''};
    // Encabezado
    EncabezadoFactory.query({query_id:5, curso_id: $scope.curso_id},
        function(data){ $scope.encabezado = data.datos[0];
                        $scope.planificacion_anual.id = $scope.encabezado.planificacion_id;
                        $scope.planificacion_anual.curso_id = $scope.encabezado.curso_id;
                        $scope.planificacion_anual.objetivo_holistico_anual = $scope.encabezado.objetivo_holistico_anual;
                        $scope.objetivo_holistico_anual = $scope.encabezado.objetivo_holistico_anual;                        
        });
    // Campos
    ClasificadorFactory.query({query_id:103}, function(data){ $scope.areas = data.datos; });    
    // Periodos
    ClasificadorFactory.query({query_id:2}, function(data){ $scope.periodos = data.datos; });
    // Orientaciones Metologicas
    ClasificadorFactory.query({query_id:101}, function(data){ $scope.orientaciones = data.datos; });
    // Detalles
    
    

    // Metodos
    $scope.mtdSelectedBimestre = function(periodo_id, planificacion_id){
        ClasificadorPlanificacionBimestralFactory.query({query_id: 102, periodo_id: periodo_id, planificacion_id: planificacion_id}, function(data){
            if(data.datos.length == 0){
                $scope.planificacion_bimestral.id = null;
                $scope.planificacion_bimestral.periodo_id = periodo_id;
                $scope.planificacion_bimestral.tematica_orientadora = '';
                $scope.planificacion_bimestral.objetivo_holistico = '';
                $scope.planificacion_bimestral.planificacion_anual_id = planificacion_id;
            }else{
                $scope.planificacion_bimestral.id = data.datos[0].planificacion_bimestral_id;
                $scope.planificacion_bimestral.periodo_id = data.datos[0].periodo_id;
                $scope.planificacion_bimestral.tematica_orientadora = data.datos[0].tematica_orientadora;
                $scope.planificacion_bimestral.objetivo_holistico = data.datos[0].objetivo_holistico;
                $scope.planificacion_bimestral.planificacion_anual_id = data.datos[0].planificacion_anual_id;                
            }
            $scope.tematica_orientadora = $scope.planificacion_bimestral.tematica_orientadora;
            $scope.objetivo_holistico = $scope.planificacion_bimestral.objetivo_holistico;
        })
        ClasificadorPlanificacionBimestralFactory.query({query_id: 105, periodo_id: periodo_id, planificacion_id: planificacion_id}, function(data){
            $scope.planificacion_detalles = data.datos;
        })

        
    }

    $scope.mtdSelectedAreas = function(area_id, periodo_id, planificacion_id){
        ContenidoPlanificacionAnualFactory.query({query_id: 104, area_id: area_id, periodo_id: periodo_id, planificacion_id: planificacion_id}, 
            function(data){
                if(data.datos.length == 0){
                    $.fn.jAlert({
                      'title':'Error!',
                      'message': 'No se encuentra Disponible el Contenido, verifique en Planificacion Anual de Desarrollo Curricular',
                      'theme': 'error'
                    });
                }else{
                    $scope.planificacion_anual_detalle_id = data.datos[0].id;
                    $scope.contenido = data.datos[0].contenido;
                }
            });
    }

    $scope.mtdGuardar = function(periodo_id, planificacion_id){
        $scope.planificacion_bimestral.periodo_id = periodo_id;
        $scope.planificacion_bimestral.tematica_orientadora = $scope.tematica_orientadora;
        $scope.planificacion_bimestral.objetivo_holistico = $scope.objetivo_holistico;
        $scope.planificacion_bimestral.planificacion_anual_id = planificacion_id;

        PlanificacionBimestralFactory.create($scope.planificacion_bimestral, function(data){
            console.log(data);
        });

    };

    $scope.mtdSelectAreas = function(campo_id){
        ClasificadorAreasFactory.query({query_id:4, campo_id: campo_id}, function(data){ $scope.areas = data.datos; });
    };

    $scope.mtdAddPlanificacion = function(area_id, planificacion_anual_detalle_id, orientacion_metodologica_id, planificacion_bimestral_id, periodo_id, planificacion_anual_id){
        $scope.planificacion_bimestral_detalle.area_id = area_id;
        $scope.planificacion_bimestral_detalle.planificacion_anual_detalle_id = planificacion_anual_detalle_id;
        $scope.planificacion_bimestral_detalle.orientacion_metodologica_id = orientacion_metodologica_id;
        $scope.planificacion_bimestral_detalle.planificacion_bimestral_id = planificacion_bimestral_id;
        $scope.planificacion_bimestral_detalle.contenido = $scope.orientacion_metodologica;
        PlanificacionBimestralDetalleFactory.create($scope.planificacion_bimestral_detalle, function(data){
            ClasificadorPlanificacionBimestralFactory.query({query_id: 105, periodo_id: periodo_id, planificacion_id: planificacion_anual_id}, function(data){
                $scope.planificacion_detalles = data.datos;
            });
        });
    }

    $scope.mtdDeletePlanificacion = function(planificacion_anual_detalle_id){
        PlanificacionAnualDetallesFactory.delete({id: planificacion_anual_detalle_id}, function(data){
            ClasificadorPlanificacionFactory.query({query_id: 100, planificacion_id: $scope.planificacion_anual.id}, 
                function(data){ 
                    $scope.planificacion_detalles = data.datos; 
                });  
        });
    }
}]);

// Pnificacion de Clases
planificacionController.controller('planificacionClasesController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionFactory', 'AsistenciaFactory', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionFactory, AsistenciaFactory, $location) {
    
}]);