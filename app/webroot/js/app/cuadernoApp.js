var cuadernoApp = angular.module('cuadernoApp', [
    'ui.bootstrap',
    'dialogs.main',
    'angularFileUpload',
    'ngRoute',
    'angularSpinner',
    'cuadernoAppServices',
    'loginControllers',
    'menuControllers',
    'unidadEducativaControllers',
    'estudiantesControllers',
    'planificacionControllers',
    'filiacionControllers',
    'asistenciaControllers',
    'evaluacionControllers',
    'administrativosControllers',
    'docentesControllers',
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
	    controller  : 'initController'
	})
    .when('/home', {
        templateUrl : 'pages/home.html',
        //controller  : 'homeController'
    })
    .when('/logout', {
        templateUrl : 'pages/main.html',
        controller  : 'logoutController'
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
    
    // Aqui parte de Administracion de la Aplicacion
    // Unidades Educativas
    .when('/UnidadesEducativas', {
        templateUrl : 'pages/unidadEducativa/list.html',
        controller  : 'unidadesEducativasController'
    })

    // Usuarios
    .when('/usuarios', {
	    templateUrl : 'pages/usuario/list.html',
	    controller  : 'usuariosController'
	})
	.when('/addUsuario', {
	    templateUrl : 'pages/usuario/add.html',
	    controller  : 'usuarioController'
	})

    // Aqui va la parte de de Gestion Administrativa de la Unidad Educativa
    //
    //     
    .when('/unidadEducativa', {
        templateUrl : 'pages/unidadEducativa/view.html',
        controller  : 'unidadEducativaViewController'
    }) 
    // Administrativos
    .when('/administrativos', {
        templateUrl : 'pages/administrativo/list.html',
        controller  : 'administrativosController'
    })
    .when('/addAdministrativo', {
        templateUrl : 'pages/administrativo/add.html',
        controller  : 'administrativoController'
    })

    // Docentes
    .when('/docentes', {
        templateUrl : 'pages/docente/list.html',
        controller  : 'docentesController'
    })
    .when('/addDocente', {
        templateUrl : 'pages/docente/add.html',
        controller  : 'docenteController'
    })

    .when('/cursos', {
        templateUrl : 'pages/curso/list.html',
        controller  : 'cursosController'
    })
    .when('/addCurso', {
        templateUrl : 'pages/curso/add.html',
        controller  : 'cursoController'
    })

    .when('/cursos', {
        templateUrl : 'pages/curso/list.html',
        controller  : 'cursosController'
    })
    .when('/addCurso', {
        templateUrl : 'pages/curso/add.html',
        controller  : 'cursoController'
    })     

    .when('/addEstudiante', {
            templateUrl : 'pages/estudiante/add.html',
            controller  : 'estudianteController'
        })  

    

    
    // Aqui va la parte de Asistencia y Evaluacion de parte del Docente
    // Planificacion
    .when('/menuPlanificacion', {
            templateUrl : 'pages/planificacion/index.html',
            controller  : 'planificacionController'
        })
	.when('/listPlanificacion/:id',{
	    templateUrl : 'pages/planificacion/list.html',
	    controller : 'planificacionController'
	})
    // 2.1 PLanificacion Anual
    .when('/planificacionAnual/:curso_id', {
            templateUrl : 'pages/planificacionAnual/index.html',
            controller  : 'planificacionAnualController'
        })
    .when('/planificacionBimestral/:curso_id', {
            templateUrl : 'pages/planificacionBimestral/index.html',
            controller  : 'planificacionBimestralController'
        })
    .when('/planificacionClases/:id', {
            templateUrl : 'pages/planificacionClases/listAsignatura.html',
            controller  : 'cursosDocenteAsignaturaController'
        })
    .when('/planificacionClasesAsignatura/:asignado_id/:curso_id', {
            templateUrl : 'pages/planificacionClases/listClases.html',
            controller  : 'planificacionClasesController'
        })
    .when('/newPlanificacionClases/:asignado_id/:curso_id', {
            templateUrl : 'pages/planificacionClases/add.html',
            controller  : 'addplanificacionClasesController'
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

	    
	.when('/unidadeseducativas', {
	    templateUrl : 'pages/unidadEducativa/list.html',
	    controller  : 'unidadesEducativasController'
	})
	.when('/addUnidadEducativa', {
	    templateUrl : 'pages/unidadEducativa/add.html',
	    controller  : 'unidadEducativaController'
	})
    
	.when('/upload', {
            templateUrl : 'pages/file/add.html',
            controller  : 'uploadController'
        })
}]);

// Factory conneccion

var cuadernoAppServices = angular.module('cuadernoAppServices', ['ngResource']);

// Menu
// Devuelve los menus del uysuario

cuadernoAppServices.factory('MenusFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&user_id=:user_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', user_id: '@user_id'}, isArray: false},        
    })
});


