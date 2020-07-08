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
		$causa=$obj['causa'];
		$detalles=$obj['detalles'];
		$fecha=$obj['fecha'];
		
		
		require "../conexion.php";
		if($conexion->connect_errno){
			exit("Conexion fallida. Razon: ".$conexion->connect_error);
		}else{
			$profit=0; //inicializamos la variable profit
			if($tipo=='Ingreso'){
				$profit=$importe;
			}else if($tipo=='Gasto'){
				$profit=-$importe;
			}
			$insertar = "INSERT INTO Hogar( Usuario, Fecha, Tipo, Importe, Causa, Detalles, Profit) VALUES ('$user', '$fecha', '$tipo' ,'$importe', '$causa', '$detalles', '$profit')";
			
			
			if($conexion->query($insertar)){
				$seleccionar = "SELECT * FROM Profithogar WHERE Usuario ='".$user."' AND Fecha='".$fecha."'";
				$resultados = $conexion->query($seleccionar);//basandonos en el usuario y la fecha, comprobamos si ya existe un profit del dia asociado

				if($resultados -> num_rows == 0){ //si no hay resultados, significa que no hay profit del dia asociado y esta es la primera operacion, por lo que inicializamos el profit al de esta operacion, esto es necesario hacerlo para que la consulta previa de operaciones no falle
					$conexion->query("INSERT INTO Profithogar( Fecha, Usuario, Profit) VALUES ('$fecha', '$user', '$profit')");
				}else{ //si ya hay resultados, habra que sumar el profit de esta operacion al ya existente
					$fila=$resultados-> fetch_assoc();
					$profitActual=$fila["Profit"]; //todo esto es necesario para poder trabajar con el profitActual en las lineas de abajo
					$profitActual+=$profit; //actualizamos dicho profit sumando el de esta operacion
					$conexion->query("UPDATE Profithogar SET Profit='$profitActual' WHERE Fecha='".$fila["Fecha"]."' AND Usuario='".$fila["Usuario"]."'"); //actualizamos el nuevo profit en BBDD
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