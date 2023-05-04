alter table "public"."contributors" alter column "test" drop not null;
alter table "public"."contributors" add column "test" text;
