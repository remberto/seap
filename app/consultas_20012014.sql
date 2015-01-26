UPDATE consultas SET query = 'SELECT 
inscritos.id as id, 
estudiantes.carnet_identidad as carnet, 
estudiantes.codigo_rude as codigo_rude,
personas.paterno as paterno,
personas.materno as materno,
personas.nombres as nombres,
personas.fecha_nacimiento as fecha_nacimiento,
personas.genero as genero
FROM inscritos
INNER JOIN estudiantes
ON inscritos.estudiante_id = estudiantes.id
INNER JOIN personas
ON personas.id = estudiantes.id
WHERE inscritos.curso_id = :curso_id;'
WHERE id = 124

SELECT * FROM menus;

INSERT INTO menus (id, menus, rol_id, url, icono, orden)
VALUES ('10', 'Configuracion', '2', '/configuracion', 'fa fa-cog', 7); 

INSERT INTO consultas(id, query, titulo, descripcion) VALUES (127,'SELECT personas.id, users.username, personas.paterno, personas.materno, personas.nombres FROM personas
INNER JOIN users ON users.id = personas.id
INNER JOIN administra ON users.id = administra.user_id
WHERE administra.unidad_educativa_id in (
SELECT unidad_educativa_id FROM administra WHERE user_id = :user_id);', 'Usuarios', 'Usuarios de la Unidad Educativa');

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (128,'user_id',127, 1, 'str', 'Usuario', 1, 1);


INSERT INTO consultas(id, query, titulo, descripcion) VALUES (128, 'SELECT personas.id as id, 
docentes.carnet as carnet, 
personas.paterno as paterno, 
personas.materno as materno, personas.nombres as nombres, personas.fecha_nacimiento as fecha_nacimiento, personas.genero as genero,
unidades_educativas.id as unidad_educativa FROM personas
INNER JOIN docentes ON docentes.id = personas.id
INNER JOIN docente_ue ON docente_ue.docente_id = docentes.id 
INNER JOIN unidades_educativas ON docente_ue.unidad_educativa_id = unidades_educativas.id
INNER JOIN administra ON unidades_educativas.id = administra.unidad_educativa_id
WHERE docentes.carnet = :carnet
AND administra.user_id = :user_id','Docentes','Docentes Asignados a Usuario');

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (129,'carnet',128, 1, 'str', 'Carnet', 1, 1),
(130,'user_id',128, 1, 'str', 'Usuario', 1, 1);


INSERT INTO consultas(id, query, titulo, descripcion) VALUES (129,'SELECT asignaturas.id, asignaturas.descripcion FROM asignaturas
INNER JOIN niveles ON asignaturas.nivel_id = niveles.id
INNER JOIN grados ON grados.nivel_id = niveles.id
INNER JOIN cursos ON cursos.grado_id = grados.id
WHERE cursos.id = :curso_id', 'Asignaturas', 'Asignaturas de acuerdo a id de curso');

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (131,'curso_id',129, 1, 'str', 'Curso', 1, 1);

SELECT * FROM users;

SELECT * FROM roles


ALTER TABLE asignados DROP CONSTRAINT asignados_docente_id_fkey;
ALTER TABLE asignados ADD CONSTRAINT asignados_docente_id_fkey FOREIGN KEY (docente_id) REFERENCES docente_ue(id) ON DELETE NO ACTION ON UPDATE NO ACTION;


INSERT INTO consultas(id, query, titulo, descripcion) VALUES (130, 'SELECT asignados.id, asignaturas.descripcion, personas.paterno, personas.materno, personas.nombres FROM asignados
INNER JOIN docente_ue ON docente_ue.id = asignados.docente_id
INNER JOIN docentes ON docente_ue.docente_id = docentes.id
INNER JOIN personas ON personas.id = docentes.id
INNER JOIN asignaturas ON asignaturas.id = asignados.asignatura_id
WHERE asignados.curso_id = :curso_id', 'Asignados', 'Asignatura y Docentes');

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (132,'curso_id',130, 1, 'str', 'Curso', 1, 1);

INSERT INTO menus (id, menus, rol_id, url, icono, orden) VALUES
(11, 'Horario', 3, '/horario', 'fa fa-calendar', 2),
(12, 'Filiación', 3, '/filiacion', 'fa fa-book', 2),
(13, 'Asistencia', 3, '/asistencia', 'fa fa-check-square-o', 2),
(14, 'Evaluación', 3, '/evaluacion', 'fa fa-edit', 2),
(15, 'Reportes', 3, '/reportes', 'fa fa-dashboard', 2);

INSERT INTO consultas(id, query, titulo, descripcion) VALUES (131, 'SELECT DISTINCT cursos.id as id,
niveles.descripcion as nivel,
grados.descripcion as grado,
paralelos.descripcion as paralelo,
turnos.descripcion AS turno
FROM cursos
INNER JOIN asignados ON cursos.id = asignados.curso_id
INNER JOIN docente_ue ON docente_ue.id = asignados.docente_id
INNER JOIN grados ON grados.id = cursos.grado_id
INNER JOIN niveles ON niveles.id = grados.nivel_id
INNER JOIN paralelos ON cursos.paralelo_id = paralelos.id
INNER JOIN turnos ON cursos.turno_id = turnos.id
WHERE docente_ue.docente_id = :docente_id
AND cursos.gestion_id = :gestion_id', 'Cursos', 'Selecciona cursos del docente');

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (133,'docente_id',131, 1, 'str', 'Docente', 1, 1);

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (134,'gestion_id',131, 2, 'int', 'Gestion', 1, 1);

ALTER TABLE asignados ADD CONSTRAINT asignados_ukey UNIQUE (docente_id, curso_id, asignatura_id);

INSERT INTO consultas(id, query, titulo, descripcion) VALUES (132, 'SELECT asignados.id as id,
asignaturas.descripcion as asignatura
FROM  asignados 
INNER JOIN asignaturas ON asignaturas.id = asignados.asignatura_id
INNER JOIN docente_ue ON docente_ue.id = asignados.docente_id
WHERE docente_ue.docente_id = :docente_id
AND asignados.curso_id = :curso_id','Asignaturas', 'Asignaturas Asignadas al Docente');

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (135,'docente_id',132, 1, 'str', 'Docente', 1, 1),
(136,'curso_id',132, 2, 'str', 'Curso', 1, 1);