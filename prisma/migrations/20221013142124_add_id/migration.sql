/*
  Warnings:

  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `reservedrooms` DROP FOREIGN KEY `reservedRooms_userId_fkey`;

-- AlterTable
ALTER TABLE `customers` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reservedrooms` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `reservedRooms` ADD CONSTRAINT `reservedRooms_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
