create table builder.client
(
    id              int8            GENERATED ALWAYS AS IDENTITY,
    name            varchar(200)    not null,
    email           varchar(200)    not null,
    primary key (id)
);