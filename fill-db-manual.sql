/* users */
INSERT INTO users(email, first_name, last_name, password_hash, avatar) VALUES
('ivanov@example.com',  'Иван', 'Иванов','5f4dcc3b5aa765d61d8327deb882cf99', 'avatar1.jpg'),
('petrov@example.com', 'Пётр', 'Петров','5f4dcc3b5aa765d61d8327deb882cf99', 'avatar2.jpg');

/* categories */
INSERT INTO categories(name) VALUES
('Деревья'),
('За жизнь'),
('Без рамки'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Программирование'),
('Разное'),
('Железо');

/* articles */
ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, announce, full_text, user_id) VALUES
('Ёлки. История деревьев', 'Ёлки — это не просто красивое дерево.', 'Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 1),
('Как перестать беспокоиться и начать жить', 'Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 'Вы можете достичь всего. Стоит только немного постараться и запастись книгами.
Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.', 2),
('Учим HTML и CSS', 'Игры и программирование разные вещи.', 'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.', 3);
ALTER TABLE articles ENABLE TRIGGER ALL;

/* comments */
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, article_id, user_id) VALUES
('Это где ж такие красоты?', 1, 1),
('Ноутбуки победили.', 1, 2),
('Хочу такую же футболку :-)', 2, 1),
('Плюсую но слишком много буквы!', 2, 1),
('Планируете записать видосик на эту тему?', 2, 2),
('Давно не пользуюсь стационарными компьютерами.', 3, 1),
('Мне не нравится ваш стиль. Ощущение что вы меня поучаете.', 3, 2);
ALTER TABLE comments ENABLE TRIGGER ALL;

/* articles_categories */
ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories(article_id, category_id) VALUES
(1, 4),
(2, 5),
(3, 6);
ALTER TABLE articles_categories ENABLE TRIGGER ALL;
