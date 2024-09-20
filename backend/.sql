-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users(
--     user_id SERIAL PRIMARY KEY,
--     username VARCHAR (50) NOT NULL,
--     email VARCHAR (50) NOT NULL,
--     password VARCHAR (50) NOT NULL,
--     biography VARCHAR (200) NOT NULL,
--     nickname VARCHAR (50) NOT NULL
-- );

-- INSERT INTO users (username, email, password, biography, nickname)
-- VALUES
-- ('alonzojp', 'jpalonzo@cpp.edu', 'password123', 'I love CS!', 'Ender'),
-- ('justin', 'jmn1@cpp.edu', 'password123', 'I love HSR!', 'SaltyBagels'),
-- ('maria123', 'maria@example.com', 'password456', 'Passionate about art and design.', 'ArtLover'),
-- ('bobby_the_builder', 'bobby@example.com', 'password789', 'Building amazing things!', 'BuilderBob'),
-- ('sarah.connor', 'sarah@future.com', 'password321', 'Tech enthusiast and robotics fan.', 'Techie'),
-- ('john.doe', 'john.doe@example.com', 'mypassword', 'Just a regular guy.', 'Johnny'),
-- ('emily.james', 'emily.james@example.com', 'password2021', 'Love traveling and photography.', 'Wanderlust'),
-- ('kevin_spacey', 'kevin.spacey@example.com', 'theater123', 'Movie buff and theater geek.', 'FilmFan'),
-- ('samantha_lee', 'samantha@example.com', 'samspassword', 'Fitness lover and health nut.', 'FitSamantha'),
-- ('charlie.brown', 'charlie.brown@example.com', 'peanut123', 'Dog lover and cartoonist.', 'Charlie');
-- SELECT * FROM users

DROP TABLE IF EXISTS post_tag; 
DROP TABLE IF EXISTS message; 
DROP TABLE IF EXISTS media; 
DROP TABLE IF EXISTS save;
DROP TABLE IF EXISTS likes; 
DROP TABLE IF EXISTS comment; 
DROP TABLE IF EXISTS tag; 
DROP TABLE IF EXISTS post; 
DROP TABLE IF EXISTS comment_like; 
DROP TABLE IF EXISTS conversation; 
DROP TABLE IF EXISTS users; 


-- Users Table
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR (50) NOT NULL,
    email VARCHAR (50) NOT NULL,
    password VARCHAR (50) NOT NULL,
    biography VARCHAR (200) NOT NULL,
    nickname VARCHAR (50) NOT NULL
);






INSERT INTO users (username, email, password, biography, nickname)
VALUES
('alonzojp', 'jpalonzo@cpp.edu', 'password123', 'I love CS!', 'Ender'),
('justin', 'jmn1@cpp.edu', 'password123', 'I love HSR!', 'SaltyBagels'),
('maria123', 'maria@example.com', 'password456', 'Passionate about art and design.', 'ArtLover'),
('bobby_the_builder', 'bobby@example.com', 'password789', 'Building amazing things!', 'BuilderBob'),
('sarah.connor', 'sarah@future.com', 'password321', 'Tech enthusiast and robotics fan.', 'Techie'),
('john.doe', 'john.doe@example.com', 'mypassword', 'Just a regular guy.', 'Johnny'),
('emily.james', 'emily.james@example.com', 'password2021', 'Love traveling and photography.', 'Wanderlust'),
('kevin_spacey', 'kevin.spacey@example.com', 'theater123', 'Movie buff and theater geek.', 'FilmFan'),
('samantha_lee', 'samantha@example.com', 'samspassword', 'Fitness lover and health nut.', 'FitSamantha'),
('charlie.brown', 'charlie.brown@example.com', 'peanut123', 'Dog lover and cartoonist.', 'Charlie');


-- Conversation Table
CREATE TABLE conversation (id SERIAL,
                      user_id INTEGER,
                      user_id_2 INTEGER,
                      PRIMARY KEY(id),
                      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                      CONSTRAINT fk_user_2 FOREIGN KEY (user_id_2) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                      UNIQUE (id));


INSERT INTO conversation (user_id, user_id_2) VALUES (1, 2), (3, 4), (5, 6), (7, 8), (9, 10), (2, 3), (4, 5), (6, 7), (8, 9), (10, 1);


