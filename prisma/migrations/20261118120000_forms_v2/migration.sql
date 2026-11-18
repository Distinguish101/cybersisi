-- Forms v2 (2026-11-18): the founder's new form copy. See docs/LOG.md, Stage 5.2.
-- Hand-edited after `prisma migrate diff`: firstName is RENAMED to name (not dropped and re-added),
-- and the old single partner `interest` is carried into the new `partnerHelp` list before it is dropped.
-- Not purely additive: acceptable only because nothing is deployed yet (no pods running old code).

-- CreateEnum
CREATE TYPE "SubmitterRole" AS ENUM ('SELF', 'PARENT', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "MemberInterest" AS ENUM ('ONLINE_SAFETY', 'CYBER_BASICS', 'ETHICAL_HACKING', 'CAREERS');

-- CreateEnum
CREATE TYPE "MentorSkill" AS ENUM ('SECURITY', 'SOFTWARE_CLOUD', 'CAREERS', 'TALKS');

-- CreateEnum
CREATE TYPE "MentorTime" AS ENUM ('HOUR_A_MONTH', 'TWO_HOURS_A_MONTH', 'HOUR_A_WEEK', 'ONE_OFF');

-- CreateEnum
CREATE TYPE "MentorFormat" AS ENUM ('ONLINE', 'IN_PERSON', 'EITHER');

-- CreateEnum
CREATE TYPE "OrganisationType" AS ENUM ('SCHOOL', 'WOMEN_YOUTH', 'COMPANY', 'FUNDER', 'PUBLIC_BODY', 'OTHER');

-- CreateEnum
CREATE TYPE "PartnerHelp" AS ENUM ('FUNDING', 'SPACE', 'REFERRALS', 'MENTORS_JOBS');

-- CreateEnum
CREATE TYPE "FundingRange" AS ENUM ('UNDER_5K', 'FROM_5K_TO_25K', 'FROM_25K_TO_100K', 'OVER_100K', 'DISCUSS');

-- RenameColumn
ALTER TABLE "Submission" RENAME COLUMN "firstName" TO "name";

-- AlterTable
ALTER TABLE "Submission"
ADD COLUMN     "area" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "fundingRange" "FundingRange",
ADD COLUMN     "interests" "MemberInterest"[],
ADD COLUMN     "mentorFormat" "MentorFormat",
ADD COLUMN     "mentorSkills" "MentorSkill"[],
ADD COLUMN     "mentorTime" "MentorTime",
ADD COLUMN     "organisationType" "OrganisationType",
ADD COLUMN     "partnerHelp" "PartnerHelp"[],
ADD COLUMN     "spaceDetails" TEXT,
ADD COLUMN     "submitterRole" "SubmitterRole";

-- Carry the old single choice into the new list (SPONSOR/FUND -> FUNDING, HOST -> SPACE; OTHER has no equivalent)
UPDATE "Submission" SET "partnerHelp" = ARRAY['FUNDING']::"PartnerHelp"[] WHERE "interest" IN ('SPONSOR', 'FUND');
UPDATE "Submission" SET "partnerHelp" = ARRAY['SPACE']::"PartnerHelp"[] WHERE "interest" = 'HOST';
ALTER TABLE "Submission" DROP COLUMN "interest";

-- DropEnum
DROP TYPE "PartnerInterest";

