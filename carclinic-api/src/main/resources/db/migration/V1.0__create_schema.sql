create sequence hibernate_sequence START WITH 100 INCREMENT BY 1;

create table "vehicles"
(
    "vin"                varchar(32) not null,
    "make"               varchar(64) not null,
    "model"              varchar(64) not null,
    "color"              varchar(32) not null,    
    "year"               integer     not null,
    "mileage"            integer     not null,
    "last_service_date"  date        not null,
    "next_service_date"  date        not null
);

alter table "vehicles"
    add constraint "vehicles_pk" primary key ("vin");

create table "owners"
(
    "id"          bigint      not null,
    "first_name"  varchar(128) not null,
    "last_name"   varchar(128) not null,
    "email"       varchar(256) not null,
    "phone_number" varchar(32)  not null
);
alter table "owners"
    add constraint "owners_pk" primary key ("id");

create table "staff"
(
    "id"          bigint      not null,
    "first_name"  varchar(128) not null,
    "last_name"   varchar(128) not null,
    "email"       varchar(256) not null,
    "phone_number" varchar(32)  not null
);
alter table "staff"
    add constraint "staff_pk" primary key ("id");