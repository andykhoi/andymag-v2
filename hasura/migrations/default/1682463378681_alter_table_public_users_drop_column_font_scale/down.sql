comment on column "public"."users"."font_scale" is E'dev users table ';
alter table "public"."users" alter column "font_scale" set default ''md'::text';
alter table "public"."users" alter column "font_scale" drop not null;
alter table "public"."users" add column "font_scale" text;
