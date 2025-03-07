/*
  Warnings:

  - A unique constraint covering the columns `[intent_id]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "intent_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Event_intent_id_key" ON "Event"("intent_id");

-- CreateIndex
CREATE INDEX "Event_intent_id_idx" ON "Event"("intent_id");
