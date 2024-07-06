-- CreateTable
CREATE TABLE `refer_earn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `referrerName` VARCHAR(191) NULL,
    `referrerEmail` VARCHAR(191) NULL,
    `refereeName` VARCHAR(191) NULL,
    `refereeEmail` VARCHAR(191) NULL,
    `message` VARCHAR(191) NULL,
    `referredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
