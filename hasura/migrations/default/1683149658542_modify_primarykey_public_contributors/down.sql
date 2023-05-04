alter table "public"."contributors" drop constraint "contributors_pkey";
alter table "public"."contributors"
    add constraint "contributors_pkey"
    primary key ("test");
