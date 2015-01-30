UPDATE consultas SET query = 'SELECT cursos.id as id, cursos.gestion_id as gestion_id, 
gestiones.gestion as gestion, 
cursos.unidad_educativa_id as unidad_educativa_id, 
unidades_educativas.descripcion as unidad_educativa, 
niveles.descripcion as nivel, 
grados.descripcion as grado, 
turnos.descripcion as turno, 
paralelos.descripcion as paralelo,
cursos.cupo as cupo, COUNT(personas.genero) AS numero_estudiantes,
SUM(CASE WHEN personas.genero = ''M'' THEN 1 ELSE 0 END) numero_masculino,
SUM(CASE WHEN personas.genero = ''F'' THEN 1 ELSE 0 END) numero_femenino
FROM cursos
LEFT JOIN inscritos ON inscritos.curso_id = cursos.id
LEFT JOIN estudiantes ON estudiantes.id = inscritos.estudiante_id
LEFT JOIN personas ON personas.id = estudiantes.id 
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
ORDER BY niveles.id, grados.id, paralelos.id, turnos.id' WHERE id = 125;