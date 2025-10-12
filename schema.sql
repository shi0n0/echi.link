CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  anon_id TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  email_hash TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  created_by INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);
