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
    'inscripcionesControllers',
    'uploadControllers',
]);

cuadernoApp.config(['$routeProvider','dialogsProvider',function($routeProvider,dialogsProvider) {
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');

    var _isNotMobile = (function() {
        var check = false;        
        (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);                
        return jQuery.browser.mobile;
    })();



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
        templateUrl : 'pages/desktop/unidadEducativa/list.html',
        controller  : 'unidadesEducativasController'
    })
    .when('/addUnidadEducativa', {
        templateUrl : 'pages/desktop/unidadEducativa/add.html',
        controller  : 'unidadEducativaController'
    })

    // Usuarios
    .when('/usuarios', {
	    templateUrl : 'pages/usuario/list.html',
	    controller  : 'usuariosController'
	})
	.when('/addUsuario', {
	    templateUrl : 'pages/usuario/addUnidadEducativa.html',
	    controller  : 'usuarioAdministraController'
	})

    // Aqui va la parte de de Gestion Administrativa de la Unidad Educativa
    //
    //     
    .when('/unidadEducativa', {
        templateUrl : (_isNotMobile )? 'pages/mobile/unidadEducativa/view.html':'pages/desktop/unidadEducativa/view.html',
        controller  : 'unidadEducativaViewController'
    }) 
    // Administrativos
    .when('/administrativos', {
        templateUrl : (_isNotMobile )? 'pages/mobile/administrativo/list.html':'pages/desktop/administrativo/list.html',
        controller  : 'administrativosController'
    })
    .when('/addAdministrativo', {
        templateUrl : 'pages/administrativo/add.html',
        controller  : 'administrativoController'
    })

    // Docentes
    .when('/docentes', {
        templateUrl : (_isNotMobile )? 'pages/mobile/docente/list.html':'pages/desktop/docente/list.html',
        controller  : 'docentesController'
    })
    .when('/addDocente', {
        templateUrl : 'pages/desktop/docente/add.html',
        controller  : 'docenteController'
    })

    // Cursos
    .when('/cursos', {
        templateUrl : (_isNotMobile )? 'pages/mobile/curso/list.html':'pages/desktop/curso/list.html',        
        controller  : 'cursosController'
    })    
    
    .when('/addCurso', {
        templateUrl : 'pages/desktop/curso/add.html',
        controller  : 'cursoController'
    })     

    .when('/assignCurso/:idCurso', {
        templateUrl : (_isNotMobile )? 'pages/mobile/curso/list.html':'pages/desktop/curso/assign.html',        
        controller  : 'assignCursoController'
    })

    // Inscripciones
    
    .when('/inscripciones',{
        templateUrl : (_isNotMobile )? 'pages/mobile/inscripcion/list.html':'pages/desktop/inscripcion/list.html',
        controller  : 'inscripcionCursoController'
    })
    .when('/inscribir/:idCurso',{
        templateUrl : 'pages/desktop/inscripcion/add.html',
        controller  : 'inscribirController'
    })
    .when('/listInscripciones/:idCurso',{
        templateUrl : (_isNotMobile )? 'pages/mobile/inscripcion/listInscripcion.html':'pages/desktop/inscripcion/listInscripcion.html',
        controller  : 'inscripcionListController'
    })
    
    .when('/addEstudiante', {
            templateUrl : 'pages/estudiante/add.html',
            controller  : 'estudianteController'
        })  

    // Configuracion
    
    .when('/configuracion',{
        templateUrl : (_isNotMobile )? 'pages/mobile/configuracion/init.html':'pages/desktop/configuracion/init.html',
        controller  : 'configuracionController'
    })
    // Usuarios
    .when('/usuariosUnidadEducativa', {
        templateUrl : 'pages/usuario/list.html',
        controller  : 'usuariosUnidadEducativaController'
    })
    .when('/addUsuarioUnidadEducativa', {
        templateUrl : 'pages/usuario/add.html',
        controller  : 'usuarioUnidadEducativaController'
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
            templateUrl : 'pages/desktop/filiacion/listCursos.html',
            controller  : 'cursosDocenteController'
        })
    .when('/filiacionEstudiantes/:curso_id', {
            templateUrl : 'pages/desktop/filiacion/listEstudiantes.html',
            controller  : 'filiacionController'
        })

    // Asistencia
    // 4.1 Filiacion
    .when('/asistencia', {
            templateUrl : 'pages/desktop/asistencia/listCursos.html',
            controller  : 'cursosDocenteController'
        })
    .when('/asistenciaAsignatura/:id', {
            templateUrl : 'pages/desktop/asistencia/listAsignatura.html',
            controller  : 'cursosDocenteAsignaturaController'
        })
    .when('/registroAsistencia/:asignado_id/:curso_id', {
            templateUrl : 'pages/desktop/asistencia/registroAsistencia.html',
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

cuadernoAppServices.factory('UsuariosListFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&user_id=:user_id', {}, {
        query: { method: 'GET', params: {query_id : '@query_id', user_id: '@user_id'}, isArray: false},
    })    
});

cuadernoAppServices.factory('DocentesUsuarioFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&carnet=:carnet&user_id=:user_id', {}, {
        query: { method: 'GET', params: {query_id : '@query_id', carnet : '@carnet', user_id: '@user_id'}, isArray: false},
    })    
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
// query_id  134 Unidades Educativas Oficial
cuadernoAppServices.factory('UnidadesEducativasOficialFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&unidad_educativa_id=:unidad_educativa_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', unidad_educativa_id: '@unidad_educativa_id'}, isArray: false},        
    })
});

