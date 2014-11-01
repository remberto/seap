var cuadernoApp = angular.module('cuadernoApp', [
    'ui.bootstrap',
    'dialogs.main',
    'ngRoute',
    'cuadernoAppServices',
    'loginControllers',
    'unidadEducativaControllers',
    'estudiantesControllers',
    'docentesControllers',
    'usuariosControllers',
    'cursosControllers',
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
        .when('/filiacion', {
            templateUrl : 'pages/estudiante/list.html',
            controller  : 'estudiantesController'
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
        //obtenemos una sesi�n //getter
        get : function(key) {
            return sessionStorage.getItem(key)
        },
        //creamos una sesi�n //setter
        set : function(key, val) {
            return sessionStorage.setItem(key, val)
        },
        //limpiamos una sesi�n
        unset : function(key) {
            return sessionStorage.removeItem(key)
        }
    }
});

//factoria para loguear y desloguear usuarios en angularjs
cuadernoAppServices.factory("authUsers", function($http, $location, sesionesControl){
    var cacheSession = function(username){
        sesionesControl.set("userLogin", true);
        sesionesControl.set("username", username);
    }
    var unCacheSession = function(){
        sesionesControl.unset("userLogin");
        sesionesControl.unset("username");
    }
 
    return {
        //retornamos la funci�n login de la factoria authUsers para loguearnos correctamente
        login : function(user){
	    if(user.name == 'aaa'){
		cacheSession(user.name);
		return true;
	    }else{
		unCacheSession();
		return false;
	    }            
        },
        //funci�n para cerrar la sesi�n del usuario
        logout : function(){
        },
        //funci�n que comprueba si la sesi�n userLogin almacenada en sesionStorage existe
        isLoggedIn : function(){
            return sesionesControl.get("userLogin");
        }
    }
})


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


// login

var loginController = angular.module('loginControllers',[]);

loginController.controller('loginController',['$scope', '$modalInstance', '$location', 'sesionesControl', 'authUsers',function($scope, $modalInstance, $location, sesionesControl, authUsers){
   //-- Variables --//

    $scope.user = {name : ''};

    //-- Methods --//
		
    $scope.cancel = function(){
	$modalInstance.dismiss('Canceled');
    }; // end cancel
    
    $scope.save = function(){
	if(authUsers.login($scope.user)){ 
	    $modalInstance.close($scope.user.name);           
	    $scope.name = $scope.user.name;
        }else{
	    
	};
	
	//$modalInstance.close($scope.user.name);
    }; // end save
		
    $scope.hitEnter = function(evt){
	if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')))
	    $scope.save();
    };   
}]);


cuadernoApp.run(['$rootScope','$location','dialogs','$templateCache', function($rootScope, $location, dialogs, $templateCache){
//    $templateCache.put('/dialogs/custom.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="course">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div>');
    
    //var dlg = dialogs.create('/pages/dialogs/custom.html','loginController',{},{size:'lg',keyboard: true,backdrop: false,windowClass: 'my-class'});
    var dlg = dialogs.create('/pages/dialogs/custom.html','loginController',{},{size:'sm'});
    dlg.result.then(function(name){
	console.log(name);
    },function(){
	$location.path('/');
	//if(angular.equals($scope.name,''))
	//    console.log('error');
	    //$scope.name = 'You did not enter in your name!';
    });
}]);
