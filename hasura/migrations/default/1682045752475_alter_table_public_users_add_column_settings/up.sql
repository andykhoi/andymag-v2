alter table "public"."users" add column "settings" jsonb
 null default '{ "autoCollapseHeader": false }';
