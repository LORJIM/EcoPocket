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
		$tipo=$obj['tipo'];

		require "../conexion.php";
	
		if($tipo=='O'){ //consulta de operaciones ordenadas por fecha, de la mas reciente a la mas antigua
			$seleccionar = "SELECT * FROM Hogar WHERE Usuario ='".$user."' ORDER BY Fecha DESC";
		}else if($tipo=='P'){ //consulta de profits ordenados por fecha, del mas reciente a el mas antiguo
			$seleccionar = "SELECT * FROM Profithogar WHERE Usuario ='".$user."'  ORDER BY Fecha DESC";
		}
		
		
		$resultados = $conexion->query($seleccionar);
		
		if($resultados -> num_rows > 0){
			$r = array();
		foreach($resultados as $row){
			array_push($r,$row);
		}
		echo $json_response=json_encode($r);
		}else
		{
			$mensaje="Sin resultados";
			echo json_encode($mensaje);
		}
	}
	
?>