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
		$ID=$obj['ID'];

		require "../conexion.php";
		if($conexion->connect_errno){
			exit("Conexion fallida. Razon: ".$conexion->connect_error);
		}else{
			$eliminar = "DELETE FROM Cartera WHERE ID='$ID'";
			if($conexion->query($eliminar)){
				$mensaje="Se ha eliminado correctamente";
				require "../actividad/CaptarIP.php";
				$ip=get_client_ip();
				require "../actividad/RegistroEliminar.php";
				Registro($ID,$ip);
			}
			else{
				$mensaje="Ha ocurrido un error inesperado";
			}
			echo json_encode($mensaje);
			
		}
		
	}
	
?>