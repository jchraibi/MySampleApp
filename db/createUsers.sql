drop table if exists users;
create table users (
  id int auto_increment,
  first varchar(255) not null,
  last varchar(255) not null,
  email varchar(255) not null,
  primary key (id)
) auto_increment=1;


insert ignore into users values (null, 'Darth', 'Vader', 'darth@empire.org');
insert ignore into users values (null, 'Obi-Wan', 'Kenobi', 'obiwan@jedis.org');
insert ignore into users values (null, 'Han', 'Solo', 'han@rebels.org');
insert ignore into users values (null, 'Kylo', 'Ren', 'kren@darkwarriors.com');
