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
			$resultado=$conexion->query("SELECT Profit,Fecha FROM Fondos WHERE ID='$ID'");
			$datosOperacion = $resultado-> fetch_assoc(); //basandonos en la ID, recuperamos el profit y la fecha de la operacion en concreto
			$profitActual = $conexion->query("SELECT Profit FROM Profitfondos WHERE Fecha='".$datosOperacion["Fecha"]."'"); //recuperamos el profit del dia en concreto que ya habia almacenado
			$profitActual-=$datosOperacion["Profit"]; //actualizamos dicho profit restando el de esta operacion, ya que la vamos a eliminar
			$conexion->query("UPDATE Profitfondos SET Profit='$profitActual' WHERE Fecha='".$datosOperacion["Fecha"]."'"); //actualizamos el nuevo profit en BBDD
			$eliminar = "DELETE FROM Fondos WHERE ID='$ID'"; //una vez eliminado el profit general, eliminamos la operacion
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