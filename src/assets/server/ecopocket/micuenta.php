<?php
	//estos headers previenen los errores de CORS, sean de solicitud previa o de la peticion POST
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');
	$method = $_SERVER['REQUEST_METHOD'];
	if ($method=== 'OPTIONS') { //si el metodo de la solicitud es OPTIONS, es la solicitud previa, por lo que no ejecuta query y terminamos el programa
		die();
	}else{
		$json= file_get_contents('php://input');
		$obj=json_decode($json,true);
		$user=$obj['usuario'];

		require "conexion.php";

		$login = "SELECT * FROM Acceso WHERE Usuario ='".$user."'";
		$resultados = $conexion->query($login);
		

		if ($resultados-> num_rows > 0) { 
			$fila=mysqli_fetch_array($resultados);
			echo json_encode($fila);
		}
	}
	
?>