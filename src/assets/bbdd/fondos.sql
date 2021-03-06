-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2020 a las 12:44:41
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
-- Estructura de tabla para la tabla `fondos`
--

CREATE TABLE `fondos` (
  `ID` int(11) NOT NULL,
  `Usuario` varchar(100) COLLATE latin1_general_cs NOT NULL,
  `Estado` varchar(100) COLLATE latin1_general_cs DEFAULT NULL,
  `Fecha` date NOT NULL,
  `Tipo` varchar(100) COLLATE latin1_general_cs NOT NULL,
  `Cantidad` double NOT NULL,
  `Empresa` varchar(255) COLLATE latin1_general_cs DEFAULT NULL,
  `Rentabilidad` double NOT NULL,
  `Dividendo` varchar(100) COLLATE latin1_general_cs NOT NULL,
  `PorcentajeDiv` double DEFAULT NULL,
  `Detalles` varchar(255) COLLATE latin1_general_cs DEFAULT NULL,
  `Profit` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

--
-- Volcado de datos para la tabla `fondos`
--

INSERT INTO `fondos` (`ID`, `Usuario`, `Estado`, `Fecha`, `Tipo`, `Cantidad`, `Empresa`, `Rentabilidad`, `Dividendo`, `PorcentajeDiv`, `Detalles`, `Profit`) VALUES
(1, 'LORJIM', NULL, '2020-06-25', 'Acción', 200, 'Bankia', 32, 'yeah', 23, NULL, NULL),
(2, 'LORJIM', NULL, '2020-06-10', 'Bienes', 43, NULL, 32, 'No', NULL, NULL, NULL),
(3, 'Lady12', NULL, '2020-06-24', 'ra', 132, NULL, 31, 'we', 32, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fondos`
--
ALTER TABLE `fondos`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fondos`
--
ALTER TABLE `fondos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
