<?php
	$contrasena="";
	$usuario="root";
	$servidor="localhost";
	$nombredatabase="ecopocket";
	$conexion=new mysqli($servidor,$usuario,$contrasena,$nombredatabase);
	$conexion->query("SET NAMES 'utf8'");
?>