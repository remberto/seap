ALTER TABLE unidades_educativas ADD COLUMN user_id CHAR(36);
UPDATE unidades_educativas SET user_id = '5447afcf-14a8-4da7-b4ab-1e4eafb6fe0b';
ALTER TABLE unidades_educativas ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE administra DROP CONSTRAINT administra_unidad_educativa_id_fkey;
ALTER TABLE administra ADD CONSTRAINT administra_unidad_educativa_id_fkey FOREIGN KEY (unidad_educativa_id)
      REFERENCES unidades_educativas (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE;

INSERT INTO consultas(id, query, titulo, descripcion) VALUES (133,'SELECT unidades_educativas.id as id, 
descripcion as descripcion
FROM unidades_educativas
INNER JOIN administra ON unidades_educativas.id = administra.unidad_educativa_id
WHERE administra.user_id = :user_id;', 'Unidades Educativas', 'Unidades Educativas que el usuario administra');

INSERT INTO consulta_parametros (id, parametro, consulta_id, orden, tipo, titulo, parametro_id, valor_defecto)
VALUES (137,'user_id',133, 1, 'str', 'Usuario', 1, 1);

UPDATE consultas SET query = 'SELECT DISTINCT personas.id, users.username, personas.paterno, personas.materno, personas.nombres FROM personas
INNER JOIN users ON users.id = personas.id
INNER JOIN administra ON users.id = administra.user_id
WHERE administra.unidad_educativa_id in (
SELECT unidad_educativa_id FROM administra WHERE user_id = :user_id);' WHERE id = 127;
     