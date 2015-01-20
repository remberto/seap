INSERT INTO consultas(id, query, titulo, descripcion) VALUES (125,
'SELECT cursos.id as id, cursos.gestion_id as gestion_id, 
gestiones.gestion as gestion, 
cursos.unidad_educativa_id as unidad_educativa_id, 
unidades_educativas.descripcion as unidad_educativa, 
niveles.descripcion as nivel, 
grados.descripcion as grado, 
turnos.descripcion as turno, 
paralelos.descripcion as paralelo,
cursos.cupo as cupo,
COUNT(personas.genero) AS numero_estudiantes,
SUM(CASE WHEN personas.genero = ''M'' THEN 1 ELSE 0 END) numero_masculino,
SUM(CASE WHEN personas.genero = ''F'' THEN 1 ELSE 0 END) numero_femenino
FROM cursos
INNER JOIN inscritos ON inscritos.curso_id = cursos.id
INNER JOIN estudiantes ON estudiantes.id = inscritos.estudiante_id
INNER JOIN personas ON personas.id = estudiantes.id 
INNER JOIN gestiones ON cursos.gestion_id = gestiones.id
INNER JOIN unidades_educativas ON cursos.unidad_educativa_id = unidades_educativas.id
INNER JOIN grados ON cursos.grado_id = grados.id
INNER JOIN niveles ON grados.nivel_id = niveles.id
INNER JOIN paralelos ON cursos.paralelo_id = paralelos.id
INNER JOIN turnos ON cursos.turno_id = turnos.id
INNER JOIN administra ON administra.unidad_educativa_id = unidades_educativas.id
AND gestiones.habilitado = :habilitado
AND administra.user_id = :user_id
GROUP BY cursos.id, 
cursos.gestion_id, 
gestiones.gestion, 
cursos.unidad_educativa_id, 
unidades_educativas.descripcion, 
niveles.id,
niveles.descripcion,
grados.id, 
grados.descripcion, 
turnos.id,
turnos.descripcion, 
paralelos.id,
paralelos.descripcion
ORDER BY niveles.id, grados.id, paralelos.id, turnos.id', 'Cursos', 'Lista de Cursos con Informacion detalle');

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (125,'habilitado',125, 1, 'int', 'Habilitado', 1, 1),
(126,'user_id',125, 2, 'str', 'Usuario', 1, 1);

INSERT INTO consultas(id, query, titulo, descripcion) VALUES (126,
'SELECT cursos.id as id, cursos.gestion_id as gestion_id, 
gestiones.gestion as gestion, 
cursos.unidad_educativa_id as unidad_educativa_id, 
unidades_educativas.descripcion as unidad_educativa, 
niveles.descripcion as nivel, 
grados.descripcion as grado, 
turnos.descripcion as turno, 
paralelos.descripcion as paralelo 
FROM cursos
INNER JOIN gestiones ON cursos.gestion_id = gestiones.id
INNER JOIN unidades_educativas ON cursos.unidad_educativa_id = unidades_educativas.id
INNER JOIN grados ON cursos.grado_id = grados.id
INNER JOIN niveles ON grados.nivel_id = niveles.id
INNER JOIN paralelos ON cursos.paralelo_id = paralelos.id
INNER JOIN turnos ON cursos.turno_id = turnos.id
WHERE cursos.id = :curso_id', 'Curso', 'Detalle de Curso');

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (127,'curso_id',126, 1, 'str', 'Curso', 1, 1);


CREATE TABLE apoderados(
id char(36),
estudiante_id char(36),
persona_id char(36),
carnet_identidad varchar(10),
parentesco smallint,
CONSTRAINT apoderado_pkey PRIMARY KEY (id),
CONSTRAINT estudiante_fkey FOREIGN KEY (estudiante_id) REFERENCES estudiantes (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT apoderado_fkey FOREIGN KEY (persona_id) REFERENCES personas (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);