// Clasificadores para Campos
// Consulta a Parametros
cuadernoAppServices.factory('ClasificadorFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id'}, isArray: false},        
    })
});

// Encabezado
cuadernoAppServices.factory('EncabezadoFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&curso_id=:curso_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', curso_id: '@curso_id'}, isArray: false},        
    })
});

// Encabezado de Planificacion de Clases
cuadernoAppServices.factory('EncabezadoClasesFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&curso_id=:curso_id&asignado_id=:asignado_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', curso_id: '@curso_id', asignado_id: '@asignado_id'}, isArray: false},        
    })
});

// Areas de acuerdo a campo
cuadernoAppServices.factory('ClasificadorAreasFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&campo_id=:campo_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', campo_id: '@campo_id'}, isArray: false},        
    })
});

// Planificacion Detalle Anual
cuadernoAppServices.factory('ClasificadorPlanificacionFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&planificacion_id=:planificacion_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', planificacion_id: '@planificacion_id'}, isArray: false},        
    })
});

// Planificacion Bimiestral
cuadernoAppServices.factory('ClasificadorPlanificacionBimestralFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&periodo_id=:periodo_id&planificacion_id=:planificacion_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', periodo_id: '@periodo_id', planificacion_id: '@planificacion_id'}, isArray: false},        
    })
});

// Objetivos Holistico
cuadernoAppServices.factory('ObjetivosHolisticosFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&asignado_id=:asignado_id&periodo_id=:periodo_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', asignado_id: '@asignado_id', periodo_id: '@periodo_id'}, isArray: false},        
    })
});

// Criterios Evaluacion
cuadernoAppServices.factory('CriteriosEvaluacionFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&dimension_id=:dimension_id&planificacion_clases_id=:planificacion_clases_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', dimension_id: '@dimension_id', planificacion_clases_id: '@planificacion_clases_id'}, isArray: false},        
    })
}); 

// Recupera el contenido de la planificacion detalle anual

cuadernoAppServices.factory('ContenidoPlanificacionAnualFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&area_id=:area_id&periodo_id=:periodo_id&planificacion_id=:planificacion_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', area_id: '@area_id', periodo_id: '@periodo_id', planificacion_id: '@planificacion_id'}, isArray: false},        
    })
});


// Planificacion Clases - Lista de Planificacion de Clases
cuadernoAppServices.factory('ClasificadorPlanificacionClasesFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&asignado_id=:asignado_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', asignado_id: '@asignado_id'}, isArray: false},        
    })
});

cuadernoAppServices.factory('ClasificadorPlanificacionNroClaseFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&nro_clase=:nro_clase&periodo_id=:periodo_id&asignado_id=:asignado_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', nro_clase: '@nro_clase', periodo_id: '@periodo_id', asignado_id: '@asignado_id'}, isArray: false},        
    })
});

// Planificacion

cuadernoAppServices.factory('PlanificacionAnualFactory', function ($resource) {
    return $resource('/index.php/planificacion_anual.json', {}, {
        create: { method: 'POST' }
    })
}); 

cuadernoAppServices.factory('PlanificacionAnualDetalleFactory', function ($resource) {
    return $resource('/index.php/planificacion_anual_detalle.json', {}, {
        create: { method: 'POST' }
    })
});

cuadernoAppServices.factory('PlanificacionAnualDetallesFactory', function ($resource) {
    return $resource('/index.php/planificacion_anual_detalle/:id.json?accion=:action', {}, {
        //show: { method: 'GET' },
        view: { method: 'GET', params: {id: '@id', action: 'view'} },
        delete: { method: 'GET', params: {id: '@id', action: 'delete'} }
    })
});


