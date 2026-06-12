-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "metadata" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "metadata" JSONB NOT NULL;
