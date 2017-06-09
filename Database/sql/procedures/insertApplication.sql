# enable_warnings
SET SQL_WARNINGS=1;
SET NAMES 'utf8';

# groupid, projectid, submitedin, approvedin
INSERT INTO `application` VALUES (3, 1, NOW(), '2017-06-06 23:07:26');
INSERT INTO `application` (groupid, projectid, submitedin) VALUES (3, 2, NOW());