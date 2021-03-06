var planificacionController = angular.module('planificacionControllers',[]);

planificacionController.controller('planificacionController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionFactory', 'AsistenciaFactory', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionFactory, AsistenciaFactory, $location) {
    
    $scope.curso_id = $routeParams.id;
    $scope.nivel_id = $routeParams.nivel_id;

    if($scope.nivel_id == 11 || $scope.nivel_id == 12){
        $scope.planificaciones = [{id: 1, item: 'Planificacion Anual - Bimestral de Desarrollo Curricular'},                                  
                                  {id: 2, item: 'Planificacion de Desarrollo de Clases'}];
    }else {
        $scope.planificaciones = [{id: 11, item: 'Planificacion Anual de Desarrollo Curricular'},
                                  {id: 12, item: 'Planificacion Bimestral'},
                                  {id: 13, item: 'Planificacion de Desarrollo de Clases'}];
    }
       

    $scope.mtdPlanificacion = function(id, curso_id){
        if(id == 1){
            $location.path('planificacionAnualBimestral/'+curso_id);
        }else if(id == 2){
            $location.path('planificacionClases1/'+curso_id);
        }else if(id == 11){
            $location.path('planificacionAnual/'+curso_id);
        }else if(id == 12){
            $location.path('planificacionBimestral/'+curso_id);
        }else if(id == 13){
            $location.path('planificacionClases2/'+curso_id);
        }

    }
}]);

// Planificacion Anual

