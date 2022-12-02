create table builder.subscription_plans
(
    id              int8            GENERATED ALWAYS AS IDENTITY,
    userId            varchar(200)    not null,
    planCode           varchar(200)    not null,
    primary key (id)
);