CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE chat(
   msg_id uuid DEFAULT uuid_generate_v4 (),
   msg VARCHAR NOT NULL,
   username VARCHAR NOT NULL,
   time TIMESTAMPTZ NOT NULL,
   room VARCHAR NOT NULL,
   CONSTRAINT chat_pkey PRIMARY KEY (msg_id)
);

CREATE FUNCTION chat_delete_old_rows() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM chat WHERE time < NOW() - INTERVAL '1 day';
  RETURN NEW;
END;
$$;

CREATE TRIGGER chat_delete_old_rows_trigger
    AFTER INSERT ON chat
    EXECUTE PROCEDURE chat_delete_old_rows();