planificacionController.controller('planificacionAnualController', ['$scope','$routeParams','sesionesControl','ClasificadorFactory', 'EncabezadoFactory', 'PlanificacionAnualFactory', 'PlanificacionAnualDetalleFactory', 'PlanificacionAnualDetallesFactory', 'ClasificadorPlanificacionFactory', 'ClasificadorAreasFactory', '$location', function($scope, $routeParams, sesionesControl, ClasificadorFactory, EncabezadoFactory, PlanificacionAnualFactory, PlanificacionAnualDetalleFactory, PlanificacionAnualDetallesFactory, ClasificadorPlanificacionFactory, ClasificadorAreasFactory, $location) {

    $scope.curso_id = $routeParams.curso_id;
    $scope.planificacion_anual = {id:'', curso_id: $scope.curso_id, proyecto_socio_productivo:'', objetivo_general_anual: '', objetivo_holistico_anual: ''};
    $scope.planificacion_anual_detalle = {id:'', area_id: '', periodo_id: '', planificacion_id: '', contenido: ''};
    // Encabezado
    EncabezadoFactory.query({query_id:5, curso_id: $scope.curso_id},
        function(data){                         
                        $scope.encabezado = data.datos[0];
                        $scope.planificacion_anual.id = $scope.encabezado.planificacion_id;
                        $scope.planificacion_anual.curso_id = $scope.encabezado.curso_id;
                        $scope.planificacion_anual.proyecto_socio_productivo = $scope.encabezado.proyecto_socio_productivo;
                        $scope.planificacion_anual.objetivo_general_anual = $scope.encabezado.objetivo_general_anual;
                        $scope.planificacion_anual.objetivo_holistico_anual = $scope.encabezado.objetivo_holistico_anual;
                        
                        $scope.proyecto_socio_productivo = $scope.encabezado.proyecto_socio_productivo;
                        $scope.objetivo_general_anual = $scope.encabezado.objetivo_general_anual;
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
        $scope.planificacion_anual.proyecto_socio_productivo = $scope.proyecto_socio_productivo;
        $scope.planificacion_anual.objetivo_general_anual = $scope.objetivo_general_anual;
        $scope.planificacion_anual.objetivo_holistico_anual = $scope.objetivo_holistico_anual;        
        PlanificacionAnualFactory.create($scope.planificacion_anual, function(data){
            EncabezadoFactory.query({query_id:5, curso_id: $scope.curso_id},
                function(data){ $scope.encabezado = data.datos[0];
                        console.log($scope.encabezado);
                        $scope.planificacion_anual.id = $scope.encabezado.planificacion_id;
                        $scope.planificacion_anual.curso_id = $scope.encabezado.curso_id;
                        $scope.planificacion_anual.proyecto_socio_productivo = $scope.encabezado.proyecto_socio_productivo;
                        $scope.planificacion_anual.objetivo_general_anual = $scope.encabezado.objetivo_general_anual;
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
            $scope.contenido = '';                    
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

    $scope.mtdPrint = function(divName){
      var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWin.window.focus();
            popupWin.document.write('<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" />' +
                '<link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" />' +
                '<link href="/app/webroot/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div>'+
                '</html>');
            popupWin.onbeforeunload = function (event) {              
                popupWin.close();
                //return '.\n';
            };
            popupWin.onabort = function (event) {
                popupWin.document.close();
                popupWin.close();
            }
        } else {
            var popupWin = window.open('', '_blank', 'width=800,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" /><link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" /><link href="/app/webroot/assets/font-awesome/css/font-awesome.css" rel="stylesheet" /></head><body onload="window.print()">' + printContents + 
                '</html>');
            popupWin.document.close();
        }
        popupWin.document.close();
    }

}]);


// Planificacion Anual Bimestral

planificacionController.controller('planificacionAnualBimestralController', ['$scope','$routeParams','sesionesControl','ClasificadorFactory', 'EncabezadoFactory', 'PlanificacionAnualFactory', 'ContenidoPlanificacionAnualFactory', 'PlanificacionBimestralFactory', 'PlanificacionAnualBimestreDetalleFactory', 'PlanificacionAnualBimestreDetallesFactory', 'PlanificacionBimestralDetallesFactory', 'ClasificadorPlanificacionFactory', 'ClasificadorPlanificacionBimestralFactory', 'ClasificadorAreasFactory', '$location', function($scope, $routeParams, sesionesControl, ClasificadorFactory, EncabezadoFactory, PlanificacionAnualFactory, ContenidoPlanificacionAnualFactory, PlanificacionBimestralFactory, PlanificacionAnualBimestreDetalleFactory, PlanificacionAnualBimestreDetallesFactory, PlanificacionBimestralDetallesFactory, ClasificadorPlanificacionFactory, ClasificadorPlanificacionBimestralFactory, ClasificadorAreasFactory, $location) {

    $scope.curso_id = $routeParams.curso_id;
    $scope.planificacion_anual = {id:'', curso_id: $scope.curso_id, proyecto_socio_productivo:'', objetivo_general_anual: '', objetivo_holistico_anual: ''};
    $scope.planificacion_anual_bimestre_detalle = {id:'', area_id: '', periodo_id: '', planificacion_id: '', contenido: ''};
    $scope.planificacion_bimestral = {id:'', periodo_id:'', tematica_orientadora:'', objetivo_holistico: '', planificacion_anual_id: ''};

    // Campos
    ClasificadorFactory.query({query_id:1}, function(data){ $scope.campos = data.datos; });
    // Areas
    ClasificadorFactory.query({query_id:0}, function(data){ $scope.areas = data.datos; });
    // Periodos
    ClasificadorFactory.query({query_id:2}, function(data){ 
        $scope.periodos = data.datos;
        $scope.periodo = $scope.periodos[0]; 
    });
    // Orientaciones Metodoligicas
    ClasificadorFactory.query({query_id:101}, function(data){ $scope.orientaciones = data.datos; });
    // Detalles

    // Encabezado
    EncabezadoFactory.query({query_id:5, curso_id: $scope.curso_id},
        function(data){                         
                        $scope.encabezado = data.datos[0];
                        $scope.planificacion_anual.id = $scope.encabezado.planificacion_id;
                        $scope.planificacion_anual.curso_id = $scope.encabezado.curso_id;
                        $scope.planificacion_anual.proyecto_socio_productivo = $scope.encabezado.proyecto_socio_productivo;
                        $scope.planificacion_anual.objetivo_general_anual = $scope.encabezado.objetivo_general_anual;
                        $scope.planificacion_anual.objetivo_holistico_anual = $scope.encabezado.objetivo_holistico_anual;
                        
                        $scope.proyecto_socio_productivo = $scope.encabezado.proyecto_socio_productivo;
                        $scope.objetivo_general_anual = $scope.encabezado.objetivo_general_anual;
                        $scope.objetivo_holistico_anual = $scope.encabezado.objetivo_holistico_anual;
                        // Detalle Planificacion Anual a Detalle
                        ClasificadorFactory.query({query_id: 137, planificacion_id: $scope.planificacion_anual.id, periodo_id: $scope.periodo.id }, function(data){ 
                                                                                                                                        $scope.planificacion_detalles = data.datos; 
                                                                                                                                });
        });
    // Campos
    ClasificadorFactory.query({query_id:1}, function(data){ $scope.campos = data.datos; });
    // Areas
    ClasificadorFactory.query({query_id:0}, function(data){ $scope.areas = data.datos; });
    // Periodos
    ClasificadorFactory.query({query_id:2}, function(data){ $scope.periodos = data.datos; });
    // Orientaciones Metodoligicas
    ClasificadorFactory.query({query_id:101}, function(data){ $scope.orientaciones = data.datos; });
    // Detalles
    
    

    // Metodos
    $scope.mtdGuardar = function(planificacion_id, curso_id){
        $scope.planificacion_anual.id = planificacion_id;
        $scope.planificacion_anual.curso_id = curso_id;
        $scope.planificacion_anual.proyecto_socio_productivo = $scope.proyecto_socio_productivo;
        $scope.planificacion_anual.objetivo_general_anual = $scope.objetivo_general_anual;
        $scope.planificacion_anual.objetivo_holistico_anual = $scope.objetivo_holistico_anual;        
        PlanificacionAnualFactory.create($scope.planificacion_anual, function(data){
            EncabezadoFactory.query({query_id:5, curso_id: $scope.curso_id},
                function(data){ $scope.encabezado = data.datos[0];
                        console.log($scope.encabezado);
                        $scope.planificacion_anual.id = $scope.encabezado.planificacion_id;
                        $scope.planificacion_anual.curso_id = $scope.encabezado.curso_id;
                        $scope.planificacion_anual.proyecto_socio_productivo = $scope.encabezado.proyecto_socio_productivo;
                        $scope.planificacion_anual.objetivo_general_anual = $scope.encabezado.objetivo_general_anual;
                        $scope.planificacion_anual.objetivo_holistico_anual = $scope.encabezado.objetivo_holistico_anual;
                });
        });        
    };

    $scope.mtdGuardarPlanificacionBimestre = function(Periodo, planificacion_id, objetivo, tematica){
        $scope.planificacion_bimestral.periodo_id = Periodo.id;
        $scope.planificacion_bimestral.tematica_orientadora = tematica;
        $scope.planificacion_bimestral.objetivo_holistico = objetivo;
        $scope.planificacion_bimestral.planificacion_anual_id = planificacion_id;

        PlanificacionBimestralFactory.create($scope.planificacion_bimestral, function(data){
            console.log(data);
        });
    };

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
            $scope.objetivo_holistico_bimestral = $scope.planificacion_bimestral.objetivo_holistico;
            $scope.tematica_orientadora = $scope.planificacion_bimestral.tematica_orientadora;
         });
         ClasificadorFactory.query({query_id: 137, planificacion_id: $scope.planificacion_anual.id, periodo_id: periodo_id }, function(data){ 
                                                                                                                                        $scope.planificacion_detalles = data.datos; 
                                                                                                                                });        
    };

    $scope.mtdSelectCampo = function(campo_id){
        ClasificadorAreasFactory.query({query_id:4, campo_id: campo_id}, function(data){ $scope.areas = data.datos; });
    };

    $scope.mtdSelectArea = function(area_id, periodo_id, planificacion_id){
        ContenidoPlanificacionAnualFactory.query({query_id: 104, area_id: area_id, periodo_id: periodo_id, planificacion_id: planificacion_id}, 
            function(data){
                if(data.datos.length != 0){
                    $scope.planificacion_anual_detalle_id = data.datos[0].id;
                    $scope.contenido = data.datos[0].contenido;
                }
            });
    };

    $scope.mtdAddPlanificacion = function(planificacion_anual_id, planificacion_bimestral_id, area_id, periodo_id, contenido, Orientacion, orientacion_metodologica, evaluacion, producto){
        // validar                
        $scope.planificacion_anual_bimestre_detalle.area_id = area_id;
        $scope.planificacion_anual_bimestre_detalle.periodo_id = periodo_id;
        $scope.planificacion_anual_bimestre_detalle.contenido = contenido;
        $scope.planificacion_anual_bimestre_detalle.planificacion_anual_id = planificacion_anual_id;        
        $scope.planificacion_anual_bimestre_detalle.planificacion_bimestral_id = planificacion_bimestral_id;
        $scope.planificacion_anual_bimestre_detalle.orientacion_metodologica_id = Orientacion.id; 
        $scope.planificacion_anual_bimestre_detalle.orientacion_metodologica = orientacion_metodologica; 
        $scope.planificacion_anual_bimestre_detalle.evaluacion = evaluacion; 
        $scope.planificacion_anual_bimestre_detalle.producto = producto;
        PlanificacionAnualBimestreDetalleFactory.create($scope.planificacion_anual_bimestre_detalle, function(data){            
            $scope.contenido = '';
            $scope.orientacion_metodologica = ''; 
            $scope.evaluacion = '';
            $scope.producto = '';            
            ClasificadorFactory.query({query_id: 137, planificacion_id: planificacion_anual_id, periodo_id: periodo_id}, 
                function(data){                   
                    $scope.planificacion_detalles = data.datos; 
            });  
        })
    }

    $scope.mtdDeletePlanificacion = function(planificacion_anual_id, planificacion_bimestral_detalle_id, periodo_id){
        console.log(planificacion_anual_id);
         PlanificacionBimestralDetallesFactory.delete({id: planificacion_bimestral_detalle_id}, function(data){            
            ClasificadorFactory.query({query_id: 137, planificacion_id: planificacion_anual_id, periodo_id: periodo_id}, 
                function(data){
                    $scope.planificacion_detalles = data.datos; 
            });  
        });
    }

    $scope.mtdPrint = function(divName){
      var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWin.window.focus();
            popupWin.document.write('<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" />' +
                '<link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" />' +
                '<link href="/app/webroot/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div>'+
                '</html>');
            popupWin.onbeforeunload = function (event) {              
                popupWin.close();
                //return '.\n';
            };
            popupWin.onabort = function (event) {
                popupWin.document.close();
                popupWin.close();
            }
        } else {
            var popupWin = window.open('', '_blank', 'width=800,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" /><link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" /><link href="/app/webroot/assets/font-awesome/css/font-awesome.css" rel="stylesheet" /></head><body onload="window.print()">' + printContents + 
                '</html>');
            popupWin.document.close();
        }
        popupWin.document.close();
    }
}]);


// Planificacion Bimiestral

planificacionController.controller('planificacionBimestralController', ['$scope','$routeParams','sesionesControl','ClasificadorFactory', 'EncabezadoFactory', 'PlanificacionAnualFactory', 'PlanificacionAnualDetalleFactory', 'PlanificacionAnualDetallesFactory', 'PlanificacionBimestralFactory', 'PlanificacionBimestralDetalleFactory', 'PlanificacionBimestralDetallesFactory' ,'ClasificadorPlanificacionBimestralFactory', 'ContenidoPlanificacionAnualFactory', 'ClasificadorPlanificacionFactory', 'ClasificadorAreasFactory', '$location', function($scope, $routeParams, sesionesControl, ClasificadorFactory, EncabezadoFactory, PlanificacionAnualFactory, PlanificacionAnualDetalleFactory, PlanificacionAnualDetallesFactory, PlanificacionBimestralFactory, PlanificacionBimestralDetalleFactory, PlanificacionBimestralDetallesFactory, ClasificadorPlanificacionBimestralFactory, ContenidoPlanificacionAnualFactory, ClasificadorPlanificacionFactory, ClasificadorAreasFactory, $location) {

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
    ClasificadorFactory.query({query_id:1}, function(data){ $scope.campos = data.datos; });
    // Areas
    ClasificadorFactory.query({query_id:0}, function(data){ $scope.areas = data.datos; });    
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

    $scope.mtdSelectAreas = function(campo_id){
        ClasificadorAreasFactory.query({query_id:4, campo_id: campo_id}, function(data){ $scope.areas = data.datos; });
    };

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
        $scope.planificacion_bimestral_detalle.evaluacion = $scope.evaluacion;
        $scope.planificacion_bimestral_detalle.producto = $scope.producto;
        PlanificacionBimestralDetalleFactory.create($scope.planificacion_bimestral_detalle, function(data){            
            $scope.orientacion_metodologica = ''; 
            $scope.evaluacion = '';
            $scope.producto = '';
            ClasificadorPlanificacionBimestralFactory.query({query_id: 105, periodo_id: periodo_id, planificacion_id: planificacion_anual_id}, function(data){
                $scope.planificacion_detalles = data.datos;
            });
        });
    }

    $scope.mtdDeletePlanificacion = function(planificacion_bimestral_detalle_id, periodo_id, planificacion_anual_id){
        PlanificacionBimestralDetallesFactory.delete({id: planificacion_bimestral_detalle_id}, function(data){            
            ClasificadorPlanificacionBimestralFactory.query({query_id: 105, periodo_id: periodo_id, planificacion_id: planificacion_anual_id}, function(data){
                $scope.planificacion_detalles = data.datos;
            })  
        });
    }

    $scope.mtdPrint = function(divName){
      var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWin.window.focus();
            popupWin.document.write('<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" />' +
                '<link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" />' +
                '<link href="/app/webroot/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div>'+
                '</html>');
            popupWin.onbeforeunload = function (event) {              
                popupWin.close();
                //return '.\n';
            };
            popupWin.onabort = function (event) {
                popupWin.document.close();
                popupWin.close();
            }
        } else {
            var popupWin = window.open('', '_blank', 'width=800,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" /><link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" /><link href="/app/webroot/assets/font-awesome/css/font-awesome.css" rel="stylesheet" /></head><body onload="window.print()">' + printContents + 
                '</html>');
            popupWin.document.close();
        }
        popupWin.document.close();
    }
}]);