// Planificacion Bimiestral
cuadernoAppServices.factory('PlanificacionBimestralFactory', function ($resource) {
    return $resource('/index.php/planificacion_bimestral.json', {}, {
        create: { method: 'POST' }
    })
}); 
 
// Planificacion Bimiestral Detalle
cuadernoAppServices.factory('PlanificacionBimestralDetalleFactory', function ($resource) {
    return $resource('/index.php/planificacion_bimestral_detalle.json', {}, {
        create: { method: 'POST' }
    })
}); 

// Planificacion Clase
cuadernoAppServices.factory('PlanificacionClaseFactory', function ($resource) {
    return $resource('/index.php/planificacion_clases.json', {}, {
        create: { method: 'POST' }
    })
}); 

// Planificacion Clase
cuadernoAppServices.factory('PlanificacionClaseDetalleFactory', function ($resource) {
    return $resource('/index.php/planificacion_clases_detalle.json', {}, {
        create: { method: 'POST' }
    })
});

// Planificacion Bimiestral Detalle Vista y eliminar
cuadernoAppServices.factory('PlanificacionBimestralDetallesFactory', function ($resource) {
    return $resource('/index.php/planificacion_bimestral_detalle/:id.json?accion=:action', {}, {
        //show: { method: 'GET' },
        view: { method: 'GET', params: {id: '@id', action: 'view'} },
        delete: { method: 'GET', params: {id: '@id', action: 'delete'} }
    })
}); 

// Estudiantes
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
    return $resource('/index.php/consultas.json?query_id=112&habilitado=:habilitado', {}, {
        query: { method: 'GET', params: {habilitado: '@habilitado'}, isArray: false},
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

// Listado de Unidades Educativas habilitadas para el usuario que Administra
cuadernoAppServices.factory('UnidadesEducativasUsuarioFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&user_id=:user_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', user_id: '@user_id'}, isArray: false},
        create: { method: 'POST' }
    })
});

cuadernoAppServices.factory('UnidadEducativaFactory', function ($resource) {
    return $resource('/index.php/unidadeseducativas/:id.json', {}, {
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'GET', params: {id: '@id'} }
    })
});

// Administrativos
cuadernoAppServices.factory('AdministrativosFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&user_id=:user_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', user_id: '@user_id'}, isArray: false}
    });
});

// Guarda nuevo administrativo
cuadernoAppServices.factory('AdministrativoFactory', function ($resource) {
    return $resource('/index.php/administrativos.json', {}, {
        create: { method: 'POST' }
    });
});

cuadernoAppServices.factory('ActionAdministrativoFactory', function ($resource) {
    return $resource('/index.php/administrativos/:id.json?accion=:action', {}, {
        //show: { method: 'GET' },
        view: { method: 'GET', params: {id: '@id', action: 'view'} },
        delete: { method: 'GET', params: {id: '@id', action: 'delete'} }
    })
});

// Docentes
cuadernoAppServices.factory('DocentesFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&user_id=:user_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', user_id: '@user_id'}, isArray: false}
    });
});
// Guarda Docente
cuadernoAppServices.factory('DocenteFactory', function ($resource) {
    return $resource('/index.php/docentes.json', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })
});
// 
cuadernoAppServices.factory('ActionDocenteFactory', function ($resource) {
    return $resource('/index.php/docentes/:id.json?accion=:action', {}, {
        //show: { method: 'GET' },
        view: { method: 'GET', params: {id: '@id', action: 'view'} },
        delete: { method: 'GET', params: {id: '@id', action: 'delete'} }
    })
});


// Cargo de Administrativos
cuadernoAppServices.factory('CargoAdministrativoFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=120', {}, {
        query: { method: 'GET', isArray: false}
    });
});

// Fuente de Financiamiento
cuadernoAppServices.factory('FinanciamientoFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=121', {}, {
        query: { method: 'GET', isArray: false}
    });
});

// Formacion
cuadernoAppServices.factory('FormacionFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=122', {}, {
        query: { method: 'GET', isArray: false}
    });
});

// Cursos
cuadernoAppServices.factory('CursosListFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=111&habilitado=:habilitado&user_id=:user_id', {}, {
        query: { method: 'GET', params: {habilitado: '@habilitado', user_id: '@user_id'}, isArray: false},
        create: { method: 'POST' }
    });
});

