var cuadernoApp = angular.module('cuadernoApp', [
    'ui.bootstrap',
    'dialogs.main',
    'angularFileUpload',
    'ngRoute',
    'cuadernoAppServices',
    'loginControllers',
    'menuControllers',
    'unidadEducativaControllers',
    'estudiantesControllers',
    'filiacionControllers',
    'asistenciaControllers',
    'evaluacionControllers',
    //'docentesControllers',
    'usuariosControllers',
    'cursosControllers',
    'uploadControllers',
]);

cuadernoApp.config(['$routeProvider','dialogsProvider',function($routeProvider,dialogsProvider) {
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');

    $routeProvider
    // route for the home page
	.when('/', {
	    templateUrl : 'pages/main.html',
	    //controller  : 'mainController'
	})
        .when('/home', {
            templateUrl : 'pages/home.html',
            //controller  : 'homeController'
        })

    // route for the about page
    /*			.when('/about', {
			templateUrl : 'pages/about.html',
			controller  : 'aboutController'
			})
    */
    // route for the contact page
    /*			.when('/contact', {
			templateUrl : 'pages/contact.html',
			controller  : 'contactController'
			}) 
    */ 
    // route for the contact page
    
    // Nuevo Estudiante
        .when('/usuarios', {
	    templateUrl : 'pages/usuario/list.html',
	    controller  : 'usuariosController'
	})
	.when('/addUsuario', {
	    templateUrl : 'pages/usuario/add.html',
	    controller  : 'usuarioController'
	})

    // Planificacion
    .when('/menuPlanificacion', {
            templateUrl : 'pages/planificacion/index.html',
            //controller  : 'estudiantesController'
        })
	.when('/listPlanificacion/',{
	    templateUrl : 'pages/planificacion/list.html',
	    controller : 'planifiacionController.html'
	})
    // 2.1 PLanificacion Anual
    .when('/planificacion_anual', {
            templateUrl : 'pages/planificacionAnual/index.html',
            //controller  : 'cursosDocenteController'
        })
    .when('/planificacion_bimestral', {
            templateUrl : 'pages/planificacionBimestral/index.html',
            //controller  : 'estudiantesController'
        })
    .when('/planificacion_clases', {
            templateUrl : 'pages/planificacionClases/index.html',
            //controller  : 'estudiantesController'
        })
    // filiacion
    // 3.1 Filiacion
    .when('/filiacion', {
            templateUrl : 'pages/filiacion/listCursos.html',
            controller  : 'cursosDocenteController'
        })
    .when('/filiacionEstudiantes/:curso_id', {
            templateUrl : 'pages/filiacion/listEstudiantes.html',
            controller  : 'filiacionController'
        })

    // Asistencia
    // 4.1 Filiacion
    .when('/asistencia', {
            templateUrl : 'pages/asistencia/listCursos.html',
            controller  : 'cursosDocenteController'
        })
    .when('/asistenciaAsignatura/:id', {
            templateUrl : 'pages/asistencia/listAsignatura.html',
            controller  : 'cursosDocenteAsignaturaController'
        })
    .when('/registroAsistencia/:asignado_id/:curso_id', {
            templateUrl : 'pages/asistencia/registroAsistencia.html',
            controller  : 'asistenciaController'
        })

    // Evaluacion
    
    .when('/evaluacion', {
            templateUrl : 'pages/evaluacion/listCursos.html',
            controller  : 'cursosDocenteController'
        })
    .when('/evaluacionAsignatura/:id', {
            templateUrl : 'pages/evaluacion/listAsignatura.html',
            controller  : 'cursosDocenteAsignaturaController'
        })
    .when('/registroEvaluacion/:asignado_id/:curso_id', {
            templateUrl : 'pages/evaluacion/registroEvaluacion.html',
            controller  : 'evaluacionController'
        })

	.when('/addEstudiante', {
            templateUrl : 'pages/estudiante/add.html',
            controller  : 'estudianteController'
        })
	.when('/cursos', {
            templateUrl : 'pages/curso/list.html',
            controller  : 'cursosController'
        })
	.when('/addCurso', {
            templateUrl : 'pages/curso/add.html',
            controller  : 'cursoController'
        })     
	.when('/unidadeseducativas', {
	    templateUrl : 'pages/unidadEducativa/list.html',
	    controller  : 'unidadesEducativasController'
	})
	.when('/addUnidadEducativa', {
	    templateUrl : 'pages/unidadEducativa/add.html',
	    controller  : 'unidadEducativaController'
	})
        .when('/docentes', {
            templateUrl : 'pages/docente/list.html',
            controller  : 'docentesController'
        })
        .when('/addDocente', {
            templateUrl : 'pages/docente/add.html',
            controller  : 'docentesController'
        })
	.when('/upload', {
            templateUrl : 'pages/file/add.html',
            controller  : 'uploadController'
        })
}]);

