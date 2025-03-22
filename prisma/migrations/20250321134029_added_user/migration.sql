-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ThemeNo" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Viewers" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "gitLink" TEXT,
ADD COLUMN     "instaLink" TEXT,
ADD COLUMN     "linkedinLink" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "website" TEXT;
