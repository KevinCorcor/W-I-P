-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 25, 2018 at 05:24 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `REST`
--

-- --------------------------------------------------------

--
-- Table structure for table `RL`
--

CREATE TABLE `RL` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `theDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(25) NOT NULL,
  `theDesc` text NOT NULL,
  `URL` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `RL`
--

INSERT INTO `RL` (`ID`, `theDate`, `name`, `theDesc`, `URL`) VALUES
(15, '2017-04-23 20:25:54', 'known', 'nothing', 'www.facebook.com'),
(17, '2017-04-23 21:45:36', 'known', 'nothing', 'kevin'),
(18, '2017-04-23 21:47:16', 'known', 'nothing', 'kevin'),
(20, '2017-04-23 22:17:30', 'known', 'nothing', 'www.shan.com'),
(21, '2017-04-23 22:36:27', 'known', 'nothing', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `RL`
--
ALTER TABLE `RL`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `RL`
--
ALTER TABLE `RL`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
