insert into vehicles (vin, make, model, year, color, mileage, last_service_date, next_service_date) values
('1HGCM82633A123456', 'Honda', 'Accord', 2020, 'Blue', 15000, '2023-01-15', '2024-01-15'),
('1HGCM82633A123457', 'Toyota', 'Camry', 2019, 'Red', 20000, '2023-02-15', '2024-02-15'),
('1HGCM82633A123458', 'Ford', 'Fusion', 2018, 'Black', 25000, '2023-03-15', '2024-03-15'),
('1HGCM82633A123459', 'Chevrolet', 'Malibu', 2021, 'White', 10000, '2023-04-15', '2024-04-15'),
('1HGCM82633A123450', 'Nissan', 'Altima', 2022, 'Silver', 5000, '2023-05-15', '2024-05-15');

insert into customers (id, first_name, last_name, email, phone_number) values
(nextval('hibernate_sequence'), 'John', 'Doe', 'john.doe@example.com', '303-555-1234'),
(nextval('hibernate_sequence'), 'Jane', 'Smith', 'jane.smith@example.com', '303-555-2345'),
(nextval('hibernate_sequence'), 'Emily', 'Johnson', 'emily.johnson@example.com', '303-555-3456'),
(nextval('hibernate_sequence'), 'Michael', 'Williams', 'michael.williams@example.com', '303-555-4567'),
(nextval('hibernate_sequence'), 'Sarah', 'Brown', 'sarah.brown@example.com', '303-555-5678');
