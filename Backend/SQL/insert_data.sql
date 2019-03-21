USE manager_maximus;

INSERT INTO `users` (`id`, `username`, `password`, `tries`, `email`, `name`, `status`, `disabledon`) VALUES
(1, 'admin', MD5('admin'), '0', 'admin@managermaximus.com', 'Admin Name', 'CONFIRMED', NULL),
(2, 'user', MD5('user'), '0', 'user@managermaximus.com', 'User Name', 'CONFIRMED', NULL);

INSERT INTO `project` (`id`, `authorid`, `parentid`, `title`, `description`, `created`, `deadline`, `category`, `priority`) VALUES
(1, '1', NULL, 'First project', 'Description of first project', CURRENT_TIMESTAMP, NULL, 'NEW', 'LOW'),
(2, '1', '1', 'First subproject', 'First project description', CURRENT_TIMESTAMP, '2019-09-18 06:22:05', 'NEW', 'MID');

INSERT INTO `contributors` (`id`, `userid`, `projectid`) VALUES (NULL, '2', '2');

INSERT INTO `widget` (`id`, `authorid`, `projectid`, `title`, `data`, `comments`, `date`, `lastmodified`, `visibility`) VALUES
(1, '1', '2', 'First widget', '{}', '[]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'PUBLIC'),
(2, '1', '2', 'Second widget', '{}', '[]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'OWN');

INSERT INTO `chat` (`id`, `authorid`, `projectid`, `content`, `date`) VALUES
(1, '1', '1', '1. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et.', CURRENT_TIMESTAMP),
(2, '2', '1', '2. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et.', CURRENT_TIMESTAMP),
(3, '1', '1', '3. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et.', CURRENT_TIMESTAMP);
