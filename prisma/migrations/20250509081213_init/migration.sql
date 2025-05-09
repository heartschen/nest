-- CreateTable
CREATE TABLE `t_user` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'SUPPER') NULL DEFAULT 'USER',
    `weChatOpenId` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NULL DEFAULT 'ACTIVE',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,
    `deleteTime` DATETIME(3) NULL,
    `deleteFlag` ENUM('NORMAL', 'DELETED') NOT NULL DEFAULT 'NORMAL',

    UNIQUE INDEX `t_user_username_key`(`username`),
    UNIQUE INDEX `t_user_weChatOpenId_key`(`weChatOpenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
