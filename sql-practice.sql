-- Task 21.5: SQL Fundamentals (SQLite) Exercise
-- This file demonstrates basic SQL operations for CommunityHub

-- Create users table
CREATE TABLE users (
  id       INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email    TEXT NOT NULL UNIQUE
);

-- Create posts table with foreign key reference
CREATE TABLE posts (
  id      INTEGER PRIMARY KEY,
  author_id INTEGER NOT NULL,
  title   TEXT NOT NULL,
  content TEXT NOT NULL,
  likes   INTEGER DEFAULT 0,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Insert sample users
INSERT INTO users (username, email) VALUES
  ('maisori', 'maisori@example.com'),
  ('amina', 'amina@example.com'),
  ('james', 'james@example.com');

-- Insert sample posts
INSERT INTO posts (author_id, title, content, likes) VALUES
  (1, 'Hello SQL', 'Learning SQL is fun and powerful', 3),
  (2, 'Joins are fun', 'SQL JOINs allow us to combine data from multiple tables', 7),
  (1, 'Second post', 'My second contribution to the community', 1),
  (3, 'Database Design', 'Best practices for designing relational databases', 12),
  (2, 'Query Optimization', 'Tips for writing efficient SQL queries', 5);

-- Query 1: Select all posts ordered by likes (descending)
SELECT id, title, likes, author_id FROM posts ORDER BY likes DESC;

-- Query 2: Select posts by specific author (WHERE clause)
SELECT id, title, content, likes FROM posts WHERE author_id = 1 ORDER BY likes DESC;

-- Query 3: Select posts by author name using JOIN
SELECT p.id, p.title, p.content, p.likes, u.username, u.email
FROM posts p
INNER JOIN users u ON p.author_id = u.id
WHERE u.username = 'maisori'
ORDER BY p.likes DESC;

-- Query 4: Get all posts with author information (JOIN)
SELECT p.id, p.title, p.likes, u.username, u.email
FROM posts p
INNER JOIN users u ON p.author_id = u.id
ORDER BY p.likes DESC;

-- Query 5: Count posts per author
SELECT u.username, COUNT(p.id) as post_count, AVG(p.likes) as avg_likes
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
GROUP BY u.id, u.username
ORDER BY post_count DESC;

-- Query 6: Get posts with likes > 3
SELECT id, title, likes FROM posts WHERE likes > 3 ORDER BY likes DESC;
