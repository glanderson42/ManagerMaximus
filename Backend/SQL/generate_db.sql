/* CREATE USER FOR DATABASE */
DROP USER IF EXISTS 'manager_maximus'@'localhost';
CREATE USER 'manager_maximus'@'localhost' IDENTIFIED BY '3Pi14159265';
GRANT ALL ON manager_maximus.* TO 'manager_maximus'@'localhost';
FLUSH PRIVILEGES;

/* CREATE DATABASE */
DROP DATABASE IF EXISTS manager_maximus;
CREATE DATABASE manager_maximus CHARACTER SET utf8;
USE manager_maximus;

/* CREATE TABLES */
CREATE TABLE `users` (
  `id` int(10) PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(32) NOT NULL,
  `tries` int(2) NOT NULL DEFAULT 0,
  `email` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` enum('NEW','CONFIRMED','USER','DISABLED','REMOVED') NOT NULL DEFAULT 'NEW',
  `regdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastdate` datetime DEFAULT NULL,
  `disabledon` datetime DEFAULT NULL
);
CREATE TABLE `project` (
  `id` int(10) PRIMARY KEY AUTO_INCREMENT,
  `authorid` int(10) NOT NULL,
  `parentid` int(10) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `headerimage` longtext DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deadline` datetime DEFAULT NULL,
  `category` enum('NEW','PROGRESS','TESTING','READY') NOT NULL DEFAULT 'NEW',
  `priority` enum('LOW','MID','HIGH','') NOT NULL DEFAULT 'LOW',
  INDEX `author_project_ind` (`authorid`),
  INDEX `parent_project_ind` (`parentid`)
);
CREATE TABLE `contributors` (
  `id` int(10) PRIMARY KEY AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `projectid` int(10) NOT NULL,
  INDEX `user_contributors_ind` (`userid`),
  INDEX `project_contributors_ind` (`projectid`)
);
CREATE TABLE `widget` (
  `id` int(10) PRIMARY KEY AUTO_INCREMENT,
  `authorid` int(10) NOT NULL,
  `projectid` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `data` longtext NOT NULL,
  `comments` longtext NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastmodified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `visibility` enum('PUBLIC','OWN','HIDDEN','REMOVED') NOT NULL DEFAULT 'OWN',
  INDEX `author_widget_ind` (`authorid`),
  INDEX `project_widget_ind` (`projectid`)
);
CREATE TABLE `chat` (
  `id` int(10) PRIMARY KEY AUTO_INCREMENT,
  `authorid` int(10) NOT NULL,
  `projectid` int(10) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `author_chat_ind` (`authorid`),
  INDEX `project_chat_ind` (`projectid`)
);
CREATE TABLE `tokens` (
  `token` varchar(32) PRIMARY KEY NOT NULL,
  `issuer` varchar(100) NOT NULL DEFAULT "",
  `audience` varchar(32) NOT NULL DEFAULT "",
  `payload` text NOT NULL,
  `starts` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires` datetime NULL
);

/* GENERATE CONNECTIONS */
ALTER TABLE `project`
  ADD CONSTRAINT `assign_project_author` FOREIGN KEY (`authorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `assign_project_parent` FOREIGN KEY (`parentid`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `contributors`
  ADD CONSTRAINT `assign_contributors_users` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `assign_contributors_project` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `widget`
  ADD CONSTRAINT `assign_widget_author` FOREIGN KEY (`authorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `assign_widget_project` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `chat`
  ADD CONSTRAINT `assign_chat_author` FOREIGN KEY (`authorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `assign_chat_project` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;