// Pnificacion de Clases
planificacionController.controller('planificacionClasesController', ['$scope','$routeParams','sesionesControl','ClasificadorFactory', 'EncabezadoFactory', 'PlanificacionAnualFactory', 'PlanificacionAnualDetalleFactory', 'PlanificacionAnualDetallesFactory', 'PlanificacionBimestralFactory', 'PlanificacionBimestralDetalleFactory', 'PlanificacionBimestralDetallesFactory' ,'ClasificadorPlanificacionBimestralFactory', 'ContenidoPlanificacionAnualFactory', 'ClasificadorPlanificacionFactory', 'ClasificadorAreasFactory', 'ClasificadorPlanificacionClasesFactory', '$location', function($scope, $routeParams, sesionesControl, ClasificadorFactory, EncabezadoFactory, PlanificacionAnualFactory, PlanificacionAnualDetalleFactory, PlanificacionAnualDetallesFactory, PlanificacionBimestralFactory, PlanificacionBimestralDetalleFactory, PlanificacionBimestralDetallesFactory, ClasificadorPlanificacionBimestralFactory, ContenidoPlanificacionAnualFactory, ClasificadorPlanificacionFactory, ClasificadorAreasFactory, ClasificadorPlanificacionClasesFactory, $location) {
    $scope.curso_id = $routeParams.curso_id;
    $scope.asignado_id = $routeParams.asignado_id;

    ClasificadorPlanificacionClasesFactory.query({query_id: 108, asignado_id: $scope.asignado_id}, function(data){
        $scope.clases = data.datos;
    })
    
    $scope.mtdAddPlanificacionClases = function(curso_id, asignado_id){
        $location.path('/newPlanificacionClases/'+asignado_id+'/'+curso_id);
    }

}]);


