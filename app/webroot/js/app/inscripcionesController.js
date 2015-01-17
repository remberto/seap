var inscripcionesController = angular.module('inscripcionesControllers',[]);

inscripcionesController.controller('inscripcionCursoController', ['$scope','CursosListFactory','CursoFactory','$location', 'sesionesControl', 'usSpinnerService', function($scope, CursosListFactory, CursoFactory, $location, sesionesControl, usSpinnerService) {
    usSpinnerService.spin('spinner-1');
    $scope.cursos = null;    
    //CursosListFactory.query({habilitado: true, user_id: sesionesControl.get('user_id')}, function(data){usSpinnerService.stop('spinner-1'); $scope.cursos = data.datos;});

    $scope.inscribir = function(idCurso){
      $location.path('/inscribir/'+idCurso);
    }

    $scope.lista = function(idCurso){
      $location.path('/listInscripciones/'+idCurso);
    }

}]);


inscripcionesController.controller('inscribirController', ['$scope','$routeParams','CursosListFactory','InscripcionFactory','$location', 'sesionesControl', 'usSpinnerService', function($scope, $routeParams, CursosListFactory, InscripcionFactory, $location, sesionesControl, usSpinnerService) {
    usSpinnerService.spin('spinner-1');
    $scope.cursos = null;    
    $scope.inscripcion = {'curso_id': $routeParams.idCurso};
    usSpinnerService.stop('spinner-1');
    
    $scope.newInscripcion = function(){
      usSpinnerService.spin('spinner-1');
      InscripcionFactory.create($scope.inscripcion, function(data){
        usSpinnerService.stop('spinner-1');
        if(data.message.guardado){
            $.fn.jAlert({
                  'title':'¡Satisfactorio!',
                  'message': data.message.mensaje,
                  'theme': 'success',
                  'closeBtn': false,
                  'btn': [{'label':'Cerrar', 
                           'closeOnClick': true, 
                           'cssClass': 'green',                                
                         }],
                  'size': 'small',                      
                  'onClose': function(){
                      $scope.mtdList($scope.inscripcion.curso_id);
                  }
                });

        }else{
            $.fn.jAlert({
                  'title':'Error!',
                  'message': data.message.mensaje,
                  'theme': 'error'
                });
        }
      });
    }

    $scope.mtdList = function(idCurso){        
        $location.path('/listInscripciones/'+idCurso); 
        $scope.$apply();
    }

}]);


inscripcionesController.controller('inscripcionListController', ['$scope','$routeParams','InscripcionListFactory','InscripcionFactory','$location', 'sesionesControl', 'usSpinnerService', function($scope, $routeParams, InscripcionListFactory, InscripcionFactory, $location, sesionesControl, usSpinnerService) {
    //usSpinnerService.spin('spinner-1');
    $scope.cursos = null;       

    InscripcionListFactory.query({query_id:124, curso_id:$routeParams.idCurso}, function(data){
      $scope.inscripciones = data.datos;
    })    

}]);