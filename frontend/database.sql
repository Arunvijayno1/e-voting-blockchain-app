-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2025 at 07:00 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evoting_db`
--
CREATE DATABASE IF NOT EXISTS `evoting_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `evoting_db`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- This table stores all users, regardless of their role.
-- The password should be securely hashed before being stored.
--

CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL COMMENT 'Store hashed passwords only',
  `role` ENUM('Admin','Voter','Candidate') NOT NULL,
  `wallet_address` VARCHAR(42) DEFAULT NULL UNIQUE COMMENT 'Ethereum wallet address',
  `biometric_hash` VARCHAR(255) DEFAULT NULL COMMENT 'Hash from facial recognition for voters',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `elections`
--
-- Manages the different elections created by the Admin.
--

CREATE TABLE `elections` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `status` ENUM('Upcoming','Ongoing','Completed') NOT NULL DEFAULT 'Upcoming',
  `created_by` INT(11) NOT NULL COMMENT 'FK to users.id (Admin)',
  `contract_address` VARCHAR(42) DEFAULT NULL COMMENT 'Address of the deployed Solidity contract',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`created_by`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--
-- Stores information about candidates, linked to a user account.
--

CREATE TABLE `candidates` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL UNIQUE COMMENT 'FK to users.id',
  `full_name` VARCHAR(255) NOT NULL,
  `party` VARCHAR(255) NOT NULL,
  `election_id` INT(11) NOT NULL COMMENT 'FK to elections.id',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`election_id`) REFERENCES `elections`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--
-- Logs every vote cast, linking the voter, candidate, election, and blockchain transaction.
-- This provides an auditable off-chain record that corresponds to on-chain data.
--

CREATE TABLE `votes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `election_id` INT(11) NOT NULL COMMENT 'FK to elections.id',
  `voter_id` INT(11) NOT NULL COMMENT 'FK to users.id (Voter)',
  `candidate_id` INT(11) NOT NULL COMMENT 'FK to candidates.id',
  `transaction_hash` VARCHAR(66) NOT NULL UNIQUE COMMENT 'Blockchain transaction hash',
  `voted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`election_id`) REFERENCES `elections`(`id`),
  FOREIGN KEY (`voter_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`candidate_id`) REFERENCES `candidates`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