// Cursos - A�adir curso 
cuadernoAppServices.factory('CursosFactory', function ($resource) {
    return $resource('/index.php/cursos.json', {}, {        
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

// Niveles de acuerdo a la Unidad Educativa
// 

cuadernoAppServices.factory('NivelesUnidadEducativaFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=114&unidad_educativa_id=:unidad_educativa_id', {}, {
        query: { method: 'GET', params: {unidad_educativa_id: '@unidad_educativa_id'}, isArray: false},
    })
});


// Grados
cuadernoAppServices.factory('GradosFactory', function ($resource) {
    return $resource('/index.php/grados.json?nivel_id=:nivel_id', {}, {
        query: { method: 'GET', params: {nivel_id: '@nivel_id'} ,isArray: false},
    })
});

// Grados de acuerdo al nivel
cuadernoAppServices.factory('GradosNivelFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=115&nivel_id=:nivel_id', {}, {
        query: { method: 'GET', params: {nivel_id: '@nivel_id'} ,isArray: false},
    })
});

// Paralelos
cuadernoAppServices.factory('ParalelosFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=116', {}, {
        query: { method: 'GET', isArray: false},
    })
});

// Turnos
cuadernoAppServices.factory('TurnosFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=117', {}, {
        query: { method: 'GET', isArray: false},
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

// InscritosEvaluacionFactory
// Devuelve las inscripciones para la evaluacion
cuadernoAppServices.factory('InscritosEvaluacionFactory', function ($resource) {
    return $resource('/index.php/evaluaciones.json?curso_id=:curso_id', {}, {
        query: { method: 'GET', params:{curso_id: '@curso_id'}, isArray: false}
    });
});

// login

var loginController = angular.module('loginControllers',[]);

loginController.controller('loginController',['$scope', '$modalInstance', '$location', 'sesionesControl', 'authUsers', 'usSpinnerService', function($scope, $modalInstance, $location, sesionesControl, authUsers, usSpinnerService){
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
        usSpinnerService.spin('spinner-1');
	    authUsers.login({username: $scope.user.username, password: $scope.user.password},
			function(data){
                usSpinnerService.stop('spinner-1');
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


loginController.controller('initController',['$rootScope', '$scope','sesionesControl','dialogs','$location','MenusFactory',function($rootScope, $scope,sesionesControl,dialogs,$location, MenusFactory){
    $scope.username = '';
    $scope.menus = [];
    console.log($scope.menus);
    if(!sesionesControl.get('userLogin') || (sesionesControl.get('userLogin') == 'false')){
	   var dlg = dialogs.create('/pages/dialogs/custom.html','loginController',{},{size:'sm'});
	   dlg.result.then(function(name){        
            $scope.username = name;
            MenusFactory.query({query_id: 110, user_id: sesionesControl.get('user_id')},
            function(data){
                $scope.menus = data.datos;
            });           
            //$rootScope.$broadcast('evento', $scope.menus);
	   },function(){
	       $location.path('/');           
	       //if(angular.equals($scope.name,''))
	       //    console.log('error');
	       //$scope.name = 'You did not enter in your name!';
	   });
    }
    else{
        $scope.username = sesionesControl.get('username');
        MenusFactory.query({query_id: 110, user_id: sesionesControl.get('user_id')},
            function(data){
                $scope.menus = data.datos;
            });
    }
}]);

loginController.controller('logoutController',['$rootScope', '$scope','sesionesControl','dialogs','$location','MenusFactory',function($rootScope, $scope,sesionesControl,dialogs,$location, MenusFactory){
    sesionesControl.unset("userLogin");
    sesionesControl.unset("username");
    sesionesControl.unset("user_id");
    $location.path('/');    
}]);

var menuController = angular.module('menuControllers',[]);

menuController.controller('menuController',['$rootScope','$scope','sesionesControl','$location','MenusFactory', function($rootScope, $scope, sesionesControl,$location, MenusFactory){    
    
    /*$rootScope.$on('evento', function(event, data){ 
            $scope.menus = data;
    });*/

    MenusFactory.query({query_id: 110, user_id: sesionesControl.get('user_id')},
    function(data){
        $scope.menus = data.datos;
    });     

    $scope.selectMenu = function(url){        
        $location.path(url);
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
