# enable_warnings
SET SQL_WARNINGS=1;
SET NAMES 'utf8';

# id, approvedin, year, courseid, name, description, userid, created
# Insert 5 projects
INSERT INTO `project` VALUES (1, '2017-01-02 00:00:01', '2017', 1, 'Projeto 1', 'Descrição do projeto 1', 1, '2017-01-01 00:00:01');
INSERT INTO `project` VALUES (2, '2017-01-02 00:00:02', '2017', 1, 'Projeto 2', 'Descrição do projeto 2', 2, '2017-01-01 00:00:02');
INSERT INTO `project` VALUES (3, '2017-01-02 00:00:03', '2017', 1, 'Projeto 3', 'Descrição do projeto 3', 3, '2017-01-01 00:00:03');
INSERT INTO `project` VALUES (4, '2017-01-02 00:00:04', '2017', 1, 'Projeto 4', 'Descrição do projeto 4', 4, '2017-01-01 00:00:04');
INSERT INTO `project` VALUES (5, '2017-01-02 00:00:05', '2017', 1, 'Projeto 5', 'Descrição do projeto 5', 5, '2017-01-01 00:00:05');