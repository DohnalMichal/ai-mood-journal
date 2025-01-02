/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
