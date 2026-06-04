/*
  Warnings:

  - Added the required column `metadata` to the `ZapRun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zapId` to the `ZapRunOutbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ZapRun" ADD COLUMN     "metadata" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "ZapRunOutbox" ADD COLUMN     "zapId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
