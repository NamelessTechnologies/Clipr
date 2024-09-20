DROP TABLE IF EXISTS posttag;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS saves;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS commentlikes;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS users;

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
SELECT * FROM users





