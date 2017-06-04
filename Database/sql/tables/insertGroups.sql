# enable_warnings
SET SQL_WARNINGS=1;
SET NAMES 'utf8';

# id, desc, password (md5 of 123qwe)
# Insert 3 groups
INSERT INTO `group` VALUES (1, 'Grupo 1', '46f94c8de14fb36680850768ff1b7f2a');
INSERT INTO `group` VALUES (2, 'Grupo 2', '46f94c8de14fb36680850768ff1b7f2a');
INSERT INTO `group` VALUES (3, 'Grupo 3', '46f94c8de14fb36680850768ff1b7f2a');