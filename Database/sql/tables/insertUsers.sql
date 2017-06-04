# enable_warnings
SET SQL_WARNINGS=1;
SET NAMES 'utf8';

# id, name, photo, external_id, type_id, email, phonenumber, isadmin, token, password (md5 of 123qwe), locked, active
# Insert 5 students
INSERT INTO `user` VALUES (1, 'Nome1','default_photo.png','10001',1,'10001@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);
INSERT INTO `user` VALUES (2, 'Nome2','default_photo.png','10002',1,'10002@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);
INSERT INTO `user` VALUES (3, 'Nome3','default_photo.png','10003',1,'10003@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);
INSERT INTO `user` VALUES (4, 'Nome4','default_photo.png','10004',1,'10004@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);
INSERT INTO `user` VALUES (5, 'Nome5','default_photo.png','10005',1,'10005@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);
# Insert 5 teachers
INSERT INTO `user` VALUES (6, 'Nome1','default_photo.png','10006',2,'10006@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);
INSERT INTO `user` VALUES (7, 'Nome2','default_photo.png','10007',2,'10007@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);
INSERT INTO `user` VALUES (8, 'Nome3','default_photo.png','10008',2,'10008@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);
INSERT INTO `user` VALUES (9, 'Nome4','default_photo.png','10009',2,'10009@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);
INSERT INTO `user` VALUES (10,'Nome5','default_photo.png','10010',2,'10010@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);