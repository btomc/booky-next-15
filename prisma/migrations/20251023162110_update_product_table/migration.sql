/*
  Warnings:

  - You are about to drop the column `genres` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "genres",
ADD COLUMN     "genre" TEXT[];
