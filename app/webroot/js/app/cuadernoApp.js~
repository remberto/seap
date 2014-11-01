var cuadernoApp = angular.module('cuadernoApp', ['ui.bootstrap',
						 'ngRoute',
                                                 'cuadernoAppServices',
						 'unidadEducativaControllers',
                                                 'estudiantesControllers',
                                                 'docentesControllers',
						 'usuariosControllers',
						 'cursosControllers']);

var cuadernoAppServices = angular.module('cuadernoAppServices', ['ngResource']);
var estudiantesController = angular.module('estudiantesControllers',[]);



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
    return $resource('/index.php/estudiantes/:id.json', {}, {
        //show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'GET', params: {id: '@id'} }
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
    })
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

/*cuadernoAppServices.factory('DocenteFactory', function ($resource) {
    return $resource('/index.php/docentes/:id.json', {}, {
        //show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'GET', params: {id: '@id'} }
    })
});*/

/*cuadernoApp.service('dataService', function($resource) {
delete $resource.defaults.headers.common['X-Requested-With'];
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
});*/

cuadernoApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'main.html',
				controller  : 'mainController'
			})
            .when('/home', {
                templateUrl : 'pages/index.html',
                controller  : 'homeController'
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
		templateUrl : 'usuario/list.html',
		controller  : 'usuariosController'
	    })
	    .when('/addUsuario', {
		templateUrl : 'usuario/add.html',
		controller  : 'usuarioController'
	    })
            .when('/filiacion', {
                templateUrl : 'estudiante/list.html',
                controller  : 'estudiantesController'
            })
	    .when('/addEstudiante', {
                templateUrl : 'estudiante/add.html',
                controller  : 'estudianteController'
            })
	    .when('/cursos', {
                templateUrl : 'curso/list.html',
                controller  : 'cursosController'
            })
	    .when('/addCurso', {
                templateUrl : 'curso/add.html',
                controller  : 'cursoController'
            })     
	    .when('/unidadeseducativas', {
		      templateUrl : 'unidadEducativa/list.html',
		      controller  : 'unidadesEducativasController'
	        })
	    .when('/addUnidadEducativa', {
		      templateUrl : 'unidadEducativa/add.html',
		      controller  : 'unidadEducativaController'
	        })
        .when('/docentes', {
                templateUrl : 'docente/list.html',
                controller  : 'docentesController'
        })
        .when('/addDocente', {
                templateUrl : 'docente/add.html',
                controller  : 'docentesController'
        })
	});

cuadernoApp.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

estudiantesController.controller('estudiantesController', ['$scope','EstudiantesFactory','EstudianteFactory','$location', function($scope, EstudiantesFactory, EstudianteFactory, $location) {
    $scope.estudiantes = null;

    $scope.addEstudiante = function(){
	   $location.path('/addEstudiante');
    };

    $scope.deleteEstudiante = function(estudianteId){
	   EstudianteFactory.delete({id: estudianteId});
	   EstudiantesFactory.query(function(data){$scope.estudiantes = data.estudiantes;});
    };
    
    EstudiantesFactory.query(function(data){$scope.estudiantes = data.estudiantes;});
}]);

estudiantesController.controller('estudianteController', ['$scope','EstudiantesFactory','$location', function($scope, EstudiantesFactory, $location) {

    $scope.newEstudiante = function(){
        EstudiantesFactory.create($scope.estudiante);
        $location.path('/filiacion');
    };
}]);
