UPDATE consultas SET query = 'SELECT administrativos.id as id, 
administrativos.carnet,
personas.paterno as paterno, personas.materno as materno, personas.nombres as nombres, cla_cargo.descripcion as cargo 
FROM personas
INNER JOIN administrativos
ON personas.id = administrativos.persona_id
INNER JOIN cla_cargo
ON cla_cargo.id = administrativos.cargo_id
INNER JOIN unidades_educativas
ON unidades_educativas.id = administrativos.unidad_educativa_id
INNER JOIN administra
ON administra.unidad_educativa_id = unidades_educativas.id
WHERE administra.user_id = :user_id'
WHERE id = 119;

INSERT INTO estado_asistencias(id, descripcion) VALUES (1, 'Asiste');
INSERT INTO estado_asistencias(id, descripcion) VALUES (2, 'Atraso');
INSERT INTO estado_asistencias(id, descripcion) VALUES (3, 'Falta');
INSERT INTO estado_asistencias(id, descripcion) VALUES (4, 'Licencia');

ALTER TABLE calendario ADD COLUMN habil BOOLEAN;


INSERT INTO calendario VALUES (20150101, '2015-01-01', true);
INSERT INTO calendario VALUES (20150104, '2015-01-04', false);
INSERT INTO calendario VALUES (20150105, '2015-01-05', true);
INSERT INTO calendario VALUES (20150106, '2015-01-06', true);
INSERT INTO calendario VALUES (20150107, '2015-01-07', true);
INSERT INTO calendario VALUES (20150108, '2015-01-08', true);
INSERT INTO calendario VALUES (20150109, '2015-01-09', true);
INSERT INTO calendario VALUES (20150110, '2015-01-10', false);
INSERT INTO calendario VALUES (20150111, '2015-01-11', false);
INSERT INTO calendario VALUES (20150112, '2015-01-12', true);
INSERT INTO calendario VALUES (20150113, '2015-01-13', true);
INSERT INTO calendario VALUES (20150114, '2015-01-14', true);
INSERT INTO calendario VALUES (20150115, '2015-01-15', true);
INSERT INTO calendario VALUES (20150116, '2015-01-16', true);
INSERT INTO calendario VALUES (20150117, '2015-01-17', false);
INSERT INTO calendario VALUES (20150118, '2015-01-18', false);
INSERT INTO calendario VALUES (20150119, '2015-01-19', true);
INSERT INTO calendario VALUES (20150120, '2015-01-20', true);
INSERT INTO calendario VALUES (20150121, '2015-01-21', true);
INSERT INTO calendario VALUES (20150122, '2015-01-22', true);
INSERT INTO calendario VALUES (20150123, '2015-01-23', true);
INSERT INTO calendario VALUES (20150124, '2015-01-24', false);
INSERT INTO calendario VALUES (20150125, '2015-01-25', false);
INSERT INTO calendario VALUES (20150126, '2015-01-26', true);
INSERT INTO calendario VALUES (20150127, '2015-01-27', true);
INSERT INTO calendario VALUES (20150128, '2015-01-28', true);
INSERT INTO calendario VALUES (20150129, '2015-01-29', true);
INSERT INTO calendario VALUES (20150130, '2015-01-30', true);
INSERT INTO calendario VALUES (20150131, '2015-01-31', false);
INSERT INTO calendario VALUES (20150201, '2015-02-01', false);
INSERT INTO calendario VALUES (20150202, '2015-02-02', true);
INSERT INTO calendario VALUES (20150203, '2015-02-03', true);
INSERT INTO calendario VALUES (20150204, '2015-02-04', true);
INSERT INTO calendario VALUES (20150205, '2015-02-05', true);
INSERT INTO calendario VALUES (20150206, '2015-02-06', true);
INSERT INTO calendario VALUES (20150207, '2015-02-07', false);
INSERT INTO calendario VALUES (20150208, '2015-02-08', false);
INSERT INTO calendario VALUES (20150209, '2015-02-09', true);
INSERT INTO calendario VALUES (20150210, '2015-02-10', true);
INSERT INTO calendario VALUES (20150211, '2015-02-11', true);
INSERT INTO calendario VALUES (20150212, '2015-02-12', true);
INSERT INTO calendario VALUES (20150213, '2015-02-13', true);
INSERT INTO calendario VALUES (20150214, '2015-02-14', false);
INSERT INTO calendario VALUES (20150215, '2015-02-15', false);
INSERT INTO calendario VALUES (20150216, '2015-02-16', true);
INSERT INTO calendario VALUES (20150217, '2015-02-17', true);
INSERT INTO calendario VALUES (20150218, '2015-02-18', true);
INSERT INTO calendario VALUES (20150219, '2015-02-19', true);
INSERT INTO calendario VALUES (20150220, '2015-02-20', true);
INSERT INTO calendario VALUES (20150221, '2015-02-21', false);
INSERT INTO calendario VALUES (20150222, '2015-02-22', false);
INSERT INTO calendario VALUES (20150223, '2015-02-23', true);
INSERT INTO calendario VALUES (20150224, '2015-02-24', true);
INSERT INTO calendario VALUES (20150225, '2015-02-25', true);
INSERT INTO calendario VALUES (20150226, '2015-02-26', true);
INSERT INTO calendario VALUES (20150227, '2015-02-27', true);
INSERT INTO calendario VALUES (20150228, '2015-02-28', false);
INSERT INTO calendario VALUES (20150301, '2015-03-01', false);
INSERT INTO calendario VALUES (20150302, '2015-03-02', true);
INSERT INTO calendario VALUES (20150303, '2015-03-03', true);
INSERT INTO calendario VALUES (20150304, '2015-03-04', true);
INSERT INTO calendario VALUES (20150305, '2015-03-05', true);
INSERT INTO calendario VALUES (20150306, '2015-03-06', true);
INSERT INTO calendario VALUES (20150307, '2015-03-07', false);
INSERT INTO calendario VALUES (20150308, '2015-03-08', false);
INSERT INTO calendario VALUES (20150309, '2015-03-09', true);
INSERT INTO calendario VALUES (20150310, '2015-03-10', true);
INSERT INTO calendario VALUES (20150311, '2015-03-11', true);
INSERT INTO calendario VALUES (20150312, '2015-03-12', true);
INSERT INTO calendario VALUES (20150313, '2015-03-13', true);
INSERT INTO calendario VALUES (20150314, '2015-03-14', false);
INSERT INTO calendario VALUES (20150315, '2015-03-15', false);
INSERT INTO calendario VALUES (20150316, '2015-03-16', true);
INSERT INTO calendario VALUES (20150317, '2015-03-17', true);
INSERT INTO calendario VALUES (20150318, '2015-03-18', true);
INSERT INTO calendario VALUES (20150319, '2015-03-19', true);
INSERT INTO calendario VALUES (20150320, '2015-03-20', true);
INSERT INTO calendario VALUES (20150321, '2015-03-21', false);
INSERT INTO calendario VALUES (20150322, '2015-03-22', false);
INSERT INTO calendario VALUES (20150323, '2015-03-23', true);
INSERT INTO calendario VALUES (20150324, '2015-03-24', true);
INSERT INTO calendario VALUES (20150325, '2015-03-25', true);
INSERT INTO calendario VALUES (20150326, '2015-03-26', true);
INSERT INTO calendario VALUES (20150327, '2015-03-27', true);
INSERT INTO calendario VALUES (20150328, '2015-03-28', false);
INSERT INTO calendario VALUES (20150329, '2015-03-29', false);
INSERT INTO calendario VALUES (20150330, '2015-03-30', true);
INSERT INTO calendario VALUES (20150331, '2015-03-31', true);
INSERT INTO calendario VALUES (20150401, '2015-04-01', true);
INSERT INTO calendario VALUES (20150402, '2015-04-02', true);
INSERT INTO calendario VALUES (20150403, '2015-04-03', true);
INSERT INTO calendario VALUES (20150404, '2015-04-04', false);
INSERT INTO calendario VALUES (20150405, '2015-04-05', false);
INSERT INTO calendario VALUES (20150406, '2015-04-06', true);
INSERT INTO calendario VALUES (20150407, '2015-04-07', true);
INSERT INTO calendario VALUES (20150408, '2015-04-08', true);
INSERT INTO calendario VALUES (20150409, '2015-04-09', true);
INSERT INTO calendario VALUES (20150410, '2015-04-10', true);
INSERT INTO calendario VALUES (20150411, '2015-04-11', false);
INSERT INTO calendario VALUES (20150412, '2015-04-12', false);
INSERT INTO calendario VALUES (20150413, '2015-04-13', true);
INSERT INTO calendario VALUES (20150414, '2015-04-14', true);
INSERT INTO calendario VALUES (20150415, '2015-04-15', true);
INSERT INTO calendario VALUES (20150416, '2015-04-16', true);
INSERT INTO calendario VALUES (20150417, '2015-04-17', true);
INSERT INTO calendario VALUES (20150418, '2015-04-18', false);
INSERT INTO calendario VALUES (20150419, '2015-04-19', false);
INSERT INTO calendario VALUES (20150420, '2015-04-20', true);
INSERT INTO calendario VALUES (20150421, '2015-04-21', true);
INSERT INTO calendario VALUES (20150422, '2015-04-22', true);
INSERT INTO calendario VALUES (20150423, '2015-04-23', true);
INSERT INTO calendario VALUES (20150424, '2015-04-24', true);
INSERT INTO calendario VALUES (20150425, '2015-04-25', false);
INSERT INTO calendario VALUES (20150426, '2015-04-26', false);
INSERT INTO calendario VALUES (20150427, '2015-04-27', true);
INSERT INTO calendario VALUES (20150428, '2015-04-28', true);
INSERT INTO calendario VALUES (20150429, '2015-04-29', true);
INSERT INTO calendario VALUES (20150430, '2015-04-30', true);
INSERT INTO calendario VALUES (20150501, '2015-05-01', true);
INSERT INTO calendario VALUES (20150502, '2015-05-02', false);
INSERT INTO calendario VALUES (20150503, '2015-05-03', false);
INSERT INTO calendario VALUES (20150504, '2015-05-04', true);
INSERT INTO calendario VALUES (20150505, '2015-05-05', true);
INSERT INTO calendario VALUES (20150506, '2015-05-06', true);
INSERT INTO calendario VALUES (20150507, '2015-05-07', true);
INSERT INTO calendario VALUES (20150508, '2015-05-08', true);
INSERT INTO calendario VALUES (20150509, '2015-05-09', false);
INSERT INTO calendario VALUES (20150510, '2015-05-10', false);
INSERT INTO calendario VALUES (20150511, '2015-05-11', true);
INSERT INTO calendario VALUES (20150512, '2015-05-12', true);
INSERT INTO calendario VALUES (20150513, '2015-05-13', true);
INSERT INTO calendario VALUES (20150514, '2015-05-14', true);
INSERT INTO calendario VALUES (20150515, '2015-05-15', true);
INSERT INTO calendario VALUES (20150516, '2015-05-16', false);
INSERT INTO calendario VALUES (20150517, '2015-05-17', false);
INSERT INTO calendario VALUES (20150518, '2015-05-18', true);
INSERT INTO calendario VALUES (20150519, '2015-05-19', true);
INSERT INTO calendario VALUES (20150520, '2015-05-20', true);
INSERT INTO calendario VALUES (20150521, '2015-05-21', true);
INSERT INTO calendario VALUES (20150522, '2015-05-22', true);
INSERT INTO calendario VALUES (20150523, '2015-05-23', false);
INSERT INTO calendario VALUES (20150524, '2015-05-24', false);
INSERT INTO calendario VALUES (20150525, '2015-05-25', true);
INSERT INTO calendario VALUES (20150526, '2015-05-26', true);
INSERT INTO calendario VALUES (20150527, '2015-05-27', true);
INSERT INTO calendario VALUES (20150528, '2015-05-28', true);
INSERT INTO calendario VALUES (20150529, '2015-05-29', true);
INSERT INTO calendario VALUES (20150530, '2015-05-30', false);
INSERT INTO calendario VALUES (20150531, '2015-05-31', false);
INSERT INTO calendario VALUES (20150601, '2015-06-01', true);
INSERT INTO calendario VALUES (20150602, '2015-06-02', true);
INSERT INTO calendario VALUES (20150603, '2015-06-03', true);
INSERT INTO calendario VALUES (20150604, '2015-06-04', true);
INSERT INTO calendario VALUES (20150605, '2015-06-05', true);
INSERT INTO calendario VALUES (20150606, '2015-06-06', false);
INSERT INTO calendario VALUES (20150607, '2015-06-07', false);
INSERT INTO calendario VALUES (20150608, '2015-06-08', true);
INSERT INTO calendario VALUES (20150609, '2015-06-09', true);
INSERT INTO calendario VALUES (20150610, '2015-06-10', true);
INSERT INTO calendario VALUES (20150611, '2015-06-11', true);
INSERT INTO calendario VALUES (20150612, '2015-06-12', true);
INSERT INTO calendario VALUES (20150613, '2015-06-13', false);
INSERT INTO calendario VALUES (20150614, '2015-06-14', false);
INSERT INTO calendario VALUES (20150615, '2015-06-15', true);
INSERT INTO calendario VALUES (20150616, '2015-06-16', true);
INSERT INTO calendario VALUES (20150617, '2015-06-17', true);
INSERT INTO calendario VALUES (20150618, '2015-06-18', true);
INSERT INTO calendario VALUES (20150619, '2015-06-19', true);
INSERT INTO calendario VALUES (20150620, '2015-06-20', false);
INSERT INTO calendario VALUES (20150621, '2015-06-21', false);
INSERT INTO calendario VALUES (20150622, '2015-06-22', true);
INSERT INTO calendario VALUES (20150623, '2015-06-23', true);
INSERT INTO calendario VALUES (20150624, '2015-06-24', true);
INSERT INTO calendario VALUES (20150625, '2015-06-25', true);
INSERT INTO calendario VALUES (20150626, '2015-06-26', true);
INSERT INTO calendario VALUES (20150627, '2015-06-27', false);
INSERT INTO calendario VALUES (20150628, '2015-06-28', false);
INSERT INTO calendario VALUES (20150629, '2015-06-29', true);
INSERT INTO calendario VALUES (20150630, '2015-06-30', true);
INSERT INTO calendario VALUES (20150701, '2015-07-01', true);
INSERT INTO calendario VALUES (20150702, '2015-07-02', true);
INSERT INTO calendario VALUES (20150703, '2015-07-03', true);
INSERT INTO calendario VALUES (20150704, '2015-07-04', false);
INSERT INTO calendario VALUES (20150705, '2015-07-05', false);
INSERT INTO calendario VALUES (20150706, '2015-07-06', true);
INSERT INTO calendario VALUES (20150707, '2015-07-07', true);
INSERT INTO calendario VALUES (20150708, '2015-07-08', true);
INSERT INTO calendario VALUES (20150709, '2015-07-09', true);
INSERT INTO calendario VALUES (20150710, '2015-07-10', true);
INSERT INTO calendario VALUES (20150711, '2015-07-11', false);
INSERT INTO calendario VALUES (20150712, '2015-07-12', false);
INSERT INTO calendario VALUES (20150713, '2015-07-13', true);
INSERT INTO calendario VALUES (20150714, '2015-07-14', true);
INSERT INTO calendario VALUES (20150715, '2015-07-15', true);
INSERT INTO calendario VALUES (20150716, '2015-07-16', true);
INSERT INTO calendario VALUES (20150717, '2015-07-17', true);
INSERT INTO calendario VALUES (20150718, '2015-07-18', false);
INSERT INTO calendario VALUES (20150719, '2015-07-19', false);
INSERT INTO calendario VALUES (20150720, '2015-07-20', true);
INSERT INTO calendario VALUES (20150721, '2015-07-21', true);
INSERT INTO calendario VALUES (20150722, '2015-07-22', true);
INSERT INTO calendario VALUES (20150723, '2015-07-23', true);
INSERT INTO calendario VALUES (20150724, '2015-07-24', true);
INSERT INTO calendario VALUES (20150725, '2015-07-25', false);
INSERT INTO calendario VALUES (20150726, '2015-07-26', false);
INSERT INTO calendario VALUES (20150727, '2015-07-27', true);
INSERT INTO calendario VALUES (20150728, '2015-07-28', true);
INSERT INTO calendario VALUES (20150729, '2015-07-29', true);
INSERT INTO calendario VALUES (20150730, '2015-07-30', true);
INSERT INTO calendario VALUES (20150731, '2015-07-31', true);
INSERT INTO calendario VALUES (20150801, '2015-08-01', false);
INSERT INTO calendario VALUES (20150802, '2015-08-02', false);
INSERT INTO calendario VALUES (20150803, '2015-08-03', true);
INSERT INTO calendario VALUES (20150804, '2015-08-04', true);
INSERT INTO calendario VALUES (20150805, '2015-08-05', true);
INSERT INTO calendario VALUES (20150806, '2015-08-06', true);
INSERT INTO calendario VALUES (20150807, '2015-08-07', true);
INSERT INTO calendario VALUES (20150808, '2015-08-08', false);
INSERT INTO calendario VALUES (20150809, '2015-08-09', false);
INSERT INTO calendario VALUES (20150810, '2015-08-10', true);
INSERT INTO calendario VALUES (20150811, '2015-08-11', true);
INSERT INTO calendario VALUES (20150812, '2015-08-12', true);
INSERT INTO calendario VALUES (20150813, '2015-08-13', true);
INSERT INTO calendario VALUES (20150814, '2015-08-14', true);
INSERT INTO calendario VALUES (20150103, '2015-01-03', false);
INSERT INTO calendario VALUES (20150815, '2015-08-15', false);
INSERT INTO calendario VALUES (20150816, '2015-08-16', false);
INSERT INTO calendario VALUES (20150817, '2015-08-17', true);
INSERT INTO calendario VALUES (20150818, '2015-08-18', true);
INSERT INTO calendario VALUES (20150819, '2015-08-19', true);
INSERT INTO calendario VALUES (20150820, '2015-08-20', true);
INSERT INTO calendario VALUES (20150821, '2015-08-21', true);
INSERT INTO calendario VALUES (20150822, '2015-08-22', false);
INSERT INTO calendario VALUES (20150823, '2015-08-23', false);
INSERT INTO calendario VALUES (20150824, '2015-08-24', true);
INSERT INTO calendario VALUES (20150825, '2015-08-25', true);
INSERT INTO calendario VALUES (20150826, '2015-08-26', true);
INSERT INTO calendario VALUES (20150827, '2015-08-27', true);
INSERT INTO calendario VALUES (20150828, '2015-08-28', true);
INSERT INTO calendario VALUES (20150829, '2015-08-29', false);
INSERT INTO calendario VALUES (20150830, '2015-08-30', false);
INSERT INTO calendario VALUES (20150831, '2015-08-31', true);
INSERT INTO calendario VALUES (20150901, '2015-09-01', true);
INSERT INTO calendario VALUES (20150902, '2015-09-02', true);
INSERT INTO calendario VALUES (20150903, '2015-09-03', true);
INSERT INTO calendario VALUES (20150904, '2015-09-04', true);
INSERT INTO calendario VALUES (20150905, '2015-09-05', false);
INSERT INTO calendario VALUES (20150906, '2015-09-06', false);
INSERT INTO calendario VALUES (20150907, '2015-09-07', true);
INSERT INTO calendario VALUES (20150908, '2015-09-08', true);
INSERT INTO calendario VALUES (20150909, '2015-09-09', true);
INSERT INTO calendario VALUES (20150910, '2015-09-10', true);
INSERT INTO calendario VALUES (20150911, '2015-09-11', true);
INSERT INTO calendario VALUES (20150912, '2015-09-12', false);
INSERT INTO calendario VALUES (20150913, '2015-09-13', false);
INSERT INTO calendario VALUES (20150914, '2015-09-14', true);
INSERT INTO calendario VALUES (20150915, '2015-09-15', true);
INSERT INTO calendario VALUES (20150916, '2015-09-16', true);
INSERT INTO calendario VALUES (20150917, '2015-09-17', true);
INSERT INTO calendario VALUES (20150918, '2015-09-18', true);
INSERT INTO calendario VALUES (20150919, '2015-09-19', false);
INSERT INTO calendario VALUES (20150920, '2015-09-20', false);
INSERT INTO calendario VALUES (20150921, '2015-09-21', true);
INSERT INTO calendario VALUES (20150922, '2015-09-22', true);
INSERT INTO calendario VALUES (20150923, '2015-09-23', true);
INSERT INTO calendario VALUES (20150924, '2015-09-24', true);
INSERT INTO calendario VALUES (20150925, '2015-09-25', true);
INSERT INTO calendario VALUES (20150926, '2015-09-26', false);
INSERT INTO calendario VALUES (20150927, '2015-09-27', false);
INSERT INTO calendario VALUES (20150928, '2015-09-28', true);
INSERT INTO calendario VALUES (20150929, '2015-09-29', true);
INSERT INTO calendario VALUES (20150930, '2015-09-30', true);
INSERT INTO calendario VALUES (20151001, '2015-10-01', true);
INSERT INTO calendario VALUES (20151002, '2015-10-02', true);
INSERT INTO calendario VALUES (20151003, '2015-10-03', false);
INSERT INTO calendario VALUES (20151004, '2015-10-04', false);
INSERT INTO calendario VALUES (20151005, '2015-10-05', true);
INSERT INTO calendario VALUES (20151006, '2015-10-06', true);
INSERT INTO calendario VALUES (20151007, '2015-10-07', true);
INSERT INTO calendario VALUES (20151008, '2015-10-08', true);
INSERT INTO calendario VALUES (20151009, '2015-10-09', true);
INSERT INTO calendario VALUES (20151010, '2015-10-10', false);
INSERT INTO calendario VALUES (20151011, '2015-10-11', false);
INSERT INTO calendario VALUES (20151012, '2015-10-12', true);
INSERT INTO calendario VALUES (20151013, '2015-10-13', true);
INSERT INTO calendario VALUES (20151014, '2015-10-14', true);
INSERT INTO calendario VALUES (20151015, '2015-10-15', true);
INSERT INTO calendario VALUES (20151016, '2015-10-16', true);
INSERT INTO calendario VALUES (20151017, '2015-10-17', false);
INSERT INTO calendario VALUES (20151018, '2015-10-18', false);
INSERT INTO calendario VALUES (20151019, '2015-10-19', true);
INSERT INTO calendario VALUES (20151020, '2015-10-20', true);
INSERT INTO calendario VALUES (20151021, '2015-10-21', true);
INSERT INTO calendario VALUES (20151022, '2015-10-22', true);
INSERT INTO calendario VALUES (20151023, '2015-10-23', true);
INSERT INTO calendario VALUES (20151024, '2015-10-24', false);
INSERT INTO calendario VALUES (20151025, '2015-10-25', false);
INSERT INTO calendario VALUES (20151026, '2015-10-26', true);
INSERT INTO calendario VALUES (20151027, '2015-10-27', true);
INSERT INTO calendario VALUES (20151028, '2015-10-28', true);
INSERT INTO calendario VALUES (20151029, '2015-10-29', true);
INSERT INTO calendario VALUES (20151030, '2015-10-30', true);
INSERT INTO calendario VALUES (20151031, '2015-10-31', false);
INSERT INTO calendario VALUES (20151101, '2015-11-01', false);
INSERT INTO calendario VALUES (20151102, '2015-11-02', true);
INSERT INTO calendario VALUES (20151103, '2015-11-03', true);
INSERT INTO calendario VALUES (20151104, '2015-11-04', true);
INSERT INTO calendario VALUES (20151105, '2015-11-05', true);
INSERT INTO calendario VALUES (20151106, '2015-11-06', true);
INSERT INTO calendario VALUES (20151107, '2015-11-07', false);
INSERT INTO calendario VALUES (20151108, '2015-11-08', false);
INSERT INTO calendario VALUES (20151109, '2015-11-09', true);
INSERT INTO calendario VALUES (20151110, '2015-11-10', true);
INSERT INTO calendario VALUES (20151111, '2015-11-11', true);
INSERT INTO calendario VALUES (20151112, '2015-11-12', true);
INSERT INTO calendario VALUES (20151113, '2015-11-13', true);
INSERT INTO calendario VALUES (20151114, '2015-11-14', false);
INSERT INTO calendario VALUES (20151115, '2015-11-15', false);
INSERT INTO calendario VALUES (20151116, '2015-11-16', true);
INSERT INTO calendario VALUES (20151117, '2015-11-17', true);
INSERT INTO calendario VALUES (20151118, '2015-11-18', true);
INSERT INTO calendario VALUES (20151119, '2015-11-19', true);
INSERT INTO calendario VALUES (20151120, '2015-11-20', true);
INSERT INTO calendario VALUES (20151121, '2015-11-21', false);
INSERT INTO calendario VALUES (20151122, '2015-11-22', false);
INSERT INTO calendario VALUES (20151123, '2015-11-23', true);
INSERT INTO calendario VALUES (20151124, '2015-11-24', true);
INSERT INTO calendario VALUES (20151125, '2015-11-25', true);
INSERT INTO calendario VALUES (20151126, '2015-11-26', true);
INSERT INTO calendario VALUES (20151127, '2015-11-27', true);
INSERT INTO calendario VALUES (20151128, '2015-11-28', false);
INSERT INTO calendario VALUES (20151129, '2015-11-29', false);
INSERT INTO calendario VALUES (20151130, '2015-11-30', true);
INSERT INTO calendario VALUES (20151201, '2015-12-01', true);
INSERT INTO calendario VALUES (20151202, '2015-12-02', true);
INSERT INTO calendario VALUES (20151203, '2015-12-03', true);
INSERT INTO calendario VALUES (20151204, '2015-12-04', true);
INSERT INTO calendario VALUES (20151205, '2015-12-05', false);
INSERT INTO calendario VALUES (20151206, '2015-12-06', false);
INSERT INTO calendario VALUES (20151207, '2015-12-07', true);
INSERT INTO calendario VALUES (20151208, '2015-12-08', true);
INSERT INTO calendario VALUES (20151209, '2015-12-09', true);
INSERT INTO calendario VALUES (20151210, '2015-12-10', true);
INSERT INTO calendario VALUES (20151211, '2015-12-11', true);
INSERT INTO calendario VALUES (20151212, '2015-12-12', false);
INSERT INTO calendario VALUES (20151213, '2015-12-13', false);
INSERT INTO calendario VALUES (20151214, '2015-12-14', true);
INSERT INTO calendario VALUES (20151215, '2015-12-15', true);
INSERT INTO calendario VALUES (20151216, '2015-12-16', true);
INSERT INTO calendario VALUES (20151217, '2015-12-17', true);
INSERT INTO calendario VALUES (20151218, '2015-12-18', true);
INSERT INTO calendario VALUES (20151219, '2015-12-19', false);
INSERT INTO calendario VALUES (20151220, '2015-12-20', false);
INSERT INTO calendario VALUES (20151221, '2015-12-21', true);
INSERT INTO calendario VALUES (20151222, '2015-12-22', true);
INSERT INTO calendario VALUES (20151223, '2015-12-23', true);
INSERT INTO calendario VALUES (20151224, '2015-12-24', true);
INSERT INTO calendario VALUES (20151225, '2015-12-25', true);
INSERT INTO calendario VALUES (20151226, '2015-12-26', false);
INSERT INTO calendario VALUES (20151227, '2015-12-27', false);
INSERT INTO calendario VALUES (20151228, '2015-12-28', true);
INSERT INTO calendario VALUES (20151229, '2015-12-29', true);
INSERT INTO calendario VALUES (20151230, '2015-12-30', true);
INSERT INTO calendario VALUES (20151231, '2015-12-31', true);
INSERT INTO calendario VALUES (20150102, '2015-01-02', true);

