/*
  Warnings:

  - A unique constraint covering the columns `[todoist_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `todoist_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "todoist_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_todoist_id_key" ON "User"("todoist_id");
