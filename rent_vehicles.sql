-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2022 at 05:34 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rent_vehicles`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `type` varchar(80) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_category`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'Cars', '2022-02-02 13:28:02', '2022-02-02 07:27:52'),
(2, 'Motorbike', '2022-02-02 13:28:28', '2022-02-02 07:28:07'),
(3, 'Bike', '2022-02-02 13:28:28', '2022-02-02 07:28:07'),
(4, 'E-bike', '2022-02-02 15:47:19', '2022-02-03 12:51:45'),
(5, 'Pick Up', '2022-02-03 12:51:27', '2022-02-03 06:50:28'),
(6, 'Truck', '2022-02-03 12:51:27', '2022-02-03 06:50:28'),
(7, 'boat', '2022-02-04 10:59:50', '2022-02-04 11:08:13'),
(8, 'jet', '2022-02-06 06:24:53', '2022-02-06 06:32:17');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id_history` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_vehicle` int(11) DEFAULT NULL,
  `rent_start_date` date NOT NULL,
  `rent_end_date` date NOT NULL,
  `prepayment` int(11) NOT NULL,
  `status` enum('has been returned','not been returned') DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id_history`, `id_user`, `id_vehicle`, `rent_start_date`, `rent_end_date`, `prepayment`, `status`, `createdAt`, `updatedAt`) VALUES
(12, 1, 13, '2022-01-31', '2022-02-01', 800000, 'has been returned', '2022-02-02 11:05:38', '2022-02-03 17:51:37'),
(13, 4, 7, '2022-01-31', '2022-02-04', 900000, 'not been returned', '2022-02-02 12:54:39', '2022-02-03 17:51:38'),
(14, 5, 7, '2022-02-02', '2022-02-04', 900000, 'has been returned', '2022-02-02 12:58:37', '2022-02-06 13:56:05'),
(16, 7, 7, '2022-02-02', '2022-02-04', 900000, 'not been returned', '2022-02-02 19:05:02', '2022-02-03 17:51:38'),
(18, 22, 7, '2022-02-01', '2022-02-03', 900000, 'has been returned', '2022-02-02 20:42:45', '2022-02-03 17:51:38'),
(19, 24, 23, '2022-02-02', '2022-02-04', 0, 'not been returned', '2022-02-03 08:34:21', '2022-02-03 17:51:38'),
(20, 31, 13, '2022-02-01', '2022-02-03', 0, 'has been returned', '2022-02-03 08:36:43', '2022-02-03 17:51:38'),
(21, 27, 15, '2022-02-03', '2022-02-05', 10000, 'has been returned', '2022-02-03 08:36:43', '2022-02-03 17:51:38'),
(22, 7, 23, '2022-02-03', '2022-02-04', 0, 'has been returned', '2022-02-03 08:40:36', '2022-02-03 17:51:38'),
(23, 5, 12, '2022-02-04', '2022-02-07', 200000, 'has been returned', '2022-02-03 08:40:36', '2022-02-03 17:51:38'),
(24, 1, 17, '2022-02-08', '2022-02-10', 400000, 'has been returned', '2022-02-03 08:41:54', '2022-02-03 17:51:38'),
(25, 1, 7, '2022-02-02', '2022-02-04', 500000, 'has been returned', '2022-02-03 09:35:35', '2022-02-03 17:51:38'),
(26, 4, 7, '2022-02-02', '2022-02-04', 500000, NULL, '2022-02-04 05:54:05', NULL),
(28, 32, 67, '2022-02-02', '2022-02-04', 200000, NULL, '2022-02-04 14:18:00', '2022-02-04 14:19:30'),
(29, 32, 67, '2022-02-02', '2022-02-04', 500000, 'not been returned', '2022-02-04 14:30:43', NULL),
(30, 33, 10, '2022-02-02', '2022-02-28', 500000, 'not been returned', '2022-02-04 17:49:01', NULL),
(33, 1, 10, '2022-02-02', '2022-02-28', 500000, 'not been returned', '2022-02-06 07:34:11', NULL),
(34, 34, 69, '2022-02-02', '2022-02-05', 500000, 'not been returned', '2022-02-06 08:00:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(90) NOT NULL,
  `display_name` varchar(30) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_number` varchar(14) NOT NULL,
  `address` varchar(250) NOT NULL,
  `birthdate` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name`, `display_name`, `gender`, `email`, `phone_number`, `address`, `birthdate`, `createdAt`, `updatedAt`) VALUES
(1, 'Rinto Saputro', 'Rinto', 'Male', 'rinto@mail.com', '08123456', 'Sine, Ngawi, East Java', '1996-08-30', '2022-01-27 21:55:50', '0000-00-00 00:00:00'),
(4, 'Adi Harun', 'Harun', 'Male', 'adirun@mail.com', '08657', 'Nganjuk, East Java', '2000-04-05', '2022-01-28 13:55:06', '0000-00-00 00:00:00'),
(5, 'John Doe', 'Dul', 'Male', 'john@mail.com', '0865746265', 'Surabaya, East Java', '2000-04-05', '2022-01-28 14:09:52', '0000-00-00 00:00:00'),
(7, 'Ana Sutari', 'Anas', 'Female', 'sudirjaana@mail.com', '084624552', 'Sorong, West Papua', '1997-03-08', '2022-01-30 18:53:26', '2022-02-03 16:18:33'),
(22, 'Ali Sucipto', 'Sucipto', 'Male', 'sucipto4li@mail.com', '0865746265', 'Surakarta, Central Java', '2000-04-05', '2022-01-30 19:58:03', '2022-02-01 14:52:49'),
(24, 'Putri Tiyas', 'Putri', 'Female', 'sudirjaana@mail.com', '084624552', 'Sorong, West Papua', '1997-03-08', '2022-01-30 21:03:38', '2022-02-03 16:18:33'),
(27, 'Ahmad Zulkarnain', 'Ahmad', 'Male', 'ahmad@mail.com', '088567432', 'Serang, Banten', '1997-03-08', '2022-01-30 21:28:56', '0000-00-00 00:00:00'),
(29, 'Rani Handayani', 'Rani', 'Female', 'Rani@gmail.com', '084245666', 'Jakarta, Indonesia', '2000-05-21', '2022-02-01 20:50:25', '2022-02-03 16:18:33'),
(31, 'Ngolo Kante', 'Kante', 'Male', 'ngolokante10@gmail.com', '082466742', 'Jakarta, Indonesia', '2000-05-30', '2022-02-02 06:09:15', '2022-02-06 13:52:01'),
(32, 'Susi Susanti', 'Susanti', '', 'susi45@gmail.com', '081348886', 'Jakarta, Indonesia', '1965-05-21', '2022-02-03 16:24:03', NULL),
(33, 'Susan Widiawati', 'Susan', 'Female', 'susan@gmail.com', '081348886', 'Jakarta, Indonesia', '1965-05-21', '2022-02-03 16:37:41', NULL),
(34, 'Andi Bon', 'Andi', 'Male', 'Andi@gmail.com', '0813488676', 'Jakarta, Indonesia', '1995-05-21', '2022-02-03 16:38:59', NULL),
(35, 'Stevi Amelia', 'Stev', 'Female', 'steviamelia1@gmail.com', '084252670', 'Jakarta, Indonesia', '1995-05-21', '2022-02-06 08:41:39', NULL),
(36, 'Phil Jones', 'Jones', 'Male', 'philjones@gmail.com', '08454624', 'Sidoarjo, East Java', '1995-02-28', '2022-02-06 11:55:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id_vehicle` int(11) NOT NULL,
  `id_category` int(11) DEFAULT NULL,
  `type` varchar(80) NOT NULL,
  `brand` varchar(80) NOT NULL,
  `capacity` varchar(5) NOT NULL,
  `location` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `rent_count` int(11) NOT NULL DEFAULT 0,
  `status` enum('Available','Full Booked') NOT NULL DEFAULT 'Available',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id_vehicle`, `id_category`, `type`, `brand`, `capacity`, `location`, `price`, `qty`, `rent_count`, `status`, `createdAt`, `updatedAt`) VALUES
(7, 1, 'Cars', 'Honda Brio', '5', 'Depok', 200000, 3, 7, 'Available', '2022-01-26 16:59:59', '2022-02-04 05:58:23'),
(10, 2, 'Motorbike', 'Yamaha Jupiter', '2', 'Surakarta', 25000, 3, 3, 'Available', '2022-01-27 10:39:59', '2022-02-06 07:34:11'),
(12, 2, 'Motorbike', 'Kawasaki ZX10', '2', 'Ngawi', 550000, 3, 1, 'Available', '2022-01-27 13:06:26', '2022-02-02 13:41:53'),
(13, 3, 'Bike', 'Polygon Siskiu', '1', 'Bandung', 155000, 2, 2, 'Available', '2022-01-28 10:13:34', '2022-02-02 13:41:53'),
(15, 3, 'Bike', 'Giant trance', '1', 'Yogyakarta', 155000, 3, 1, 'Available', '2022-01-28 10:23:05', '2022-02-04 05:48:33'),
(17, 1, 'Cars', 'Wuling Almaz', '7', 'Ngawi', 600000, 3, 1, 'Available', '2022-01-28 10:32:16', '2022-02-04 05:48:33'),
(19, 1, 'Cars', 'Mazda CX 5', '5', 'Yogyakarta', 555000, 2, 0, 'Available', '2022-01-30 17:34:14', '2022-02-02 13:41:53'),
(23, 1, 'Cars', 'Toyota Avanza', '7', 'Depok', 200000, 4, 2, 'Available', '2022-01-30 19:50:51', '2022-02-04 05:48:33'),
(67, 2, 'Motorbike', 'Vespa Matic', '2', 'Bandung', 200000, 2, 3, 'Available', '2022-02-01 21:07:20', '2022-02-06 18:10:41'),
(69, 2, 'Motorbike', 'Vespa Matic', '2', 'Yogyakarta', 200000, 2, 1, 'Available', '2022-02-02 05:58:24', '2022-02-06 08:00:50'),
(74, 5, 'Pick Up', 'Mitsubishi Colt L300', '3', 'Yogyakarta', 90000, 2, 0, 'Available', '2022-02-06 18:04:02', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id_history`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_vehicle` (`id_vehicle`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id_vehicle`),
  ADD KEY `id_category` (`id_category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id_history` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id_vehicle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicles` (`id_vehicle`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
