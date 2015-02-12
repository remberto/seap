
CREATE TABLE dias(
id integer,
descripcion varchar(10),
abreviacion varchar(3),
habil boolean,
CONSTRAINT pkey_dias PRIMARY KEY (id)
);

INSERT INTO dias(id, descripcion, abreviacion, habil) VALUES
(0, 'Domingo', 'D', false),
(1, 'Lunes', 'L', true),
(2, 'Martes', 'M', true),
(3, 'Miercoles', 'M', true),
(4, 'Jueves', 'J', true),
(5, 'Viernes', 'V', true),
(6, 'Sabado', 'S', true);



CREATE TABLE periodo_horario(
id char(36),
numero_periodo integer NOT NULL,
de_horas time,
a_horas time,
CONSTRAINT pkey_periodos PRIMARY KEY (id)
);


CREATE TABLE horario(
id CHAR(36),
asignado_id CHAR(36),
periodo_id CHAR(36),
dia_id integer,
CONSTRAINT pkey_horario PRIMARY KEY (id),
CONSTRAINT fkey_horario_asignado FOREIGN KEY (asignado_id) REFERENCES asignados(id),
CONSTRAINT fkey_horario_periodo FOREIGN KEY (periodo_id) REFERENCES periodo_horario(id),
CONSTRAINT fkey_horario_dia FOREIGN KEY (dia_id) REFERENCES dias(id)
);


ALTER TABLE asignados ADD CONSTRAINT ukey_asignados UNIQUE (docente_id, curso_id);