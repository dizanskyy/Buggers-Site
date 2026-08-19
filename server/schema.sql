-- ==========================================================
-- BUGGERS ACADEMY - POSTGRESQL PRODUCTION SCHEMA
-- ==========================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  username VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(64) DEFAULT 'developer',
  avatar VARCHAR(64) DEFAULT 'code',
  bio TEXT DEFAULT '',
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 1,
  selected_track VARCHAR(64) DEFAULT 'frontend',
  learning_mode VARCHAR(64) DEFAULT 'full_track',
  selected_language VARCHAR(64) DEFAULT '',
  last_active VARCHAR(32),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. User Lesson Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(64) NOT NULL,
  track_id VARCHAR(64) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  score INTEGER DEFAULT 100,
  code_submission TEXT DEFAULT '',
  CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);

-- 3. User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id VARCHAR(64) NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_achievement UNIQUE (user_id, achievement_id)
);

-- 4. Daily Activity Heatmap Table
CREATE TABLE IF NOT EXISTS daily_activity (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date VARCHAR(32) NOT NULL,
  count INTEGER DEFAULT 1,
  xp_earned INTEGER DEFAULT 0,
  CONSTRAINT unique_user_date UNIQUE (user_id, date)
);

-- 5. Bookmarks Table
CREATE TABLE IF NOT EXISTS user_bookmarks (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(64) NOT NULL,
  track_id VARCHAR(64) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_bookmark UNIQUE (user_id, lesson_id)
);

-- 6. Indexes for Maximum Performance
CREATE INDEX IF NOT EXISTS idx_users_xp ON users (xp DESC);
CREATE INDEX IF NOT EXISTS idx_progress_user_track ON user_progress (user_id, track_id);
CREATE INDEX IF NOT EXISTS idx_activity_user_date ON daily_activity (user_id, date);
