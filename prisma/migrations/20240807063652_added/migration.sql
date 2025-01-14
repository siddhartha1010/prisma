/*
  Warnings:

  - You are about to drop the column `authorId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_authorId_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;
