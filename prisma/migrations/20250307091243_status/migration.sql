-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOTPAID', 'PAID');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOTPAID';