planificacionController.controller('addplanificacionClasesController', ['$scope','$routeParams','sesionesControl','ClasificadorFactory', 'EncabezadoClasesFactory', 'PlanificacionAnualFactory', 'PlanificacionAnualDetalleFactory', 'PlanificacionAnualDetallesFactory', 'PlanificacionBimestralFactory', 'PlanificacionBimestralDetalleFactory', 'PlanificacionBimestralDetallesFactory' ,'ClasificadorPlanificacionBimestralFactory', 'ContenidoPlanificacionAnualFactory', 'ClasificadorPlanificacionFactory', 'ClasificadorAreasFactory', 'PlanificacionClaseFactory', 'PlanificacionClaseDetalleFactory', 'PlanificacionClaseDetallesFactory', 'ClasificadorPlanificacionNroClaseFactory', 'usSpinnerService', '$location', function($scope, $routeParams, sesionesControl, ClasificadorFactory, EncabezadoClasesFactory, PlanificacionAnualFactory, PlanificacionAnualDetalleFactory, PlanificacionAnualDetallesFactory, PlanificacionBimestralFactory, PlanificacionBimestralDetalleFactory, PlanificacionBimestralDetallesFactory, ClasificadorPlanificacionBimestralFactory, ContenidoPlanificacionAnualFactory, ClasificadorPlanificacionFactory, ClasificadorAreasFactory, PlanificacionClaseFactory, PlanificacionClaseDetalleFactory, PlanificacionClaseDetallesFactory, ClasificadorPlanificacionNroClaseFactory, usSpinnerService, $location) {

    $scope.curso_id = $routeParams.curso_id;
    $scope.asignado_id = $routeParams.asignado_id;

    $scope.planificacion_anual = {id:'', curso_id: $scope.curso_id, objetivo_holistico_anual: ''};
    $scope.planificacion_anual_detalle = {id:'', area_id: '', periodo_id: '', planificacion_id: '', contenido: ''};

    $scope.planificacion_bimestral = {id:'', periodo_id: '', tematica_orientadora: '', objetivo_holistico: '', planificacion_anual_id: ''};
    $scope.planificacion_bimestral_detalle = {id:'', area_id:'', planificacion_anual_detalle_id:'', orientacion_metodologica_id:'', contenido:'', planificacion_bimestreal_id: ''};
        
    $scope.planificacion_clases = {id:'', nro_clase: '', tematica_orientadora: '', objetivo_holistico: '', contenido: '', producto: '', fuente_verificacion: '', calendario_de_id: '', calendario_a_id: '', asignado_id: '' , planificacion_bimestral_id: '' };
    $scope.planificacion_detalle = {id:'', planificacion_clase_detalle_id:'', orientacion_metodologica_id: '', materiales: '', dimension_id: '', criterio: ''}

    $scope.today = function() {
        $scope.fecha_inicial = new Date();        
    };    
    
    $scope.today();

    $scope.clear = function () {
        $scope.fecha_inicial = null;        
    };

  // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.openFechaInicial = function($event) {        
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened1 = true;
    };

    $scope.openFechaFinal = function($event) {        
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened2 = true;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };
    
    $scope.format = 'yyyy-MM-dd';


    // Encabezado
    EncabezadoClasesFactory.query({query_id:106, curso_id: $scope.curso_id, asignado_id: $scope.asignado_id},
        function(data){                         
                        $scope.encabezado = data.datos[0];
                        $scope.planificacion_anual.id = $scope.encabezado.planificacion_id;
                        $scope.planificacion_anual.curso_id = $scope.encabezado.curso_id;
                        $scope.planificacion_anual.objetivo_holistico = $scope.encabezado.objetivo_holistico;
                        $scope.objetivo_holistico = $scope.encabezado.objetivo_holistico;                        
        });       
    // Periodos
    ClasificadorFactory.query({query_id:2}, function(data){ $scope.periodos = data.datos; });
    // Orientaciones Metologicas
    ClasificadorFactory.query({query_id:101}, function(data){ $scope.orientaciones = data.datos; });
    // Dimensiones
    ClasificadorFactory.query({query_id:107}, function(data){ $scope.dimensiones = data.datos; });
    // Detalles
    
    $scope.mtdClearPlanificacionClase = function()
    {
        $scope.planificacion_clases.id = null;
        $scope.planificacion_clases.nro_clase = null;
        
        $scope.planificacion_clases.objetivo_holistico = null;
        $scope.planificacion_clases.contenido = null;
        $scope.planificacion_clases.producto = null;
        $scope.planificacion_clases.fuente_verificacion = null;
        $scope.planificacion_clases.calendario_de_id = null;
        $scope.planificacion_clases.calendario_a_id = null;
        /*$scope.planificacion_clases.asignado_id = asignado_id;*/
        /*$scope.planificacion_clases.planificacion_bimestral_id = planificacion_bimestral_id;*/        
        $scope.fecha_inicial = new Date();
        $scope.fecha_final = new Date();
        $scope.objetivo_holistico = null;
        $scope.contenido = null;
        $scope.producto = null;
        $scope.fuente_verificacion = null;
    }

    // Metodos
    $scope.mtdSelectedBimestre = function(periodo_id, planificacion_id, asignado_id){
        ClasificadorPlanificacionBimestralFactory.query({query_id: 102, periodo_id: periodo_id, planificacion_id: planificacion_id}, function(data){
            if(data.datos.length == 0){
                $scope.planificacion_bimestral.id = null;
                $scope.planificacion_bimestral.periodo_id = periodo_id;
                $scope.planificacion_bimestral.tematica_orientadora = '';
                $scope.planificacion_bimestral.tematica_orientadora = '';
                $scope.planificacion_bimestral.objetivo_holistico = '';
                $scope.planificacion_bimestral.planificacion_anual_id = planificacion_id;
                $scope.nro_clase = null;
                $scope.mtdClearPlanificacionClase();
            }else{
                $scope.planificacion_bimestral.id = data.datos[0].planificacion_bimestral_id;
                $scope.planificacion_bimestral.periodo_id = data.datos[0].periodo_id;
                $scope.planificacion_bimestral.tematica_orientadora = data.datos[0].tematica_orientadora;
                $scope.planificacion_bimestral.proyecto_socio_productivo = data.datos[0].proyecto_socio_productivo;
                $scope.planificacion_bimestral.objetivo_holistico = data.datos[0].objetivo_holistico;
                $scope.planificacion_bimestral.planificacion_anual_id = data.datos[0].planificacion_anual_id;
                $scope.tematica_orientadora = data.datos[0].tematica_orientadora;
                $scope.proyecto_socio_productivo = data.datos[0].proyecto_socio_productivo;
                //$scope.tematica_orientadora = data.datos[0].tematica_orientadora;

                if($scope.nro_clase != null){                    
                    ClasificadorPlanificacionNroClaseFactory.query({query_id: 109,nro_clase: $scope.nro_clase, periodo_id: periodo_id, asignado_id: asignado_id}, function(data){
                        if(data.datos.length == 0){
                            $scope.mtdClearPlanificacionClase();    
                        }else{
                            $scope.planificacion_clases.id = data.datos[0].id;
                            $scope.planificacion_clases.nro_clase = data.datos[0].nro_clase;
                            $scope.planificacion_clases.objetivo_holistico = data.datos[0].objetivo_holistico;
                            $scope.planificacion_clases.contenido = data.datos[0].contenido;
                            $scope.planificacion_clases.producto = data.datos[0].producto;
                            $scope.planificacion_clases.fuente_verificacion = data.datos[0].fuente_verificacion;
                            $scope.planificacion_clases.calendario_de_id = data.datos[0].calendario_de_id;
                            $scope.planificacion_clases.calendario_a_id = data.datos[0].calendario_a_id;
                            /*$scope.planificacion_clases.asignado_id = asignado_id;*/
                            /*$scope.planificacion_clases.planificacion_bimestral_id = planificacion_bimestral_id;*/                            
                            //cope.nro_clase = data.datos[0].nro_clases;
                            $scope.fecha_inicial = data.datos[0].fecha_de;
                            $scope.fecha_final = data.datos[0].fecha_a;
                            
                            $scope.objetivo_holistico = data.datos[0].objetivo_holistico;
                            $scope.contenido = data.datos[0].contenido;
                            $scope.producto = data.datos[0].producto;
                            $scope.fuente_verificacion = data.datos[0].fuente_verificacion;
                        }
                    })
                }
                else{
                    $scope.mtdClearPlanificacionClase();
                }
            }            
        })
    }

    $scope.mtdChangeClases = function(periodo_id, asignado_id){
        if(periodo_id != null){        
            ClasificadorPlanificacionNroClaseFactory.query({query_id: 109,nro_clase: $scope.nro_clase, periodo_id: periodo_id, asignado_id: asignado_id}, function(data){
                if(data.datos.length == 0){
                    $scope.mtdClearPlanificacionClase();
                }else{
                    $scope.planificacion_clases.id = data.datos[0].id;
                    $scope.planificacion_clases.nro_clase = data.datos[0].nro_clases;
                    $scope.planificacion_clases.objetivo_holistico = data.datos[0].objetivo_holistico;
                    $scope.planificacion_clases.contenido = data.datos[0].contenido;
                    $scope.planificacion_clases.producto = data.datos[0].producto;
                    $scope.planificacion_clases.fuente_verificacion = data.datos[0].fuente_verificacion;
                    $scope.planificacion_clases.calendario_de_id = data.datos[0].calendario_de_id;
                    $scope.planificacion_clases.calendario_a_id = data.datos[0].calendario_a_id;
                    /*$scope.planificacion_clases.asignado_id = asignado_id;*/
                    /*$scope.planificacion_clases.planificacion_bimestral_id = planificacion_bimestral_id;*/                    
                    //cope.nro_clase = data.datos[0].nro_clases;
                    $scope.fecha_inicial = data.datos[0].fecha_de;
                    $scope.fecha_final = data.datos[0].fecha_a;                    
                    $scope.objetivo_holistico = data.datos[0].objetivo_holistico;
                    $scope.contenido = data.datos[0].contenido;
                    $scope.producto = data.datos[0].producto;
                    $scope.fuente_verificacion = data.datos[0].fuente_verificacion;

                    ClasificadorFactory.query({query_id:138, planificacion_id: data.datos[0].id}, function(data){ 
                        $scope.planificacion_detalles = data.datos;                         
                    });
                }
            })
        }else{
            //cope.mtdClearPlanificacionClase();
        }
    }

    $scope.mtdGuardarPlanificacion = function(asignado_id, planificacion_bimestral_id){
        $scope.planificacion_clases.nro_clase = $scope.nro_clase;
        $scope.planificacion_clases.objetivo_holistico = $scope.objetivo_holistico;
        $scope.planificacion_clases.contenido = $scope.contenido;
        $scope.planificacion_clases.producto = $scope.producto;
        $scope.planificacion_clases.fuente_verificacion = $scope.fuente_verificacion;
        $scope.planificacion_clases.calendario_de_id = $scope.fecha_inicial;
        $scope.planificacion_clases.calendario_a_id = $scope.fecha_final;
        $scope.planificacion_clases.asignado_id = asignado_id;
        $scope.planificacion_clases.planificacion_bimestral_id = planificacion_bimestral_id;
        usSpinnerService.spin('spinner-1');
        PlanificacionClaseFactory.create($scope.planificacion_clases, function(data){
            usSpinnerService.stop('spinner-1');
            //Aqui visualizar
        });              
    }

    $scope.mtdAddPlanificacion = function(planificacion_clase_detalle_id,  orientacion_id, orientacion_metodologica, materiales, dimension_id, criterio_evaluacion, planificacion_clase_id){        
        $scope.planificacion_detalle.id = planificacion_clase_detalle_id;
        $scope.planificacion_detalle.planificacion_clase_id = planificacion_clase_id;
        $scope.planificacion_detalle.orientacion_metodologica_id = orientacion_id;
        $scope.planificacion_detalle.orientacion_metodologica = orientacion_metodologica;
        $scope.planificacion_detalle.materiales = materiales;
        $scope.planificacion_detalle.dimension_id = dimension_id;
        $scope.planificacion_detalle.criterio = criterio_evaluacion;
        PlanificacionClaseDetalleFactory.create($scope.planificacion_detalle, function(data){
            console.log(data);
            $scope.planificacion_clase_detalle_id = '';
            $scope.planificacion_clase_id = 0;
            $scope.orientacion_id = 0;
            $scope.orientacion_metodologica = '';
            $scope.materiales = '';
            $scope.dimension_id = 0;
            $scope.criterio_evaluacion = '';
            ClasificadorFactory.query({query_id:138, planificacion_id: planificacion_clase_id}, function(data){ 
                        $scope.planificacion_detalles = data.datos;                         
                    });
        });

    }

    $scope.mtdDeletePlanificacion = function(planificacion_clase_detalle_id, planificacion_clase_id){        
        PlanificacionClaseDetallesFactory.delete({id: planificacion_clase_detalle_id}, function(data){
            ClasificadorFactory.query({query_id:138, planificacion_id: planificacion_clase_id}, function(data){ 
                        $scope.planificacion_detalles = data.datos;                         
                    });
        });
    }

    $scope.mtdSelectOrientacion = function(planificacion_clase_id, orientacion_id){
        ClasificadorFactory.query({query_id:139, planificacion_id: planificacion_clase_id, orientacion_metodologica_id: orientacion_id}, function(data){ 
            if(data.datos.length > 0){
                $scope.planificacion_clase_detalle_id = data.datos[0].id;
                $scope.orientacion_metodologica = data.datos[0].orientacion_metodologica;
                $scope.materiales = data.datos[0].materiales;                         
            }else{
                $scope.planificacion_clase_detalle_id = '';
                $scope.orientacion_metodologica = '';
                $scope.materiales = '';
            }
        });
    }
    
    $scope.mtdPrint = function(divName){
      var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWin.window.focus();
            popupWin.document.write('<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" />' +
                '<link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" />' +
                '<link href="/app/webroot/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div>'+
                '</html>');
            popupWin.onbeforeunload = function (event) {              
                popupWin.close();
                //return '.\n';
            };
            popupWin.onabort = function (event) {
                popupWin.document.close();
                popupWin.close();
            }
        } else {
            var popupWin = window.open('', '_blank', 'width=800,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="/app/webroot/css/bootstrap/bootstrap.min.css" /><link rel="stylesheet" type="text/css" href="/app/webroot/assets/css/style.css" /><link href="/app/webroot/assets/font-awesome/css/font-awesome.css" rel="stylesheet" /></head><body onload="window.print()">' + printContents + 
                '</html>');
            popupWin.document.close();
        }
        popupWin.document.close();
    }
    
}]);

