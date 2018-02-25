-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 30, 2017 at 12:26 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `a6`
--

-- --------------------------------------------------------

--
-- Table structure for table `records`
--

CREATE TABLE `records` (
  `Name` varchar(50) NOT NULL,
  `City` varchar(25) NOT NULL,
  `Country` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `records`
--

INSERT INTO `records` (`Name`, `City`, `Country`) VALUES
('Alfreds Futterkiste', 'Berlin', 'Germany'),
('Ana Trujillo Emparedados y helados', 'México D.F.', 'Mexico'),
('Antonio Moreno Taquería', 'México D.F.', 'Mexico'),
('Around the Horn', 'London', 'UK'),
('B\'s Beverages', 'London', 'UK'),
('Berglunds snabbköp', 'Luleå', 'Sweden'),
('Blauer See Delikatessen', 'Mannheim', 'Germany'),
('Blondel père et fils', 'Strasbourg', 'France'),
('Bólido Comidas preparadas', 'Madrid', 'Spain'),
('Bon app\'', 'Marseille', 'France'),
('Bottom-Dollar Marketse', 'Tsawassen', 'Canada'),
('Cactus Comidas para llevar', 'Buenos Aires', 'Argentina'),
('Centro comercial Moctezuma', 'México D.F.', 'Mexico'),
('Chop-suey Chinese', 'Bern', 'Switzerland'),
('Comércio Mineiro', 'São Paulo', 'Brazil');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
