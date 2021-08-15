-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2021 at 01:12 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentmyhouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `ID` int(4) NOT NULL,
  `House_No` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `aadhar` varchar(255) NOT NULL,
  `msg` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`ID`, `House_No`, `name`, `email`, `phone`, `aadhar`, `msg`) VALUES
(40, '1', 'Atul Gadhari', 'atul@atul.com', '1234567890', '12345', 'qwert');

-- --------------------------------------------------------

--
-- Table structure for table `property_list`
--

CREATE TABLE `property_list` (
  `House_No` int(3) NOT NULL,
  `p_name` varchar(255) NOT NULL,
  `p_address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `p_info` varchar(255) NOT NULL,
  `p_buildArea` varchar(255) NOT NULL,
  `p_price` varchar(255) NOT NULL,
  `p_photo1` varchar(255) NOT NULL,
  `p_photo2` varchar(255) NOT NULL,
  `p_photo3` varchar(255) NOT NULL,
  `dp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `property_list`
--

INSERT INTO `property_list` (`House_No`, `p_name`, `p_address`, `city`, `p_info`, `p_buildArea`, `p_price`, `p_photo1`, `p_photo2`, `p_photo3`, `dp`) VALUES
(1, 'Orchard House', 'Mumbai-400001', 'Mumbai', '123456789', '3000 Sq.ft', '20000$', './img/house_images/House_1/1_1.jpg', './img/house_images/House_1/1_2.jpg', './img/house_images/House_1/1_3.jpg', './img/house_images/House_1/1_1.jpg'),
(2, 'Meadow View', 'Mumbai-400001', 'Mumbai', '123456789', '3000 Sq.ft', '20000$', './img/house_images/House_2/2_1.jpg', './img/house_images/House_2/2_2.jpg', './img/house_images/House_2/2_3.jpg', './img/house_images/House_2/2_1.jpg'),
(3, 'Ivy Cottage', 'Mumbai-400001', 'Mumbai', '9081392589', '3000 Sq.ft', '30000$', './img/house_images/House_3/3_1.jpg', './img/house_images/House_3/3_2.jpg', './img/house_images/House_3/3_3.jpg', './img/house_images/House_3/3_1.jpg'),
(4, 'Rose Cottage', 'Pune-411048', 'Pune', '1234567890', '2500 Sq.ft', '25000$', './img/house_images/House_4/4_1.jpg', './img/house_images/House_4/4_2.jpg', './img/house_images/House_4/4_3.jpg', './img/house_images/House_4/4_1.jpg'),
(5, 'The Hollies', 'Nashik-401603', 'Nashik', '1234567890', '2200 Sq.ft', '20000$', './img/house_images/House_5/5_1.jpg', './img/house_images/House_5/5_2.jpg', './img/house_images/House_5/5_3.jpg', './img/house_images/House_5/5_1.jpg'),
(6, 'The Willows', 'Mumbai-400001', 'Mumbai', '1234567890', '3000 Sq.ft', '20000$', './img/house_images/House_6/6_1.jpg', './img/house_images/House_6/6_2.jpg', './img/house_images/House_6/6_3.jpg', './img/house_images/House_6/6_1.jpg'),
(7, 'Corner House', 'Pune-411048', 'Pune', '1234567890', '2000 Sq.ft', '20500$', './img/house_images/House_7/7_1.jpg', './img/house_images/House_7/7_2.jpg', './img/house_images/House_7/7_3.jpg', './img/house_images/House_7/7_1.jpg'),
(8, 'Primrose Cottage', 'Nashik-401603', 'Nashik', '1234567890', '3000 Sq.ft', '30000$', './img/house_images/House_8/8_1.jpg', './img/house_images/House_8/8_2.jpg', './img/house_images/House_8/8_3.jpg', './img/house_images/House_8/8_1.jpg'),
(9, 'The Mill House', 'Nashik-401603', 'Nashik', '1234567890', '2000 Sq.ft', '20000$', './img/house_images/House_9/9_1.jpg', './img/house_images/House_9/9_2.jpg', './img/house_images/House_9/9_3.jpg', './img/house_images/House_9/9_1.jpg'),
(10, 'Oaklands', 'Pune-411048', 'Pune', '1234567890', '2000 Sq.ft', '30000$', './img/house_images/House_10/10_1.jpg', './img/house_images/House_10/10_2.jpg', './img/house_images/House_10/10_3.jpg', './img/house_images/House_10/10_1.jpg'),
(11, 'Bridge lands', 'Pune-411048', 'Pune', '1234567890', '2500 Sq ft', '20000$', './img/house_images/House_11/11_1.jpg', './img/house_images/House_11/11_2.jpg', './img/house_images/House_11/11_3.jpg', './img/house_images/House_11/11_1.jpg'),
(12, 'Mighty Oaks', 'Nashik-401603', 'Nashik', '1234567890', '3000 Sq ft', '20000$', './img/house_images/House_12/12_1.jpg', './img/house_images/House_12/12_2.jpg', './img/house_images/House_12/12_3.jpg', './img/house_images/House_12/12_1.jpg'),
(13, 'Chimney Cottage', 'Mumbai-100001', 'Mumbai', '1234567890', '3000 Sq ft', '35000$', './img/house_images/House_13/13_1.jpg', './img/house_images/House_13/13_2.jpg', './img/house_images/House_13/13_3.jpg', './img/house_images/House_13/13_1.jpg'),
(14, 'Crystal Cottage', 'Mumbai-100001', 'Mumbai', '1234567890', '2000 Sq ft', '20000$', './img/house_images/House_14/14_1.jpg', './img/house_images/House_14/14_2.jpg', './img/house_images/House_14/14_3.jpg', './img/house_images/House_14/14_1.jpg'),
(15, 'Elm Tree Wood', 'Nashik-401603', 'Nashik', '1234567890', '2500 Sq ft', '23000$', './img/house_images/House_15/15_1.jpg', './img/house_images/House_15/15_2.jpg', './img/house_images/House_15/15_3.jpg', './img/house_images/House_15/15_1.jpg'),
(16, 'Hunters Wood', 'Nashik-401603', 'Nashik', '1234567890', '1000 Sq ft', '20000$', './img/house_images/House_16/16_1.jpg', './img/house_images/House_16/16_2.jpg', './img/house_images/House_16/16_3.jpg', './img/house_images/House_16/16_1.jpg'),
(17, 'Neverland', 'Pune-411048', 'Pune', '1234567890', '2000 Sq ft', '25000$', './img/house_images/House_17/17_1.jpg', './img/house_images/House_17/17_2.jpg', './img/house_images/House_17/17_3.jpg', './img/house_images/House_17/17_1.jpg'),
(18, 'Mighty Oaks', 'Pune-411048', 'Pune', '1234567890', '2000 Sq ft', '30000$', './img/house_images/House_18/18_1.jpg', './img/house_images/House_18/18_2.jpg', './img/house_images/House_18/18_3.jpg', './img/house_images/House_18/18_1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `Password`) VALUES
(10, 'shreyas', 'atul@atul.com', '202cb962ac59075b964b07152d234b70');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `property_list`
--
ALTER TABLE `property_list`
  ADD PRIMARY KEY (`House_No`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `property_list`
--
ALTER TABLE `property_list`
  MODIFY `House_No` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