// Factory conneccion

var cuadernoAppServices = angular.module('cuadernoAppServices', ['ngResource']);

cuadernoAppServices.factory('EstudiantesFactory', function ($resource) {
    return $resource('/index.php/estudiantes.json', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })
    /*return $resource('http://localhost:8080/Estudiante', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })*/
});

cuadernoAppServices.factory('EstudianteFactory', function ($resource) {
    return $resource('/index.php/estudiantes/:id.json?accion=:action', {}, {
        //show: { method: 'GET' },
        view: { method: 'GET', params: {id: '@id', action: 'view'} },
        delete: { method: 'GET', params: {id: '@id', action: 'delete'} }
    })
});

// Usuarios
cuadernoAppServices.factory('UsuariosFactory', function ($resource) {
    return $resource('/index.php/users.json', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })
    /*return $resource('http://localhost:8080/Estudiante', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })*/
});

cuadernoAppServices.factory('UsuarioFactory', function ($resource) {
    return $resource('/index.php/users/:id.json', {}, {
        //show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'GET', params: {id: '@id'} }
    })
});

// Gestiones

cuadernoAppServices.factory('GestionesFactory', function ($resource) {
    return $resource('/index.php/gestiones.json', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })
});

// Sessiones

//factoria para guardar y eliminar sesiones con sessionStorage
cuadernoAppServices.factory("sesionesControl", function(){
    return {
        //obtenemos una sesión //getter
        get : function(key) {
            return sessionStorage.getItem(key)
        },
        //creamos una sesión //setter
        set : function(key, val) {
            return sessionStorage.setItem(key, val)
        },
        //limpiamos una sesión
        unset : function(key) {
            return sessionStorage.removeItem(key)
        }
    }
});

//factoria para loguear y desloguear usuarios en angularjs
cuadernoAppServices.factory("authUsers", function($resource){
    return $resource('/index.php/login/:username/:password', {}, {
        login: { method: 'POST',  params: {username: '@username', password: '@password'},  isArray: false},
    })
});


// Unidades Educativas

cuadernoAppServices.factory('UnidadesEducativasFactory', function ($resource) {
    return $resource('/index.php/unidadeseducativas.json', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })
});

cuadernoAppServices.factory('UnidadEducativaFactory', function ($resource) {
    return $resource('/index.php/unidadeseducativas/:id.json', {}, {
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'GET', params: {id: '@id'} }
    })
});

// Cursos
cuadernoAppServices.factory('CursosFactory', function ($resource) {
    return $resource('/index.php/cursos.json', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    });
});

// Busqueda de Cursos 
cuadernoAppServices.factory('CursosDocenteFactory', function ($resource) {
    return $resource('/index.php/cursos.json?docente_id=:docente_id&gestion_id=:gestion_id', {}, {
        query: { method: 'GET', params:{docente_id: '@docente_id', gestion_id: '@gestion_id'}, isArray: false}        
    });
});


cuadernoAppServices.factory('CursosDocenteAsignaturaFactory', function ($resource) {
    return $resource('/index.php/asignados.json?curso_id=:curso_id&docente_id=:docente_id', {}, {
        query: { method: 'GET', params:{curso_id: '@curso_id', docente_id: '@docente_id'}, isArray: false}        
    });
});


// InscripcionFactory
// Devuelve las inscripciones realizadas en un Curso
cuadernoAppServices.factory('InscripcionFactory', function ($resource) {
    return $resource('/index.php/inscripciones.json?curso_id=:curso_id', {}, {
        query: { method: 'GET', params:{curso_id: '@curso_id'}, isArray: false}        
    });
});


cuadernoAppServices.factory('CursoFactory', function ($resource) {
    return $resource('/index.php/cursos/:id.json', {}, {
        //show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'GET', params: {id: '@id'} }
    })
});

// Niveles
cuadernoAppServices.factory('NivelesFactory', function ($resource) {
    return $resource('/index.php/niveles.json', {}, {
        query: { method: 'GET', isArray: false},
    })
});


// Grados
cuadernoAppServices.factory('GradosFactory', function ($resource) {
    return $resource('/index.php/grados.json?nivel_id=:nivel_id', {}, {
        query: { method: 'GET', params: {nivel_id: '@nivel_id'} ,isArray: false},
    })
});

// Paralelos
cuadernoAppServices.factory('ParalelosFactory', function ($resource) {
    return $resource('/index.php/paralelos.json', {}, {
        query: { method: 'GET', isArray: false},
    })
});