-- Comment_Like Table
CREATE TABLE comment_like(
			comment_id INTEGER,
			user_id INTEGER,
			CONSTRAINT fk_comment FOREIGN KEY (comment_id) REFERENCES comment(id) ON UPDATE CASCADE ON DELETE CASCADE,
			CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO comment_like (comment_id, user_id) VALUES (1, 3), (2, 5), (3, 7), (4, 2), (5, 8), (6, 4), (7, 9), (1, 1), (2, 6), (3, 10);


-- Post Table
CREATE TABLE post(
	post_id SERIAL PRIMARY KEY,
	user_id INTEGER,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
	title VARCHAR (250),
	description TEXT,
	datePosted DATE,
	media_type VARCHAR (250)
);


INSERT INTO post (user_id, title, description, datePosted, media_type)
VALUES
(1, 'Healthy Living Habits', 'Simple habits that can help you live a healthier life.', '2023-07-30', 'text'),
(2, 'Deku at Seaside Bakery', 'Hi my names deku and welcome to seaside bakery', '2024-09-19', 'video'),
(3, 'Exploring the Mountains', 'A blog post about my recent hiking experience in the Rockies.', '2023-09-12', 'image'),
(4, 'Tech Innovations 2024', 'An in-depth look at upcoming technological trends for the next year.', '2024-01-05', 'video'),
(5, 'Gourmet Cooking Tips', 'Tips and tricks for cooking gourmet meals at home.', '2023-08-25', 'text'),
(6, 'Summer Travel Guide', 'A comprehensive travel guide for summer 2023, featuring top destinations.', '2023-06-15', 'image'),
(7, 'Understanding Artificial Intelligence', 'This post explains the basics of AI and its applications.', '2023-11-21', 'text'),
(8, 'Photography Techniques', 'Advanced techniques for capturing stunning landscape photos.', '2023-10-07', 'image'),
(9, 'The Future of Virtual Reality', 'Virtual reality: where it is today and what to expect in the next decade.', '2023-12-02', 'video');


select * from post;


-- Tag Table
CREATE TABLE tag (id SERIAL,
                      name TEXT,
			   PRIMARY KEY(id)
                      );


INSERT INTO tag (name) VALUES ('Science'), ('Health'), ('Education'), ('Finance'), ('Sports'), ('Entertainment'), ('Art'), ('Travel'), ('Food');


-- Comment Table
CREATE TABLE comment(
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT fk_server FOREIGN KEY (server_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE,
    message TEXT,
    UNIQUE (id)
);


insert into comment (user_id, server_id, message)
values
(1, 1, 'hawk tuah'),
(1, 1, 'skibidi'),
(1, 1, 'seaside bakery is mid'),
(1, 1, 'whats the @'),
(1, 1, 'you hawk gyatt tuah be kidding me'),
(1, 1, 'this is crazy'),
(1, 1, 'get a job');


-- Likes Table
CREATE TABLE likes(
			post_id INTEGER,
			user_id INTEGER,
			CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE,
			CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO likes (post_id, user_id)
VALUES 
(1, 3),
(2, 5),
(3, 7),
(4, 2),
(5, 8),
(6, 4),
(7, 9),
(8, 1),
(9, 6),
(2, 10);


-- Media Table
CREATE TABLE media(
	media_id SERIAL PRIMARY KEY,
	post_id INTEGER,
	CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE,
	url VARCHAR (250)
);


INSERT INTO media (post_id, url)
VALUES
(1, 'https://example.com/media/image1.jpg'),
(2, 'https://example.com/media/video1.mp4'),
(3, 'https://example.com/media/image2.jpg'),
(4, 'https://example.com/media/travel-guide.pdf'),
(5, 'https://example.com/media/ai-basics.png'),
(6, 'https://example.com/media/photography.jpg'),
(7, 'https://example.com/media/vr-video.mp4'),
(8, 'https://example.com/media/health-tips.png'),
(9, 'https://example.com/media/music-beat.mp3');


select * from media;








-- Post_Tag Table
CREATE TABLE post_tag (tag_id INTEGER,
						post_id INTEGER,
                       CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES tag(id) ON UPDATE CASCADE ON DELETE CASCADE,
                       CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE
					   );


INSERT INTO post_tag (tag_id, post_id)
VALUES
(1, 3),
(1,6),
(2, 5),
(3, 7),
(4, 2),
(5, 8),
(6, 4),
(7, 9),
(8, 1),
(9, 6),
(3, 2),
(3,3);


-- Message Table				  
CREATE TABLE message (id SERIAL,
                      convo_id INTEGER,
					  content TEXT,
					  dateSent TIMESTAMP,
					  user_id INTEGER,
                      PRIMARY KEY(id),
                      CONSTRAINT fk_convo FOREIGN KEY (convo_id) REFERENCES conversation(id) ON UPDATE CASCADE ON DELETE CASCADE,
                      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                      message TEXT,
                      UNIQUE (id));


INSERT INTO message (convo_id, content, dateSent, user_id)
VALUES
(1, 'Hello, how are you?', '2024-09-18 10:30:00', 2),
(2, 'I am fine, thanks for asking!', '2024-09-18 10:35:00', 3),
(3, 'What are you up to?', '2024-09-18 11:00:00', 5),
(4, 'Just working on a project.', '2024-09-18 11:05:00', 7),
(5, 'Let’s catch up later!', '2024-09-18 12:00:00', 4),
(6, 'Sure! Talk to you later.', '2024-09-18 12:15:00', 8),
(7, 'Good morning!', '2024-09-19 09:00:00', 1),
(8, 'Morning! Ready for the meeting?', '2024-09-19 09:05:00', 9),
(9, 'Yes, let’s get started.', '2024-09-19 09:10:00', 10),
(3, 'Sounds good, I will join now.', '2024-09-19 09:15:00', 6);


-- Save Table
CREATE TABLE save(
			post_id INTEGER,
			user_id INTEGER,
			CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE,
			CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO save (post_id, user_id) VALUES (1, 2), (2, 5), (3, 8), (4, 1), (5, 7), (6, 3), (7, 9), (8, 4), (9, 10), (2, 6);


SELECT * FROM users



