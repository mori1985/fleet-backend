CREATE TABLE vehicles (
       id SERIAL PRIMARY KEY,
       name VARCHAR(50) NOT NULL,
       lat DOUBLE PRECISION NOT NULL,
       lng DOUBLE PRECISION NOT NULL,
       status VARCHAR(20) CHECK (status IN ('moving', 'stopped', 'idle')) NOT NULL,
       distance DOUBLE PRECISION NOT NULL,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     INSERT INTO vehicles (name, lat, lng, status, distance)
     VALUES 
       ('Truck A', 35.6895, 51.3890, 'moving', 120.5),
       ('Truck B', 35.7000, 51.4000, 'stopped', 80.3),
       ('Truck C', 35.6800, 51.4100, 'idle', 200.7);