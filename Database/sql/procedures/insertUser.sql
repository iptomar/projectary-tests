# enable_warnings
SET SQL_WARNINGS=1;
SET NAMES 'utf8';

# id, name, photo, external_id, type_id, email, phonenumber, isadmin, token, password (md5 of 123qwe), locked, active
# Insert 1 student 
INSERT INTO `user` VALUES (1, 'Nome1','default_photo.png','10001',1,'10001@ipt.pt','999999999',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1);