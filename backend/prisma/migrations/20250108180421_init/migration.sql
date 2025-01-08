-- CreateTable
CREATE TABLE "FavoriteMovie" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Year" TEXT NOT NULL,
    "Poster" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavoriteMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteMovie_imdbID_key" ON "FavoriteMovie"("imdbID");
