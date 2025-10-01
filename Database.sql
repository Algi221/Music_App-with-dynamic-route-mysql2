CREATE DATABASE IF NOT EXISTS music_app;
USE music_app;
DROP DATABASE music_app;

CREATE TABLE artists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    bio TEXT,
    genre VARCHAR(50),
    country VARCHAR(50),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE songs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    artist_id INT NOT NULL,
    duration INT NOT NULL, 
    genre VARCHAR(50),
    release_year YEAR,
    audio_url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    lyrics TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);

INSERT INTO artists (name, slug, bio, genre, country, image_url) VALUES
('Lany', 'lany', 'LANY adalah band indie pop Amerika yang dibentuk di Los Angeles pada tahun 2014. Band ini dikenal dengan musik dreamy dan melancholic yang sangat populer di kalangan millennials.', 'Indie Pop', 'United States', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWz9TWloGf2ZNZrgnKJZj9VNXtiydVH4B3hg&s'),
('Taylor Swift', 'taylor-swift', 'Taylor Swift adalah penyanyi-penulis lagu Amerika yang telah menjadi salah satu artis musik terlaris di dunia. Dikenal dengan kemampuan storytelling yang luar biasa dalam lagu-lagunya.', 'Pop', 'United States', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-MBTN0kw-kHWyPVtOEm6m-bMB1qaHZneibA&s'),
('Ariana Grande', 'ariana-grande', 'Ariana Grande adalah penyanyi, penulis lagu, dan aktris Amerika. Dikenal dengan vokal yang powerful dan musik pop yang catchy.', 'Pop', 'United States', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop&crop=face'),
('Reality Club', 'reality-club', 'Reality Club adalah band indie rock Indonesia yang dibentuk di Jakarta. Mereka dikenal dengan musik yang fresh dan lirik yang relatable untuk anak muda Indonesia.', 'Indie Rock', 'Indonesia', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQEzZjWk8e-o5m8RiaHdjHvz52ntKVfu97k31w1h-nzxtZwGnc77tZD3RLpYDHvUJ2SDa3KaoKAK93A9rO7OhrnQtCtbiWrJReDp5eh816W9Q'),
('wave to earth', 'wave-to-earth', 'wave to earth adalah band indie pop Korea Selatan yang dikenal dengan musik yang calming dan atmospheric. Mereka menciptakan musik yang sempurna untuk mood yang tenang.', 'Indie Pop', 'South Korea', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXUMIxnB4fXlgcT0qzACaSSrInC12zOHA-6w&s'),
('Green Day', 'green-day', 'Green Day adalah band punk rock Amerika yang dibentuk pada tahun 1987. Mereka adalah salah satu band paling berpengaruh dalam genre punk rock dan pop punk.', 'Punk Rock', 'United States', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face'),
('Ed Sheeran', 'ed-sheeran', 'Ed Sheeran adalah penyanyi-penulis lagu Inggris yang dikenal dengan musik folk pop dan kemampuan bermain gitar yang luar biasa. Lagu-lagunya sering menjadi hits di seluruh dunia.', 'Folk Pop', 'United Kingdom', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&crop=face'),
('Billie Eilish', 'billie-eilish', 'Billie Eilish adalah penyanyi-penulis lagu Amerika yang dikenal dengan musik alternative pop yang unik dan vokal yang haunting. Dia adalah salah satu artis muda paling berpengaruh saat ini.', 'Alternative Pop', 'United States', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face'),
('The Weeknd', 'the-weeknd', 'The Weeknd adalah penyanyi-penulis lagu Kanada yang dikenal dengan musik R&B dan pop yang dark dan atmospheric. Dia telah menjadi salah satu artis musik terlaris di dunia.', 'R&B', 'Canada', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop&crop=face'),
('Olivia Rodrigo', 'olivia-rodrigo', 'Olivia Rodrigo adalah penyanyi-penulis lagu Amerika yang dikenal dengan musik pop rock yang emosional. Album pertamanya "SOUR" menjadi sangat populer di kalangan Gen Z.', 'Pop Rock', 'United States', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face');


INSERT INTO songs (title, slug, artist_id, duration, genre, release_year, audio_url, image_url, lyrics) VALUES
-- LANY
('ILYSB','ilysb',(SELECT id FROM artists WHERE slug='lany'),180,'Indie Pop',2015,'/music/lany/ilysb.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','I love you so bad, I love you so bad...'),
('Malibu Nights','malibu-nights',(SELECT id FROM artists WHERE slug='lany'),200,'Indie Pop',2018,'/music/lany/malibu-nights.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','Malibu nights, Malibu nights...'),
('Thru These Tears','thru-these-tears',(SELECT id FROM artists WHERE slug='lany'),195,'Indie Pop',2018,'/music/lany/thru-these-tears.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','Thru these tears, I can see clearly now...'),
('Good Girls','good-girls',(SELECT id FROM artists WHERE slug='lany'),185,'Indie Pop',2017,'/music/lany/good-girls.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','Good girls don''t lie, good girls don''t cry...'),
('Super Far','super-far',(SELECT id FROM artists WHERE slug='lany'),190,'Indie Pop',2017,'/music/lany/super-far.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','You''re super far, but I can see you...'),

-- Taylor Swift
('Love Story','love-story',(SELECT id FROM artists WHERE slug='taylor-swift'),235,'Pop',2008,'/music/taylor-swift/love-story.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','We were both young when I first saw you...'),
('Shake It Off','shake-it-off',(SELECT id FROM artists WHERE slug='taylor-swift'),219,'Pop',2014,'/music/taylor-swift/shake-it-off.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','I stay up too late, got nothing in my brain...'),
('Anti-Hero','anti-hero',(SELECT id FROM artists WHERE slug='taylor-swift'),201,'Pop',2022,'/music/taylor-swift/anti-hero.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','I have this thing where I get older but just never wiser...'),
('Blank Space','blank-space',(SELECT id FROM artists WHERE slug='taylor-swift'),231,'Pop',2014,'/music/taylor-swift/blank-space.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','Nice to meet you, where you been?'),
('Cardigan','cardigan',(SELECT id FROM artists WHERE slug='taylor-swift'),239,'Indie Folk',2020,'/music/taylor-swift/cardigan.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','Vintage tee, brand new phone...'),

-- Ariana Grande
('Thank U, Next','thank-u-next',(SELECT id FROM artists WHERE slug='ariana-grande'),207,'Pop',2018,'/music/ariana-grande/thank-u-next.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','Thought I''d end up with Sean but he wasn''t a match...'),
('7 Rings','7-rings',(SELECT id FROM artists WHERE slug='ariana-grande'),179,'Pop',2019,'/music/ariana-grande/7-rings.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','Yeah, breakfast at Tiffany''s and bottles of bubbles...'),
('Positions','positions',(SELECT id FROM artists WHERE slug='ariana-grande'),172,'Pop',2020,'/music/ariana-grande/positions.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','Heaven sent you to me, I''m just hoping I don''t repeat history...'),
('God is a woman','god-is-a-woman',(SELECT id FROM artists WHERE slug='ariana-grande'),197,'Pop',2018,'/music/ariana-grande/god-is-a-woman.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','You love it how I move you, you love it how I touch you...'),
('Break Free','break-free',(SELECT id FROM artists WHERE slug='ariana-grande'),208,'Pop',2014,'/music/ariana-grande/break-free.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','This is the part when I say I don''t want ya...'),

-- Reality Club
('Am I Boring You?','am-i-boring-you',(SELECT id FROM artists WHERE slug='reality-club'),240,'Indie Rock',2019,'/music/reality-club/am-i-boring-you.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','Am I boring you? Tell me what you want to do...'),
('Never Get Better','never-get-better',(SELECT id FROM artists WHERE slug='reality-club'),220,'Indie Rock',2019,'/music/reality-club/never-get-better.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','It never gets better, it never gets better...'),
('Ellipsis','ellipsis',(SELECT id FROM artists WHERE slug='reality-club'),195,'Indie Rock',2020,'/music/reality-club/ellipsis.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','Three dots in a row, what does it mean?'),
('The Answer','the-answer',(SELECT id FROM artists WHERE slug='reality-club'),210,'Indie Rock',2021,'/music/reality-club/the-answer.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','Looking for the answer, but I don''t know where to start...'),
('Friendly Fire','friendly-fire',(SELECT id FROM artists WHERE slug='reality-club'),225,'Indie Rock',2021,'/music/reality-club/friendly-fire.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','Friendly fire, friendly fire...'),

-- wave to earth
('seasons','seasons',(SELECT id FROM artists WHERE slug='wave-to-earth'),180,'Indie Pop',2021,'/music/wave-to-earth/seasons.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','Seasons change, but you stay the same...'),
('light','light',(SELECT id FROM artists WHERE slug='wave-to-earth'),195,'Indie Pop',2021,'/music/wave-to-earth/light.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','You are the light in my darkness...'),
('love.','love',(SELECT id FROM artists WHERE slug='wave-to-earth'),200,'Indie Pop',2022,'/music/wave-to-earth/love.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','Love is all we need...'),
('bad','bad',(SELECT id FROM artists WHERE slug='wave-to-earth'),185,'Indie Pop',2022,'/music/wave-to-earth/bad.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','Sometimes I feel so bad...'),
('nouvelle vague','nouvelle-vague',(SELECT id FROM artists WHERE slug='wave-to-earth'),190,'Indie Pop',2023,'/music/wave-to-earth/nouvelle-vague.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','Nouvelle vague, nouvelle vague...'),

-- Green Day
('American Idiot','american-idiot',(SELECT id FROM artists WHERE slug='green-day'),174,'Punk Rock',2004,'/music/green-day/american-idiot.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','Don''t want to be an American idiot...'),
('Basket Case','basket-case',(SELECT id FROM artists WHERE slug='green-day'),182,'Punk Rock',1994,'/music/green-day/basket-case.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','Do you have the time to listen to me whine?'),
('Good Riddance','good-riddance',(SELECT id FROM artists WHERE slug='green-day'),151,'Punk Rock',1997,'/music/green-day/good-riddance.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','Another turning point, a fork stuck in the road...'),
('Wake Me Up When September Ends','wake-me-up-when-september-ends',(SELECT id FROM artists WHERE slug='green-day'),285,'Punk Rock',2004,'/music/green-day/wake-me-up-when-september-ends.mp3','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS8FZwIL_mtaTtYajSm7lvQNi3ZNS4mHEyVi-DIvceCByCFd85YXQaYMAVJ37tq_4EtxIYMBeEiU9WDH66uA_hcYWUpz_BOt0L375OW6Jew5Q','Summer has come and passed...'),
('21 Guns','21-guns',(SELECT id FROM artists WHERE slug='green-day'),323,'Punk Rock',2009,'/music/green-day/21-guns.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','Do you know what''s worth fighting for?'),

-- Ed Sheeran
('Shape of You','shape-of-you',(SELECT id FROM artists WHERE slug='ed-sheeran'),233,'Folk Pop',2017,'/music/ed-sheeran/shape-of-you.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','The club isn''t the best place to find a lover...'),
('Perfect','perfect',(SELECT id FROM artists WHERE slug='ed-sheeran'),263,'Folk Pop',2017,'/music/ed-sheeran/perfect.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','I found a love for me...'),
('Thinking Out Loud','thinking-out-loud',(SELECT id FROM artists WHERE slug='ed-sheeran'),281,'Folk Pop',2014,'/music/ed-sheeran/thinking-out-loud.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','When your legs don''t work like they used to before...'),
('Photograph','photograph',(SELECT id FROM artists WHERE slug='ed-sheeran'),258,'Folk Pop',2014,'/music/ed-sheeran/photograph.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','Loving can hurt, loving can hurt sometimes...'),
('Castle on the Hill','castle-on-the-hill',(SELECT id FROM artists WHERE slug='ed-sheeran'),261,'Folk Pop',2017,'/music/ed-sheeran/castle-on-the-hill.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','When I was six years old I broke my leg...'),

-- Billie Eilish
('bad guy','bad-guy',(SELECT id FROM artists WHERE slug='billie-eilish'),194,'Alternative Pop',2019,'/music/billie-eilish/bad-guy.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','White shirt now red, my bloody nose...'),
('when the party''s over','when-the-partys-over',(SELECT id FROM artists WHERE slug='billie-eilish'),196,'Alternative Pop',2018,'/music/billie-eilish/when-the-partys-over.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','Don''t you know I''m no good for you?'),
('everything i wanted','everything-i-wanted',(SELECT id FROM artists WHERE slug='billie-eilish'),247,'Alternative Pop',2019,'/music/billie-eilish/everything-i-wanted.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','I had a dream I got everything I wanted...'),
('lovely','lovely',(SELECT id FROM artists WHERE slug='billie-eilish'),200,'Alternative Pop',2018,'/music/billie-eilish/lovely.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','Thought I found a way, thought I found a way out...'),
('bury a friend','bury-a-friend',(SELECT id FROM artists WHERE slug='billie-eilish'),194,'Alternative Pop',2019,'/music/billie-eilish/bury-a-friend.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','What do you want from me? Why don''t you run from me?'),

-- The Weeknd
('Blinding Lights','blinding-lights',(SELECT id FROM artists WHERE slug='the-weeknd'),200,'R&B',2019,'/music/the-weeknd/blinding-lights.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','I been tryna call, I been on my own for long enough...'),
('Starboy','starboy',(SELECT id FROM artists WHERE slug='the-weeknd'),230,'R&B',2016,'/music/the-weeknd/starboy.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','I''m a motherfuckin'' starboy...'),
('The Hills','the-hills',(SELECT id FROM artists WHERE slug='the-weeknd'),237,'R&B',2015,'/music/the-weeknd/the-hills.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','Your man on the road, he doin'' promo...'),
('Save Your Tears','save-your-tears',(SELECT id FROM artists WHERE slug='the-weeknd'),215,'R&B',2020,'/music/the-weeknd/save-your-tears.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','I saw you dancing in a crowded room...'),
('Can''t Feel My Face','cant-feel-my-face',(SELECT id FROM artists WHERE slug='the-weeknd'),213,'R&B',2015,'/music/the-weeknd/cant-feel-my-face.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','And I know she''ll be the death of me...'),

-- Olivia Rodrigo
('drivers license','drivers-license',(SELECT id FROM artists WHERE slug='olivia-rodrigo'),242,'Pop Rock',2021,'/music/olivia-rodrigo/drivers-license.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','I got my driver''s license last week...'),
('good 4 u','good-4-u',(SELECT id FROM artists WHERE slug='olivia-rodrigo'),178,'Pop Rock',2021,'/music/olivia-rodrigo/good-4-u.mp3','https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop','Well, good for you, I guess you moved on really easily...'),
('traitor','traitor',(SELECT id FROM artists WHERE slug='olivia-rodrigo'),229,'Pop Rock',2021,'/music/olivia-rodrigo/traitor.mp3','https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop','Brown guilty eyes and little white lies...'),
('brutal','brutal',(SELECT id FROM artists WHERE slug='olivia-rodrigo'),139,'Pop Rock',2021,'/music/olivia-rodrigo/brutal.mp3','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop','I want it to be, like, messy...'),
('happier','happier',(SELECT id FROM artists WHERE slug='olivia-rodrigo'),175,'Pop Rock',2021,'/music/olivia-rodrigo/happier.mp3','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop','I hope you''re happy, but not like how you were with me...');



SELECT * FROM artists ORDER BY name;

SELECT s.*, a.name as artist_name FROM songs s JOIN artists a ON s.artist_id = a.id WHERE a.slug = 'taylor-swift';


SELECT s.*, a.name as artist_name, a.slug as artist_slug FROM songs s JOIN artists a ON s.artist_id = a.id WHERE s.slug = 'love-story';


SELECT * FROM artists WHERE slug = 'taylor-swift';

SELECT COUNT(*) AS songs FROM songs;
