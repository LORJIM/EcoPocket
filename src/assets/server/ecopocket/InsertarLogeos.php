<?php
	
	$Fecha= date("Y-m-d");
	$Hora=date("G:i:s");
	
	require "conexion.php";

	
	$insertar2="INSERT INTO Logeos (Usuario, Fecha, Hora) VALUES ('$user', '$Fecha', '$Hora')";
	$conexion->query($insertar2)
?>