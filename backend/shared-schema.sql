CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE hobbies (
  id SERIAL PRIMARY KEY,
  activity TEXT NOT NULL,
  user_username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

