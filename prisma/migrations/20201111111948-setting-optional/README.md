# Migration `20201111111948-setting-optional`

This migration has been generated by b_bado at 11/11/2020, 11:19:48 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Settings" (
"createdAt" DATE  DEFAULT CURRENT_TIMESTAMP ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"importData" BOOLEAN  DEFAULT false ,"includeDesc" BOOLEAN  DEFAULT false ,"includeImg" BOOLEAN  DEFAULT false ,"keepLevels" BOOLEAN  DEFAULT false ,"location" TEXT  DEFAULT '' ,"storeId" INTEGER NOT NULL  ,"updatedAt" DATE   )

INSERT INTO "quaint"."new_Settings" ("createdAt", "id", "importData", "includeDesc", "includeImg", "keepLevels", "location", "storeId", "updatedAt") SELECT "createdAt", "id", "importData", "includeDesc", "includeImg", "keepLevels", "location", "storeId", "updatedAt" FROM "quaint"."Settings"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Settings";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Settings" RENAME TO "Settings";

CREATE UNIQUE INDEX "quaint"."Settings.storeId" ON "Settings"("storeId")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201109132827-settings..20201111111948-setting-optional
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -28,14 +28,14 @@
   updatedAt   String?
 }
 model Settings {
-  id          Int     @default(autoincrement()) @id
-  storeId     Int     @unique
-  location    String
-  importData  Boolean
-  includeDesc Boolean
-  includeImg  Boolean
-  keepLevels  Boolean
-  createdAt   DateTime @default(now())
-  updatedAt   DateTime @updatedAt
+  id          Int         @default(autoincrement()) @id
+  storeId     Int         @unique
+  location    String?     @default("")
+  importData  Boolean?    @default(false)
+  includeDesc Boolean?    @default(false)
+  includeImg  Boolean?    @default(false)
+  keepLevels  Boolean?    @default(false)
+  createdAt   DateTime?   @default(now())
+  updatedAt   DateTime?   @updatedAt
 }
```


