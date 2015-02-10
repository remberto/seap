DROP TABLE dias;

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

DROP TABLE periodo_horario;
CREATE TABLE periodo_horario(
id char(36),
numero_periodo integer NOT NULL,
de_horas time,
a_horas time,
CONSTRAINT pkey_periodos PRIMARY KEY (id)
);