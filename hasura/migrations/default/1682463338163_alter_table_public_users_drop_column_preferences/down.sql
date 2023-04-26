comment on column "public"."users"."preferences" is E'dev users table ';
alter table "public"."users" alter column "preferences" set default '{"fontSize": "md", "autoCollapseHeader": false}'::jsonb;
alter table "public"."users" alter column "preferences" drop not null;
alter table "public"."users" add column "preferences" jsonb;
