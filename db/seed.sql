create table if not exists users (
    user_id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(150) not null,
    password varchar(250) not null
);

create table if not exists transactions (
    transaction_id serial primary key,
    user_id int references users(user_id) not null,
    category varchar(20) not null,
    description varchar(100) not null,
    amount float not null,
    transaction_date date
);