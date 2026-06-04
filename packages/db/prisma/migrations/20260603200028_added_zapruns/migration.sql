/*
  Warnings:

  - You are about to drop the column `zapId` on the `ZapRunOutbox` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_zapId_fkey";

-- AlterTable
ALTER TABLE "ZapRunOutbox" DROP COLUMN "zapId";