// Turnos
cuadernoAppServices.factory('TurnosFactory', function ($resource) {
    return $resource('/index.php/turnos.json', {}, {
        query: { method: 'GET', isArray: false},
    })
});

// Docentes
cuadernoAppServices.factory('DocentesFactory', function ($resource) {
    return $resource('/index.php/docentes.json', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })
});


// Asistencia
cuadernoAppServices.factory('AsistenciaFactory', function ($resource) {
    return $resource('/index.php/asistencia.json', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })
});

// PeriodoFactory
// Devuelve los Bimestres (Periodos)
cuadernoAppServices.factory('PeriodoFactory', function ($resource) {
    return $resource('/index.php/periodos.json', {}, {
        query: { method: 'GET', params:{}, isArray: false}
    });
});

// DimensionFactory
// Devuelve las Dimenciones
cuadernoAppServices.factory('DimensionFactory', function ($resource) {
    return $resource('/index.php/dimensiones.json', {}, {
        query: { method: 'GET', params:{}, isArray: false}
    });
});

// ActividadEvaluacion
// Devuelve las Actividades de Evaluacion
cuadernoAppServices.factory('ActividadEvaluacionFactory', function ($resource) {
    return $resource('/index.php/actividadevaluaciones.json', {}, {
        query: { method: 'GET', params:{}, isArray: false}
    });
});


// login

var loginController = angular.module('loginControllers',[]);

loginController.controller('loginController',['$scope', '$modalInstance', '$location', 'sesionesControl', 'authUsers',function($scope, $modalInstance, $location, sesionesControl, authUsers){
   //-- Variables --//
    var cacheSession = function(username, userid){
       sesionesControl.set("userLogin", true);
       sesionesControl.set("username", username);
       sesionesControl.set("user_id", userid);
    }
    var unCacheSession = function(){
       sesionesControl.unset("userLogin");
       sesionesControl.unset("username");
	   sesionesControl.unset("user_id");
    }
    $scope.user = {name : ''};

    //-- Methods --//
		
    $scope.cancel = function(){
	$modalInstance.dismiss('Canceled');
    }; // end cancel
    
    $scope.save = function(){
	authUsers.login({username: $scope.user.username, password: $scope.user.password},
			function(data){
			    if(data.login){
				$scope.user.name = data.username;
				cacheSession(data.username, data.id);
				$modalInstance.close($scope.user.username);           
			    }
			    else{
				unCacheSession();
				console.log('no ingresa');
			    }
			}
		       );
    }; // end save
		
    $scope.hitEnter = function(evt){
	if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')))
	    $scope.save();
    };   
}]);


loginController.controller('initController',['$scope','sesionesControl','dialogs','$location',function($scope,sesionesControl,dialogs,$location){
    $scope.username = '';
    if(!sesionesControl.get('userLogin') || (sesionesControl.get('userLogin') == 'false')){
	var dlg = dialogs.create('/pages/dialogs/custom.html','loginController',{},{size:'sm'});
	dlg.result.then(function(name){
	    $scope.username = name;
	},function(){
	    $location.path('/');
	    //if(angular.equals($scope.name,''))
	    //    console.log('error');
	    //$scope.name = 'You did not enter in your name!';
	});
    }
    else{
	$scope.username = sesionesControl.get('username');
    }
}]);

var menuController = angular.module('menuControllers',[]);

menuController.controller('menuController',['$scope', '$location', function($scope, $location){
    $scope.selectMenu = function(menuId){
        if(menuId == 1){
            $location.path('/menuPlanificacion');
        }else if(menuId == 2){
            $location.path('/menuHorario');
        }else if(menuId == 3){
            $location.path('/filiacion');        
        }else if(menuId == 4){
            $location.path('/asistencia');
        }
        else if(menuId == 5){
            $location.path('/evaluacion');
        }

    }
}]);


cuadernoApp.run(['$rootScope','$location','dialogs','sesionesControl', function($rootScope, $location, dialogs, sesionesControl){
//    $templateCache.put('/dialogs/custom.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="course">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div>');
    
    //var dlg = dialogs.create('/pages/dialogs/custom.html','loginController',{},{size:'lg',keyboard: true,backdrop: false,windowClass: 'my-class'});
/*    if(!sesionesControl.get('userLogin')){
	var dlg = dialogs.create('/pages/dialogs/custom.html','loginController',{},{size:'sm'});
	dlg.result.then(function(name){
	    
	},function(){
	    $location.path('/');
	    //if(angular.equals($scope.name,''))
	    //    console.log('error');
	    //$scope.name = 'You did not enter in your name!';
	});
    }
*/
}]);
