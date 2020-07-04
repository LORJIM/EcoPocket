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
	
		
		
		$actualizar = "UPDATE Fondos SET Estado='$estado' WHERE ID='$ID'"; //primero actualizamos el estado de la operacion
		if($conexion->query($actualizar)){
			$seleccionar = "SELECT * FROM Fondos WHERE ID ='".$ID."'";
			$resultados = $conexion->query($seleccionar);//basandonos en la ID, recuperamos los datos de la operacion en concreto

			if($resultados -> num_rows > 0){
				$r = array();
				foreach($resultados as $row){
					array_push($r,$row);
				}
				$datosOperacion=$r[0];
			}
			$profit=0; //inicializamos la variable profit
			if($estado=="Ganancia"){
				$resultado2=$conexion->query("SELECT CURRENT_DATE");
				$fila=$resultado2-> fetch_assoc();
				$fechaActual=$fila["CURRENT_DATE"]; //todo esto es necesario para poder conseguir la fecha actual y trabajar con ella en las lineas de abajo
				$resultado3=$conexion->query("SELECT DATEDIFF('".$fechaActual."','".$datosOperacion["Fecha"]."') AS DATEDIFF"); //calculamos los dias que la operacion ha estado en proceso 
				$fila=$resultado3-> fetch_assoc();
				$numeroDias=$fila["DATEDIFF"]; //todo esto es necesario para poder conseguir la diferencia de dias y trabajar con ellos en las lineas de abajo
				$profit=($datosOperacion["Rentabilidad"]/365)*$numeroDias; //calculamos el profit segun la rentabilidad que es un porcentaje anual
				if($datosOperacion["Dividendo"]=="Mensual"){ //si hay dividendo y segun que tipo, tambien sumamos o restamos su porcentaje al profit
					$profit+=($datosOperacion["PorcentajeDiv"]/30)*$numeroDias;
				}else if($datosOperacion["Dividendo"]=="Trimestral"){
					$profit+=($datosOperacion["PorcentajeDiv"]/90)*$numeroDias;
				}else if($datosOperacion["Dividendo"]=="Semestral"){
					$profit+=($datosOperacion["PorcentajeDiv"]/180)*$numeroDias;
				}else if($datosOperacion["Dividendo"]=="Anual"){
					$profit+=($datosOperacion["PorcentajeDiv"]/365)*$numeroDias;
				}
			}else if($estado=="Pérdida"){
				$profit=-$datosOperacion["Cantidad"]; //restaremos la cantidad invertida
			}else if($estado=="Neutro"){
				$profit=0;
			}
			$conexion->query("UPDATE Fondos SET Profit='".$profit."' WHERE ID='$ID'"); //insertamos el profit de la operacion en concreto
			if($estado!="Neutro"){ //en estado neutro, el profit no varia, por lo que no es necesario hacer este fragmento de codigo
				$resultado4 = $conexion->query("SELECT Profit FROM Profitfondos WHERE Fecha='".$datosOperacion["Fecha"]."'"); //recuperamos el profit del dia en concreto que ya habia almacenado
				$fila=$resultado4-> fetch_assoc();
				$profitActual=$fila["Profit"]; //todo esto es necesario para poder trabajar con el profitActual en las lineas de abajo
				$profitActual+=$profit; //actualizamos dicho profit sumando el de esta operacion
				$conexion->query("UPDATE Profitfondos SET Profit='$profitActual' WHERE Fecha='".$datosOperacion["Fecha"]."'"); //actualizamos el nuevo profit en BBDD
			}
			require "../actividad/CaptarIP.php"; //una vez hecho todo, utilizamos los datos de operacion para registrarlos en los logs
			$ip=get_client_ip();
			$Usuario=$datosOperacion["Usuario"];
			$Fecha=$datosOperacion["Fecha"];
			$Tipo=$datosOperacion["Tipo"];
			$Cantidad=$datosOperacion["Cantidad"];
			require "../actividad/RegistroEditar.php";
			Registro($ID,$Usuario,$estado,$Fecha,$Tipo,$Cantidad,$ip);
		}
		
		
	}
	
?>