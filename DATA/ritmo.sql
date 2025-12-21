-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: ritmo-mysql:3306
-- Generation Time: Dec 20, 2025 at 06:29 AM
-- Server version: 9.0.1
-- PHP Version: 8.2.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reverent_mayer`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bans`
--

CREATE TABLE `Bans` (
  `id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `expireAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MusicCategories`
--

CREATE TABLE `MusicCategories` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `href` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `MusicCategories`
--

INSERT INTO `MusicCategories` (`id`, `title`, `href`, `icon`, `createdAt`, `updatedAt`, `description`) VALUES
(5, 'خانه', '/', '05bcef9dadc21ea6', '2025-11-24 07:36:14', '2025-11-24 07:36:14', ''),
(6, 'دسته‌بندی', '/categories', '14779d51b9e86ecb', '2025-11-24 07:38:59', '2025-11-24 07:38:59', ''),
(8, 'آلبوم‌ها', '/albums', '48538d0a163c3559', '2025-11-24 07:46:08', '2025-11-24 07:46:08', ''),
(9, 'پلی لیست', '/playlists', '6ad4a001b007eea9', '2025-11-24 07:49:24', '2025-11-24 07:49:24', '');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile` varchar(255) NOT NULL DEFAULT '/uploads/profiles/profile.png',
  `bio` tinytext,
  `isNotification` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `uuid`, `fullName`, `email`, `username`, `password`, `profile`, `bio`, `isNotification`, `createdAt`, `updatedAt`) VALUES
(1, '1765798290948d66ab5ca-f504-4bda-91ed-56f23fb54383', 'امین احمدی', 'aminahmadi070807@gmail.com', 'aminahmadi070807', '$2b$10$kdBowtNgOiRd6nUQ3oU4D.zBpbPZByvuHXNfpWmhodQh7rzHWGy5m', '/uploads/profiles/1765798706047-1d35427ea6fa91492b3013e6a98e4c4f268befb2e2950e4c2045472fd09eb385.jpg', 'در من هست هزار من گر بشکند یک من زاده شود من دیگری', 0, '2025-12-15 11:31:30', '2025-12-15 11:38:26'),
(2, '176587806673273db6f84-d6de-4054-b4ab-f0ede0f35381', 'fatemeh.zahra13800617', 'fatemeh.zahra13800617@gmail.com', 'fatemeh.zahra13800617', '$2b$10$KQBcS3klD4XKQF.rahwbIOnoesGi6bDgvmnVdjjj49m9HjdZpHMwm', '/uploads/profiles/profile.png', '', 0, '2025-12-16 09:41:06', '2025-12-16 09:41:06'),
(3, '1765878074657b4e7e040-5b7c-4bd4-81e1-a7e78f15bd48', 'alirezarashnoo85', 'alirezarashnoo85@gmail.com', 'alirezarashnoo85', '$2b$10$p.pqbATbzfWdI4k9Mo84MOUFuzG.hfVBG/fUP4i7t/DJkJJH0uKCW', '/uploads/profiles/profile.png', '', 0, '2025-12-16 09:41:14', '2025-12-16 09:41:14'),
(4, '176587821636130c351dc-5359-47d5-86c3-56f0f5f05de3', '80malard57', '80malard57@gmail.com', '80malard57', '$2b$10$lTXCitEdGTEd7hcPYVVx2uhI6j3xoxB6AaYiDhVy/89EMXqe4SJsu', '/uploads/profiles/profile.png', '', 0, '2025-12-16 09:43:36', '2025-12-16 09:43:36'),
(5, '17658793509681dfa0b2a-1356-4333-a9f7-157b8960847c', 'omidkh.trader', 'omidkh.trader@gmail.com', 'omidkh.trader', '$2b$10$AtR4kB3kCLtFtVUP3a4Syu6w8DpqjyjB4iFNIS2A1UDkZIYoSDh8W', '/uploads/profiles/profile.png', '', 0, '2025-12-16 10:02:30', '2025-12-16 10:02:30'),
(6, '17658805043260eb0dc83-09b0-48d6-a669-0d165e7e0cc8', 'amirrezazahedi123', 'amirrezazahedi123@gmail.com', 'amirrezazahedi123', '$2b$10$rALrRUK3pTEB1kbbwRr2b.ZakGcQnU7LOL3dJq24xdz1ZZFjmUSR6', '/uploads/profiles/profile.png', '', 0, '2025-12-16 10:21:44', '2025-12-16 10:21:44'),
(7, '1765881726891e9726ae1-c4fe-4697-bf56-8d919473615c', 'alimashhadi910', 'alimashhadi910@gmail.com', 'alimashhadi910', '$2b$10$ono7A5J/NI33roMq/a7fkehSjS/DWZzGBtFXMLJAHe1SjsAbKxp4G', '/uploads/profiles/profile.png', '', 0, '2025-12-16 10:42:06', '2025-12-16 10:42:06'),
(8, '1765882190117687a7da8-19f6-445c-90f6-9de75ae5b1fc', 'puvingaming0', 'puvingaming0@gmail.com', 'puvingaming0', '$2b$10$4ADyBbw7wTpf2N2gLBbYI.JiPIAsZC8V2rvTa7tfFAsjrrpldGQK2', '/uploads/profiles/profile.png', '', 0, '2025-12-16 10:49:50', '2025-12-16 10:49:50'),
(9, '176588227162731372176-e046-49af-8677-81933add0732', 'grayWilliam607', 'grayWilliam607@gmail.com', 'grayWilliam607', '$2b$10$Yy2jpQDGddjg6zLfGHFofegV83HzqEgwuaKFBRpL/Dyf3TtwZgZbu', '/uploads/profiles/profile.png', '', 0, '2025-12-16 10:51:11', '2025-12-16 10:51:11'),
(10, '1765882431615f32c9691-fefb-43b1-aea7-2ea4096c4357', 'aghili2658', 'aghili2658@gmail.com', 'aghili2658', '$2b$10$UTybCH6mQcK3g6Uj1Jza6eYGCAB7j9.wHJejFFymqMxD5ejPbJQcG', '/uploads/profiles/profile.png', '', 0, '2025-12-16 10:53:51', '2025-12-16 10:53:51'),
(11, '17658825395756f44b539-2e60-4351-872c-9ec5ef71570a', 'elmanhasannejad55', 'elmanhasannejad55@gmail.com', 'elmanhasannejad55', '$2b$10$6VkcZ1WlaDwhGOYOIsfikO.tFrCvT2yxQuAxQNvHvoW3elwrSRMJS', '/uploads/profiles/profile.png', '', 0, '2025-12-16 10:55:39', '2025-12-16 10:55:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Bans`
--
ALTER TABLE `Bans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`);

--
-- Indexes for table `MusicCategories`
--
ALTER TABLE `MusicCategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `username_6` (`username`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `username_7` (`username`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `username_8` (`username`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `username_9` (`username`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `username_10` (`username`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `username_11` (`username`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `username_12` (`username`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `username_13` (`username`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `username_14` (`username`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `username_15` (`username`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `username_16` (`username`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `username_17` (`username`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `username_18` (`username`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `username_19` (`username`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `username_20` (`username`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `username_21` (`username`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `username_22` (`username`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `username_23` (`username`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `username_24` (`username`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `username_25` (`username`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `username_26` (`username`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `username_27` (`username`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `username_28` (`username`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `username_29` (`username`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `username_30` (`username`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `username_31` (`username`),
  ADD UNIQUE KEY `email_32` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Bans`
--
ALTER TABLE `Bans`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MusicCategories`
--
ALTER TABLE `MusicCategories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
