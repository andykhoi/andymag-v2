alter table "public"."users" add column "formatting" jsonb
 not null default '{ "fontScale": "md" }';
