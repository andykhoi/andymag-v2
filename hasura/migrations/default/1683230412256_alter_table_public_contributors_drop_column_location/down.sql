alter table "public"."contributors" alter column "location" set default ''Bologna, Italy'::text';
alter table "public"."contributors" alter column "location" drop not null;
alter table "public"."contributors" add column "location" text;