cuadernoAppServices.factory('UnidadesEducativasFactory', function ($resource) {
    return $resource('/index.php/unidadeseducativas.json', {}, {
        query: { method: 'GET', isArray: false},
        create: { method: 'POST' }
    })
});

// Acciones de la Unidad Educativa
// Eliminar
cuadernoAppServices.factory('UnidadEducativaFactory', function ($resource) {
    return $resource('/index.php/unidadeseducativas/:id.json?accion=:action', {}, {        
        delete: { method: 'GET', params: {id: '@id', action: 'delete'} }
    })
});

// Listado de Unidades Educativas habilitadas para el usuario que Administra
// // query_id  113
cuadernoAppServices.factory('UnidadesEducativasUsuarioFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&user_id=:user_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', user_id: '@user_id'}, isArray: false},
        create: { method: 'POST' }
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
    return $resource('/index.php/consultas.json?query_id=:query_id&habilitado=:habilitado&user_id=:user_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', habilitado: '@habilitado', user_id: '@user_id'}, isArray: false},        
    });
});

// Cursos - Añadir curso 
cuadernoAppServices.factory('CursosFactory', function ($resource) {
    return $resource('/index.php/cursos.json', {}, {        
        create: { method: 'POST' }
    });
});

// Informacion Detalle del Curos
cuadernoAppServices.factory('CursoViewFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&curso_id=:curso_id', {}, {        
        query: { method: 'GET', params: {query_id: '@query_id', curso_id: '@curso_id'}, isArray: false},
    });
});

// Busqueda de Cursos 
// query_id = 131
cuadernoAppServices.factory('CursosDocenteFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&docente_id=:docente_id&gestion_id=:gestion_id', {}, {
        query: { method: 'GET', params:{query_id: '@query_id', docente_id: '@docente_id', gestion_id: '@gestion_id'}, isArray: false}        
    });
});


// Asignaturas asignadas al docente en un curso
// query_id = 132
cuadernoAppServices.factory('CursosDocenteAsignaturaFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&docente_id=:docente_id&curso_id=:curso_id', {}, {
        query: { method: 'GET', params:{query_id: '@query_id', docente_id: '@docente_id', curso_id: '@curso_id'}, isArray: false}        
    });
});

cuadernoAppServices.factory('CursoFactory', function ($resource) {
    return $resource('/index.php/cursos/:id.json?accion=:action', {}, {
        //show: { method: 'GET' },
        view: { method: 'GET', params: {id: '@id', action: 'view'} },
        delete: { method: 'GET', params: {id: '@id', action: 'delete'} }
    })
});

