#-----------------------------------
#- pha chat database
#- author phachon@163.com
#-----------------------------------

# create database
create DATABASE IF NOT EXISTS phachat CHARSET utf8;

use phachat;

# user 表
DROP TABLE IF EXISTS `chat_user`;
CREATE TABLE `chat_user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` char(100) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(32) NOT NULL DEFAULT '' COMMENT '密码',
  `sex` TINYINT(2) NOT NULL DEFAULT '0' COMMENT '性别 0未知 1 男 2 女',
  `email` CHAR(100) NOT NULL DEFAULT '' COMMENT '邮箱',
  `phone` CHAR(20) NOT NULL DEFAULT '' COMMENT '电话',
  `qq` bigint(20) NOT NULL DEFAULT '0' COMMENT 'qq',
  `wechat` CHAR(100) NOT NULL DEFAULT '' COMMENT '微信号',
  `icon` char(200) NOT NULL DEFAULT '' COMMENT '头像',
  `create_time` int(10) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `name` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT='用户表';
