/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "authorId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "post_authorId_key" ON "post"("authorId");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
