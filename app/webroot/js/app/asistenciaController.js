var asistenciaController = angular.module('asistenciaControllers',[]);

asistenciaController.controller('asistenciaController', ['$scope','$routeParams','sesionesControl','EstudiantesFactory','InscripcionListFactory', 'AsistenciaFactory', 'AsistenciaResumenFactory', 'CursosDocenteFactory', 'CursosDocenteAsignaturaFactory', 'usSpinnerService', 'dialogs', '$location', function($scope, $routeParams, sesionesControl, EstudiantesFactory, InscripcionListFactory, AsistenciaFactory, AsistenciaResumenFactory, CursosDocenteFactory, CursosDocenteAsignaturaFactory, usSpinnerService, dialogs, $location) {
    $scope.habilitado = false;
    $scope.meses = [ {id: 2, title: 'Febrero'},
                     {id: 3, title: 'Marzo'},
                     {id: 4, title: 'Abril'},
                     {id: 5, title: 'Mayo'},
                     {id: 6, title: 'Junio'},
                     {id: 7, title: 'Julio'},
                     {id: 8, title: 'Agosto'},
                     {id: 9, title: 'Septiembre'},
                     {id: 10, title: 'Octubre'},
                     {id: 11, title: 'Noviembre'},                     
                      ];

    $scope.asistencia = {curso: 0, mes: 0};
    $scope.resumen = {curso: 0, asignado: 0};

    CursosDocenteFactory.query({query_id: 131, docente_id: sesionesControl.get('user_id'), gestion_id: sesionesControl.get('gestion')},function(data){
      $scope.cursos = data.datos;            
    });

    $scope.mtdSelectCurso = function(curso){
      $scope.habilitado = false;
      $scope.asistencia = null;
      $scope.asistencia = {curso: 0, mes: 0};
      $scope.resumen = null;
      $scope.resumen = {curso: 0, asignado: 0};
      CursosDocenteAsignaturaFactory.query({query_id: 132, docente_id: sesionesControl.get('user_id'), curso_id: curso.id } ,
        function(data){
          $scope.asignados = data.datos;          
      });
    }

    $scope.mtdView = function(Curso, Asignado){
      $scope.habilitado = true;
      $scope.mtdVer(2, Curso, Asignado);
      $scope.mtdResumen(Curso, Asignado);
    }

    $scope.mtdAddAsistencia = function(Estudiante, Mes, Dia, Curso, Asignado, estado){
        console.log(Dia);
        $scope.registro = {asignado_id:'', inscripcion_id:'',calendario_fecha:''};
        $scope.registro.asignado_id = Asignado.id;
        $scope.registro.inscripcion_id = Estudiante.id;
        $scope.registro.calendario_fecha = Dia.fecha;        
        if(estado == 0){
          $scope.registro.estado_asistencia = 1;
        } else if(estado == 1){
          $scope.registro.estado_asistencia = 2;
        } else if(estado == 2){
          $scope.registro.estado_asistencia = 3;
        }  else if(estado == 3){
          $scope.registro.estado_asistencia = 4;
        } else if(estado == 4){
          $scope.registro.estado_asistencia = 1;
        }
        $scope.registro.docente_id = sesionesControl.get('user_id');        
        usSpinnerService.spin('spinner-1');
        AsistenciaFactory.create($scope.registro, function(data){
            usSpinnerService.stop('spinner-1');            
            if(data.datos.guardado){
              $scope.mtdVer(Mes.id, Curso, Asignado);
            }else{
                $.fn.jAlert({
                      'title':'Error!',
                      'message': data.datos.message,
                      'theme': 'error'
                    });
            };
        });
    }

    $scope.mtdVer = function(id, Curso, Asignado){
        if($scope.habilitado == true){
          //$scope.asistencia = null;
          $scope.asistencia.mes = id;
          $scope.asistencia.curso = Curso.id;
          $scope.asistencia.asignado = Asignado.id;          
          AsistenciaFactory.query($scope.asistencia, function(data){
             // console.log(data.datos);            //
             $scope.asistencia = data.datos.asistencia;
             $scope.resumen = data.datos.resumen;
             $scope.estudiantes = data.datos.inscritos;
             $scope.dias = data.datos.dias;             
          })
        }
    }

    $scope.mtdResumen = function(Curso, Asignado){
      if($scope.habilitado == true){
          //$scope.asistencia = null;          
          $scope.resumen.curso = Curso.id;
          $scope.resumen.asignado = Asignado.id;          
          AsistenciaResumenFactory.query($scope.resumen, function(data){
             // console.log(data.datos);            //             
             $scope.resumen_anual = data.datos.resumen;
             $scope.estudiantes = data.datos.inscritos;             
          })
        }
    }

    $scope.mtdReporte = function(inscripcion_id, asignado_id){
      var dlg = dialogs.create('/pages/dialogs/asistenciareporte.html','asistenciareporteController', {inscripcion_id: inscripcion_id, asignado_id: asignado_id}, {size:'lg'});
      dlg.result.then(function(data){
          
      });
    }

}]);


asistenciaController.controller('asistenciareporteController', ['$scope','ReportesFactory','$modalInstance', '$location', 'usSpinnerService', 'sesionesControl', 'data',  function($scope, ReportesFactory, $modalInstance, $location, usSpinnerService, sesionesControl, data) {
  //$scope.evaluacion = {criterios: null}   
  usSpinnerService.spin('spinner-1');    
  $scope.chart = null;
  $scope.gridTable = {};

  $scope.datreporte = {id:0,inscripcion_id:0, asignado_id:0};
  $scope.datreporte.id = 1;
  $scope.datreporte.inscripcion_id = data.inscripcion_id;
  $scope.datreporte.asignado_id = data.asignado_id; 
    
  ReportesFactory.query($scope.datreporte,
       function(data){
          usSpinnerService.stop('spinner-1');
          console.log(data.datos);
          $scope.reporte = data.datos.title.text;
          $scope.chart = data.datos;         
          $scope.chart.series[0].color = "#08298A";
          $scope.chart.series[1].color = "#B40404";
          $scope.chart.series[2].color = "#0B610B";
          $scope.chart.series[3].color = "#FF8000";  
       });
  

  $scope.cancel = function(){
    $modalInstance.dismiss('Canceled');
      }; // end cancel
    
  $scope.save = function(){
    $modalInstance.close();        
  };
  
}]);