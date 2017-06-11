# enable_warnings
SET SQL_WARNINGS=1;
SET NAMES 'utf8';

# id, approvedin, year, courseid, name, descreption, userid, created, finishedin, finished
INSERT INTO `project` VALUES (1, null, 2017, 1, 'teste','teste',1,null,null,'0');
INSERT INTO `project` VALUES (2, NOW(), 2017, 2, 'teste','teste',2,null,null,'0');