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
		$moneda=$obj['moneda'];
		$importe=$obj['importe'];
		$valorCompra=$obj['valorCompra'];
		$detalles=$obj['detalles'];
		$fecha=$obj['fecha'];
		
		
		require "../conexion.php";
		if($conexion->connect_errno){
			exit("Conexion fallida. Razon: ".$conexion->connect_error);
		}else{
			$insertar = "INSERT INTO Forex( Usuario, Fecha, Moneda, Importe, ValorCompra, Detalles) VALUES ('$user', '$fecha', '$moneda' ,'$importe', '$valorCompra', '$detalles')";
			
			
			if($conexion->query($insertar)){
				$seleccionar = "SELECT * FROM Profitforex WHERE Usuario ='".$user."' AND Fecha='".$fecha."'";
				$resultados = $conexion->query($seleccionar);//basandonos en el usuario y la fecha, comprobamos si ya existe un profit del dia asociado

				if($resultados -> num_rows == 0){ //si no hay resultados, significa que no hay profit del dia asociado y esta es la primera operacion, por lo que inicializamos el profit a cero, esto es necesario hacerlo para que la consulta previa de operaciones no falle
					$conexion->query("INSERT INTO Profitforex( Fecha, Usuario, Profit) VALUES ('$fecha', '$user', '0')");
				}
				$mensaje="Nueva operación insertada con éxito";
			}
			else{
				$mensaje="Ha ocurrido un error inesperado";
			}
			echo json_encode($mensaje);
			
		}
		
	}
	
?>