-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2020 a las 12:44:45
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
-- Estructura de tabla para la tabla `cripto`
--

CREATE TABLE `cripto` (
  `ID` int(11) NOT NULL,
  `Usuario` varchar(100) COLLATE latin1_general_cs NOT NULL,
  `Estado` varchar(100) COLLATE latin1_general_cs DEFAULT NULL,
  `Fecha` date NOT NULL,
  `Criptomoneda` varchar(255) COLLATE latin1_general_cs NOT NULL,
  `Importe` double NOT NULL,
  `ValorCompra` double NOT NULL,
  `ValorVenta` double DEFAULT NULL,
  `Dividendos` double DEFAULT NULL,
  `Detalles` varchar(255) COLLATE latin1_general_cs DEFAULT NULL,
  `Profit` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cripto`
--
ALTER TABLE `cripto`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cripto`
--
ALTER TABLE `cripto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
