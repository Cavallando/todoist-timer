/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Timer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Timer` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Timer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Timer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timer" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "auto_close_task_enabled" BOOLEAN NOT NULL DEFAULT true,
    "timer_comments_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Timer.task_id_unique" RENAME TO "Timer_task_id_key";
