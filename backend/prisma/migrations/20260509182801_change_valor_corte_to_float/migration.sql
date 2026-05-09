/*
  Warnings:

  - You are about to alter the column `valor_corte` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "valor_corte" SET DATA TYPE DOUBLE PRECISION;
