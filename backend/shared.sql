\echo 'Delete and recreate shared db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE shared;
CREATE DATABASE shared;
\connect shared

\i shared-schema.sql
\i shared-seed.sql

-- \echo 'Delete and recreate jobly_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE jobly_test;
-- CREATE DATABASE jobly_test;
-- \connect jobly_test

-- \i jobly-schema.sql
