-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2024 at 04:08 PM
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
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `analytics`
--

CREATE TABLE `analytics` (
  `id` int(11) NOT NULL,
  `report_type` varchar(50) DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `analytics`
--

INSERT INTO `analytics` (`id`, `report_type`, `data`, `created_at`) VALUES
(1, 'sales', '{\"total_sales\": 1500, \"total_orders\": 10, \"top_product\": \"iPhone 13\"}', '2024-10-14 02:47:05'),
(2, 'inventory', '{\"low_stock\": 10, \"restock_needed\": 5}', '2024-10-14 02:47:05');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Electronics', 'Electronic devices and gadgets', '2024-10-14 02:46:07', '2024-10-14 02:46:07'),
(2, 'Books', 'Various genres of books and magazines', '2024-10-14 02:46:07', '2024-10-14 02:46:07'),
(3, 'Clothing', 'Men and Women clothing', '2024-10-14 02:46:07', '2024-10-14 02:46:07'),
(4, 'Home Appliances', 'Home appliances and tools', '2024-10-14 02:46:07', '2024-10-14 02:46:07');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 799.99, 'completed', '2024-10-14 02:46:29', '2024-10-14 02:46:29'),
(2, 2, 39.99, 'shipped', '2024-10-14 02:46:29', '2024-10-14 02:46:29'),
(3, 1, 19.99, 'pending', '2024-10-14 02:46:29', '2024-10-14 02:46:29');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 1, 799.99),
(2, 2, 3, 1, 39.99),
(3, 3, 4, 1, 19.99);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `img_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock_quantity`, `category_id`, `created_at`, `updated_at`, `img_url`) VALUES
(1, 'iPhone 13', 'Apple smartphone with 128GB storage', 799.99, 50, 1, '2024-10-14 02:46:14', '2024-10-14 07:43:24', ''),
(2, 'Samsung Galaxy S21', 'Samsung flagship smartphone with 256GB storage', 999.99, 30, 1, '2024-10-14 02:46:14', '2024-10-14 07:42:11', 'https://images.samsung.com/is/image/samsung/assets/th/smartphones/galaxy-s24-ultra/buy/S24Ultra-Color-Titanium_Blue_PC_0527_final.jpg?imbypass=true'),
(3, 'The Pragmatic Programmer', 'Programming book for software developers', 39.99, 100, 2, '2024-10-14 02:46:14', '2024-10-14 02:46:14', NULL),
(4, 'T-shirt', 'Cotton t-shirt for men', 19.99, 200, 3, '2024-10-14 02:46:14', '2024-10-14 02:46:14', NULL),
(5, 'Blender', 'High-speed blender for kitchen', 49.99, 75, 4, '2024-10-14 02:46:14', '2024-10-14 02:46:14', NULL),
(7, 'soap', 'สบู่เหลว', 129.00, 10, 2, '2024-10-14 07:17:30', '2024-10-14 07:37:59', 'https://media.istockphoto.com/id/2151758817/photo/natural-soap-bars.webp?a=1&b=1&s=612x612&w=0&k=20&c=vDb9AeuXRee3cWsbyAVHAqpSTHaYIEbsMjgLemmCgHY='),
(8, 'new data', 'test data', 100.00, 20, 3, '2024-10-14 09:38:25', '2024-10-14 09:42:59', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 5, 'Great phone with amazing performance!', '2024-10-14 02:46:47', '2024-10-14 02:46:47'),
(2, 2, 3, 4, 'Very informative book, highly recommended for developers.', '2024-10-14 02:46:47', '2024-10-14 02:46:47'),
(3, 1, 4, 3, 'The t-shirt is okay but the size runs a bit small.', '2024-10-14 02:46:47', '2024-10-14 02:46:47'),
(4, 1, 7, 5, 'good ', '2024-10-14 10:25:39', '2024-10-14 12:04:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'john_doe', 'john@example.com', 'password123', 'user', '2024-10-14 02:45:59', '2024-10-14 02:45:59'),
(2, 'admin_user', 'admin@example.com', 'adminpassword', 'admin', '2024-10-14 02:45:59', '2024-10-14 02:45:59'),
(3, 'jane_doe', 'jane@example.com', 'password456', 'user', '2024-10-14 02:45:59', '2024-10-14 02:45:59'),
(4, 'nonthawat', 'non@gmail.com', '$2b$10$pQRQRS.awQRUk5Z/IgRMVuDpyIACHAsDGcplqWwKVYZreGhNnTgsO', 'user', '2024-10-14 12:26:40', '2024-10-14 12:26:40'),
(5, 'janesmith', 'janesmith@example.com', '$2b$10$hqBUDbXNMxeu.6eggVJSgOW9cMm7yP38z78vrtcIqXD/6IzCZXh7u', 'user', '2024-10-14 13:10:07', '2024-10-14 13:10:07'),
(6, 'monna', 'mon@email.com', '$2b$10$e4XCItark99jhKVVsLGJNevmO7ki4K8To5I3qqaqhDzyjOqZ85/ae', 'user', '2024-10-14 13:12:07', '2024-10-14 13:12:07'),
(7, 'monna', 'monmon@email.com', '$2b$10$HSPB/u/.ZBcLgT5K/3YQP.4OMaImIcLJsdp4NVgoDuz4sWm2kgHY6', 'user', '2024-10-14 13:12:21', '2024-10-14 13:12:21'),
(8, 'gimma', 'gimma@email.com', '$2b$10$SjYySu0K5Ym9bkZH36yO2ugyAVfSos0nvCIIQm7ScmyCR27U8jH52', 'user', '2024-10-14 13:14:01', '2024-10-14 13:14:01'),
(9, 'Earum itaque ipsam u', 'heto@mailinator.com', '$2b$10$TqTKRzfwDs.KZ.7PdqRZp.Bmvy9HWRGBtSE4YPVzYBWfjV0UQj/3m', 'user', '2024-10-14 13:16:55', '2024-10-14 13:16:55'),
(10, 'kera', 'noma@gmail.com', '$2b$10$cWY0yhiyrurMO2qxt5LLPOdui4wZIm52jYtI2.KP.XsR6nQxoM2Em', 'user', '2024-10-14 14:06:02', '2024-10-14 14:06:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `analytics`
--
ALTER TABLE `analytics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