ALTER TABLE criterios_evaluacion DROP CONSTRAINT fk_criterios_de_evaluacion_planifiacion_detalle_clases;
ALTER TABLE criterios_evaluacion DROP COLUMN planificacion_clase_detalle_id
ALTER TABLE criterios_evaluacion ADD COLUMN periodo_id integer;
ALTER TABLE criterios_evaluacion ADD CONSTRAINT fk_criterios_de_evaluacion_periodos FOREIGN KEY (periodo_id) REFERENCES periodos(id) ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE criterios_evaluacion ADD COLUMN actividad_evaluacion_id integer;
ALTER TABLE criterios_evaluacion ADD CONSTRAINT fk_criterios_de_evaluacion_actividad_evaluacion FOREIGN KEY (actividad_evaluacion_id) REFERENCES actividad_evaluacion(id) ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE criterios_evaluacion ADD COLUMN asignado_id CHAR(36);
ALTER TABLE criterios_evaluacion ADD CONSTRAINT fk_criterios_de_evaluacion_asignado FOREIGN KEY (asignado_id) REFERENCES asignados(id) ON UPDATE NO ACTION ON DELETE NO ACTION;

DROP TABLE evaluaciones;

CREATE TABLE evaluaciones
(
  id character(36) NOT NULL,  
  inscrito_id character(36) NOT NULL,
  criterio_de_evaluacion_id character(36) NOT NULL,  
  cuantitativo integer NOT NULL,
  cualitativo integer NOT NULL,
  observaciones varchar(80),  
  CONSTRAINT fk_evaluaciones_criterios_de_evaluacion FOREIGN KEY (criterio_de_evaluacion_id)
      REFERENCES criterios_evaluacion (id) 
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_evaluaciones_evaluacion_cualitativo FOREIGN KEY (cualitativo)
      REFERENCES evaluacion_cualitativo (id) 
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_evaluaciones_inscritos FOREIGN KEY (inscrito_id)
      REFERENCES inscritos (id) 
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_evaluaciones UNIQUE (inscrito_id, criterio_de_evaluacion_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE evaluaciones
  OWNER TO postgres;
