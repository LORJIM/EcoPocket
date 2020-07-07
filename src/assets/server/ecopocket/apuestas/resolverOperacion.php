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
		$estado=$obj['estado'];

		require "../conexion.php";
	
		
		
		$actualizar = "UPDATE Apuestas SET Estado='$estado' WHERE ID='$ID'"; //primero actualizamos el estado de la operacion
		if($conexion->query($actualizar)){
			$seleccionar = "SELECT * FROM Apuestas WHERE ID ='".$ID."'";
			$resultados = $conexion->query($seleccionar);//basandonos en la ID, recuperamos los datos de la operacion en concreto

			if($resultados -> num_rows > 0){
				$r = array();
				foreach($resultados as $row){
					array_push($r,$row);
				}
				$datosOperacion=$r[0];
			}
			$profit=0; //inicializamos la variable profit, si el estado es neutro, introducira este 0
			if($estado=="Ganancia"){ //gananacia
				$profit=($datosOperacion["Cantidad"]*($datosOperacion["Cuota"]-1)); //el profit en apuestas es la cantidad apostada por la cuota, a la cual se le resta 1 que vendria a ser la cantidad apostada y no cuenta como beneficio
			}else if($estado=="Pérdida"){
				$profit=-$datosOperacion["Cantidad"]; //si fuera perdida, perdemos la cantidad apostada
			}
			$conexion->query("UPDATE Apuestas SET Profit='".$profit."' WHERE ID='$ID'");
			if($estado!="Neutro"){ //en estado neutro, el profit no varia, por lo que no es necesario hacer este fragmento de codigo
				$resultado4 = $conexion->query("SELECT Profit FROM Profitapuestas WHERE Fecha='".$datosOperacion["Fecha"]."'"); //recuperamos el profit del dia en concreto que ya habia almacenado
				$fila=$resultado4-> fetch_assoc();
				$profitActual=$fila["Profit"]; //todo esto es necesario para poder trabajar con el profitActual en las lineas de abajo
				$profitActual+=$profit; //actualizamos dicho profit sumando el de esta operacion
				$conexion->query("UPDATE Profitapuestas SET Profit='$profitActual' WHERE Fecha='".$datosOperacion["Fecha"]."'"); //actualizamos el nuevo profit en BBDD
			}
			require "../actividad/CaptarIP.php"; //una vez hecho todo, utilizamos los datos de operacion para registrarlos en los logs
			$ip=get_client_ip();
			$Usuario=$datosOperacion["Usuario"];
			$Fecha=$datosOperacion["Fecha"];
			$Tipo=$datosOperacion["Deporte"];
			$Cantidad=$datosOperacion["Cantidad"];
			require "../actividad/RegistroEditar.php";
			Registro($ID,$Usuario,$estado,$Fecha,$Tipo,$Cantidad,$ip);
		}
		
		
	}
	
?>