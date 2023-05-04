BEGIN TRANSACTION;
ALTER TABLE "public"."contributors" DROP CONSTRAINT "contributors_pkey";

ALTER TABLE "public"."contributors"
    ADD CONSTRAINT "contributors_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;
