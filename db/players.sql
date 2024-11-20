CREATE TABLE laps
(
    id         INTEGER PRIMARY KEY,
    name       TEXT             NOT NULL,
    timing     DOUBLE PRECISION NOT NULL,
    track      TEXT             NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);