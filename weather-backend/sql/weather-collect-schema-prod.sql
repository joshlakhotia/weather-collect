drop database if exists weather_collect;
create database weather_collect;

use weather_collect;

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

create table weather_collection (
    weather_collection_id int primary key auto_increment,
    `name` varchar(50) not null,
    `description` varchar(250),
    app_user_id int not null,
    constraint fk_collection_app_user_id
        foreign key (app_user_id)
        references app_user(app_user_id)
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

insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into app_user_role
    values
    (1, 2),
    (2, 1);

insert into weather_collection (weather_collection_id, `name`, `description`, app_user_id) values
    (1, 'Utah Base Jumping', 'Forecasts for base jumps around Utah', 1),
    (2, 'Utah Speedflying', 'Forecasts for speedfly launches around Utah', 1);

insert into weather_forecast (weather_forecast_id, `name`, `notes`, latitude, longitude, weather_collection_id) values
    (1, 'Pyramid', 'Near Mt. Timp', 40.223582, -111.589052, 1),
    (2, 'Black Dragon', 'Between Moab and SLC', 39.327127, -110.960925, 1),
    (3, 'Cherry', 'Go to speedfly run', 40.530567, -111.801141, 2),
    (4, 'North Side', 'Go to evening run', 40.471388, -111.882916, 2);