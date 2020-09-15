Create table restaurants(
    id bigserial not null primary key,
    name varchar(50) not null ,
    location varchar(50) not null ,
    price_range int not null check(price_range >=1 and price_range <=5)

);

create table reviews(
    id bigserial not null PRIMARY key,
    restaurant_id bigint not null REFERENCES restaurants(id),
    name VARCHAR(50) not null,
    review text not null,
    rating int not null check(rating >=1 and rating  <=5)
);