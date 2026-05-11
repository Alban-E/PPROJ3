-- PostgreSQL Database Dump
-- Generated from MySQL to PostgreSQL conversion
-- Database: pproj3

-- Create database
-- CREATE DATABASE pproj3;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set session defaults
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

-- ============================================
-- Table: users
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  login VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  oauth_provider VARCHAR(50),
  oauth_id VARCHAR(100),
  username VARCHAR(20) NOT NULL DEFAULT 'Username',
  avatar_url VARCHAR(255),
  bio TEXT,
  is_private BOOLEAN NOT NULL DEFAULT true,
  admin VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (admin IN ('user', 'administrator'))
);

-- ============================================
-- Table: tracks
-- ============================================
CREATE TABLE IF NOT EXISTS tracks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  releaseDate DATE,
  apiId VARCHAR(100) NOT NULL,
  imageUrl VARCHAR(255),
  listeners INT NOT NULL,
  artist VARCHAR(50) NOT NULL
);

-- ============================================
-- Table: chats
-- ============================================
CREATE TABLE IF NOT EXISTS chats (
  id SERIAL PRIMARY KEY
);

-- ============================================
-- Table: chat_info
-- ============================================
CREATE TABLE IF NOT EXISTS chat_info (
  id SERIAL PRIMARY KEY,
  id_user1 INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_user2 INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_chat INT NOT NULL REFERENCES chats(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chat_info_user1 ON chat_info(id_user1);
CREATE INDEX IF NOT EXISTS idx_chat_info_user2 ON chat_info(id_user2);
CREATE INDEX IF NOT EXISTS idx_chat_info_chat ON chat_info(id_chat);

-- ============================================
-- Table: messages
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  "time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: chat_message
-- ============================================
CREATE TABLE IF NOT EXISTS chat_message (
  id SERIAL PRIMARY KEY,
  id_chat INT NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  id_message INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  id_sender INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chat_message_chat ON chat_message(id_chat);
CREATE INDEX IF NOT EXISTS idx_chat_message_message ON chat_message(id_message);
CREATE INDEX IF NOT EXISTS idx_chat_message_sender ON chat_message(id_sender);

-- ============================================
-- Table: comments
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  comment VARCHAR(255) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: feedbacks
-- ============================================
CREATE TABLE IF NOT EXISTS feedbacks (
  id SERIAL PRIMARY KEY,
  rating INT,
  comment VARCHAR(255),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: feedback_comment
-- ============================================
CREATE TABLE IF NOT EXISTS feedback_comment (
  id SERIAL PRIMARY KEY,
  id_original INT NOT NULL REFERENCES feedbacks(id) ON DELETE CASCADE,
  id_comment INT NOT NULL REFERENCES comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_feedback_comment_original ON feedback_comment(id_original);
CREATE INDEX IF NOT EXISTS idx_feedback_comment_comment ON feedback_comment(id_comment);

-- ============================================
-- Table: track_feedback
-- ============================================
CREATE TABLE IF NOT EXISTS track_feedback (
  id SERIAL PRIMARY KEY,
  track_id INT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  feedback_id INT NOT NULL REFERENCES feedbacks(id) ON DELETE CASCADE
);

-- ============================================
-- Table: user_feedback
-- ============================================
CREATE TABLE IF NOT EXISTS user_feedback (
  id SERIAL PRIMARY KEY,
  id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_feedback INT NOT NULL REFERENCES feedbacks(id) ON DELETE CASCADE,
  liked BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_user_feedback_user ON user_feedback(id_user);
CREATE INDEX IF NOT EXISTS idx_user_feedback_feedback ON user_feedback(id_feedback);

-- ============================================
-- Table: user_comment
-- ============================================
CREATE TABLE IF NOT EXISTS user_comment (
  id SERIAL PRIMARY KEY,
  id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_comment INT NOT NULL REFERENCES comments(id) ON DELETE CASCADE
);

-- ============================================
-- Table: notifications
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  content VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('new_message', 'new_subscriber', 'new_track'))
);

-- ============================================
-- Table: user_notification
-- ============================================
CREATE TABLE IF NOT EXISTS user_notification (
  id SERIAL PRIMARY KEY,
  id_notification INT NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
  id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_read BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_user_notification_notif ON user_notification(id_notification);
CREATE INDEX IF NOT EXISTS idx_user_notification_user ON user_notification(id_user);

-- ============================================
-- Table: activity_feed
-- ============================================
CREATE TABLE IF NOT EXISTS activity_feed (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL CHECK (type IN ('rate', 'feedback', 'comment', 'add_to_list', 'new_list')),
  id_activity INT NOT NULL,
  id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: lists
-- ============================================
CREATE TABLE IF NOT EXISTS lists (
  id SERIAL PRIMARY KEY,
  id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL DEFAULT 'New List',
  private BOOLEAN NOT NULL DEFAULT true,
  creation_date DATE DEFAULT CURRENT_DATE
);

-- ============================================
-- Table: list_info
-- ============================================
CREATE TABLE IF NOT EXISTS list_info (
  id SERIAL PRIMARY KEY,
  id_list INT NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  id_track VARCHAR(255) NOT NULL
);

-- ============================================
-- Table: subscribed_user
-- ============================================
CREATE TABLE IF NOT EXISTS subscribed_user (
  id SERIAL PRIMARY KEY,
  id_subcriber INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_subscribed_user_subscriber ON subscribed_user(id_subcriber);
CREATE INDEX IF NOT EXISTS idx_subscribed_user_user ON subscribed_user(id_user);

-- ============================================
-- Table: bans
-- ============================================
CREATE TABLE IF NOT EXISTS bans (
  id SERIAL PRIMARY KEY,
  id_banned INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_banner INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ban_reason VARCHAR(255) NOT NULL,
  banned_at DATE NOT NULL
);

-- ============================================
-- Table: signals
-- ============================================
CREATE TABLE IF NOT EXISTS signals (
  id SERIAL PRIMARY KEY,
  id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_feedback INT NOT NULL REFERENCES feedbacks(id) ON DELETE CASCADE,
  cause VARCHAR(50) NOT NULL
);