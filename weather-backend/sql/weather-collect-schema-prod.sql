drop database if exists weather_collect;
create database weather_collect;

use weather_collect;

create table weather_collection (
    weather_collection_id int primary key auto_increment,
    `name` varchar(50) not null,
    `description` varchar(250)
);

create table weather_forecast (
    weather_forecast_id int primary key auto_increment,
    `name` varchar(50) not null,
    `notes` varchar(250),
    latitude float(10, 6) not null,
    longitude float(10, 6) not null,
    weather_collection_id int not null,
    constraint fk_forecast_weather_collection_id
        foreign key (weather_collection_id)
        references weather_collection(weather_collection_id)
);

insert into weather_collection (weather_collection_id, `name`, `description`) values
    (1, 'Utah Base Jumping', 'Forecasts for base jumps around Utah'),
    (2, 'Utah Speedflying', 'Forecasts for speedfly launches around Utah');

insert into weather_forecast (weather_forecast_id, `name`, `notes`, latitude, longitude, weather_collection_id) values
    (1, 'Pyramid', 'Near Mt. Timp', 40.223582, -111.589052, 1),
    (2, 'Black Dragon', 'Between Moab and SLC', 39.327127, -110.960925, 1),
    (3, 'Cherry', 'Go to speedfly run', 40.530567, -111.801141, 2),
    (4, 'North Side', 'Go to evening run', 40.471388, -111.882916, 2);