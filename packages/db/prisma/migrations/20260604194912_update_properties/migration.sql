/*
  Warnings:

  - You are about to drop the column `actionId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `availabletriggerId` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the column `zapId` on the `ZapRunOutbox` table. All the data in the column will be lost.
  - Added the required column `availableActionId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableTriggerId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_actionId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_availabletriggerId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_zapId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "actionId",
ADD COLUMN     "availableActionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "availabletriggerId",
ADD COLUMN     "availableTriggerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ZapRunOutbox" DROP COLUMN "zapId";

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_availableTriggerId_fkey" FOREIGN KEY ("availableTriggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_availableActionId_fkey" FOREIGN KEY ("availableActionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
