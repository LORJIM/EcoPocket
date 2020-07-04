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
		$cantidad=$obj['cantidad'];
		$empresa=$obj['empresa'];
		$rentabilidad=$obj['rentabilidad'];
		$dividendo=$obj['dividendo'];
		$porcdividendo=$obj['porcdividendo'];
		$detalles=$obj['detalles'];
		$fecha=$obj['fecha'];

		require "../conexion.php";
		if($conexion->connect_errno){
			exit("Conexion fallida. Razon: ".$conexion->connect_error);
		}else{
			$insertar = "INSERT INTO Fondos( Usuario, Fecha, Tipo, Cantidad, Empresa, Rentabilidad, Dividendo, PorcentajeDiv, Detalles) VALUES ('$user', '$fecha', '$tipo' ,'$cantidad', '$empresa', '$rentabilidad', '$dividendo', '$porcdividendo', '$detalles')";
			if($conexion->query($insertar)){
				$mensaje="Nuevo movimiento insertado con éxito";
			}
			else{
				$mensaje="Ha ocurrido un error inesperado";
			}
			echo json_encode($mensaje);
			
		}
		
	}
	
?>