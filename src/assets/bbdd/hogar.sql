-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2020 a las 22:18:52
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecopocket`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hogar`
--

CREATE TABLE `hogar` (
  `ID` int(11) NOT NULL,
  `Usuario` varchar(100) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `Fecha` date NOT NULL,
  `Tipo` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Importe` double NOT NULL,
  `Causa` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Detalles` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `Profit` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `hogar`
--
ALTER TABLE `hogar`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `hogar`
--
ALTER TABLE `hogar`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
