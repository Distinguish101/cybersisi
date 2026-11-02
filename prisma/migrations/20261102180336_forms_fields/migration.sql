-- CreateEnum
CREATE TYPE "PartnerInterest" AS ENUM ('SPONSOR', 'HOST', 'FUND', 'OTHER');

-- AlterEnum
ALTER TYPE "SubmissionStatus" ADD VALUE 'ACCEPTED';

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "howHeard" TEXT,
ADD COLUMN     "interest" "PartnerInterest",
ADD COLUMN     "lastContactedAt" TIMESTAMP(3),
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" TEXT;