// Asignaturfas
// Similar al de CursoView
// Query 129 
// Query 130 Selecciona Asignatura y Docentes

cuadernoAppServices.factory('AsignaturasCursoFactory', function ($resource) {
    return $resource('/index.php/consultas.json?query_id=:query_id&curso_id=:curso_id', {}, {        
        query: { method: 'GET', params: {query_id: '@query_id', curso_id: '@curso_id'}, isArray: false},
    });
});

cuadernoAppServices.factory('AsignarFactory', function ($resource) {
    return $resource('/index.php/asignados.json', {}, {
        create: { method: 'POST'}    
    });
});

cuadernoAppServices.factory('ActionAsignarFactory', function ($resource) {
    return $resource('/index.php/asignados/:id.json?accion=:action', {}, {
        delete: { method: 'GET', params: {id: '@id', action: 'delete'} }    
    });
});

// InscripcionFactory
// Devuelve las inscripciones realizadas en un Curso
cuadernoAppServices.factory('InscripcionFactory', function ($resource) {
    return $resource('/index.php/inscripciones.json', {}, {
        create: { method: 'POST'}        
    });
});

cuadernoAppServices.factory('InscripcionListFactory', function ($resource) {
   return $resource('/index.php/consultas.json?query_id=:query_id&curso_id=:curso_id', {}, {
        query: { method: 'GET', params: {query_id: '@query_id', curso_id: '@curso_id'}, isArray: false}
    });
});

cuadernoAppServices.factory('InscripcionActionFactory', function ($resource) {
    return $resource('/index.php/inscripciones/:id.json?accion=:action', {}, {
        //show: { method: 'GET' },
        view: { method: 'GET', params: {id: '@id', action: 'view'} },
        delete: { method: 'GET', params: {id: '@id', action: 'delete'} }
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
       sesionesControl.set("gestion", '2015');
    }
    var unCacheSession = function(){
       sesionesControl.unset("userLogin");
       sesionesControl.unset("username");
	   sesionesControl.unset("user_id");
       sesionesControl.unset("gestion");
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


loginController.controller('initController',['$rootScope', '$scope','sesionesControl','dialogs','$location','$window','MenusFactory',function($rootScope, $scope,sesionesControl,dialogs,$location, $window, MenusFactory){
    $scope.username = '';
    $scope.menus = [];    
    if(!sesionesControl.get('userLogin') || (sesionesControl.get('userLogin') == 'false')){
	   /*var dlg = dialogs.create('/pages/dialogs/custom.html','loginController',{},{size:'sm'});
	   dlg.result.then(function(name){                    
            $scope.username = name;
            $location.apply();
            /*MenusFactory.query({query_id: 110, user_id: sesionesControl.get('user_id')},
            function(data){
                $scope.menus = data.datos;
            });
            //$rootScope.$broadcast('evento', $scope.menus);
	   });*/
       //$window.location.href = 'http://bienaventuranza.example.com/';
    }
    else{
        $scope.username = sesionesControl.get('username');
        MenusFactory.query({query_id: 110, user_id: sesionesControl.get('user_id')},
            function(data){
                $scope.menus = data.datos;
            });
    }
}]);

loginController.controller('logoutController',['$rootScope', '$scope','sesionesControl','dialogs','$location','$window','MenusFactory',function($rootScope, $scope,sesionesControl,dialogs,$location, $window, MenusFactory){
    sesionesControl.unset("userLogin");
    sesionesControl.unset("username");
    sesionesControl.unset("user_id");
    $window.location.href = 'http://104.236.71.163';      
    //$window.location.href = 'http://bienaventuranza.example.com/';      
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


cuadernoApp.run(['$rootScope','$location','dialogs','$window','sesionesControl', function($rootScope, $location, dialogs, $window, sesionesControl){    
//    $templateCache.put('/dialogs/custom.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="course">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div>');
    if(!sesionesControl.get('userLogin') || (sesionesControl.get('userLogin') == 'false')){
        var dlg = dialogs.create('/pages/dialogs/custom.html','loginController',{},{size:'sm'});
            dlg.result.then(function(name){                                            
            $window.location.reload();            
       });
    }
}]);
