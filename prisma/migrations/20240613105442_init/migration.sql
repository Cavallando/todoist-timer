-- CreateTable
CREATE TABLE "Timer" (
    "id" SERIAL NOT NULL,
    "task_id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "todoist_id" TEXT NOT NULL,
    "auto_close_task_enabled" BOOLEAN NOT NULL DEFAULT true,
    "timer_comments_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timer_task_id_key" ON "Timer"("task_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_todoist_id_key" ON "User"("todoist_id");

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
