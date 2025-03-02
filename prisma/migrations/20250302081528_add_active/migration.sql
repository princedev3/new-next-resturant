-- CreateEnum
CREATE TYPE "Archive" AS ENUM ('ACTIVE', 'NOTACTIVE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "active" "Archive" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "active" "Archive" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" "Archive" NOT NULL DEFAULT 'ACTIVE';
