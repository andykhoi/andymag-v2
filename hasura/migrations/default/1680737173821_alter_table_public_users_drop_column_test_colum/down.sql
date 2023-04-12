comment on column "public"."users"."test_colum" is E'dev users table ';
alter table "public"."users" alter column "test_colum" drop not null;
alter table "public"."users" add column "test_colum" text;
