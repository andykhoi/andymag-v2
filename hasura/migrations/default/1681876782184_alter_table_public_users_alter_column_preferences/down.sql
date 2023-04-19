alter table "public"."users" alter column "preferences" set default '{"font_size": "md", "auto_collapse_header": false}'::jsonb;
