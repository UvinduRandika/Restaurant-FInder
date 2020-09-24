Create table restaurants(
    id bigserial not null primary key,
    client_id bigint not null REFERENCES clients(id),
    name varchar(50) not null ,
    location varchar(50) not null ,
    price_range int not null check(price_range >=1 and price_range <=5)

);

create table reviews(
    id bigserial not null PRIMARY key,
    restaurant_id bigint not null REFERENCES restaurants(id),
    client_id bigint not null REFERENCES clients(id),
    name VARCHAR(50) not null,
    review text not null,
    rating int not null check(rating >=1 and rating  <=5)
);

create TABLE clients(
    id bigserial not null PRIMARY key,
    name varchar(50) not null,
    PASSWORD varchar(50) not null
);

select * from restaurants left join (select restaurant_id, count(*),
trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) 
reviews on restaurant.id=reviews.restaurant_id;