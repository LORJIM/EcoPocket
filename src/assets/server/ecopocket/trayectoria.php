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
		$categoria=$obj['categoria'];
		$intervalo=$obj['intervalo'];
		$tabla; //inicializamos esta variable, que dependera de la categoria

		require "./conexion.php";

		switch($categoria){ //segun categoria, consultaremos los datos en una tabla u otra
			case 'I':
				$tabla='Profitfondos'; //Fondos de Inversion
				break;
			case 'F':
				$tabla='Profitforex'; //Forex
				break;
			case 'C':
				$tabla='Profitcripto'; //Criptomonedas
				break;
			case 'A':
				$tabla='Profitapuestas'; //Apuestas Deportivas
				break;
			case 'H':
				$tabla='Profithogar'; //Gestion del Hogar
				break;
		}
		//ejecutamos la query segun intervalo de tiempo
		if($intervalo=='1 semana'){
			$seleccionar = "SELECT Fecha,Profit FROM ".$tabla." WHERE Usuario ='".$user."' AND Fecha >= DATE_ADD(CURDATE(), INTERVAL -7 DAY) ORDER BY Fecha ASC";
		}else{ //todo
			$seleccionar = "SELECT Fecha,Profit FROM ".$tabla." WHERE Usuario ='".$user."' ORDER BY Fecha ASC";
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