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
		$importe=$obj['importe'];
		$plataforma=$obj['plataforma'];
		$fecha=$obj['fecha'];

		require "../conexion.php";
		if($conexion->connect_errno){
			exit("Conexion fallida. Razon: ".$conexion->connect_error);
		}else{
			$insertar = "INSERT INTO Cartera( Usuario, Tipo, Importe, Plataforma, Fecha) VALUES ('$user', '$tipo', '$importe' ,'$plataforma', '$fecha')";
			if($conexion->query($insertar)){
				$mensaje="Nuevo movimiento insertado con éxito";
				require "../actividad/CaptarIP.php";
				$ip=get_client_ip();
				require "../actividad/RegistroInsertar.php";
				Registro($user,$tipo,$importe,$plataforma,$fecha,$ip);
			}
			else{
				$mensaje="Ha ocurrido un error inesperado";
			}
			echo json_encode($mensaje);
			
		}
		
	}
	
?>