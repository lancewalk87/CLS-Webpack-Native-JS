create table posts
(
	id int auto_increment primary key,
	type varchar(255) null,
	content text null,
	userId int null,
	createdAt datetime not null,
	updatedAt datetime not null
);

create table users
(
	id int auto_increment primary key,
	email varchar(255) null,
	firstName varchar(255) null,
	passwordDigest varchar(255) null,
	role varchar(255) null,
	createdAt datetime not null,
	updatedAt datetime not null,
	lastName varchar(255) null
)
;
