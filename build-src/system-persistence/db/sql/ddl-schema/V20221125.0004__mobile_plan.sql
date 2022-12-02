create table builder.mobile_plans
(
    id              int8            GENERATED ALWAYS AS IDENTITY,
    name            varchar(200)    not null,
    code           varchar(200)    not null,
    primary key (id)
);