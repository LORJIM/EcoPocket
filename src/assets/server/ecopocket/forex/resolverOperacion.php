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
		$valorVenta=$obj['valorVenta'];

		require "../conexion.php";
	
		
		
		$actualizar = "UPDATE Forex SET Estado='$estado' WHERE ID='$ID'"; //primero actualizamos el estado de la operacion
		if($conexion->query($actualizar)){
			$seleccionar = "SELECT * FROM Forex WHERE ID ='".$ID."'";
			$resultados = $conexion->query($seleccionar);//basandonos en la ID, recuperamos los datos de la operacion en concreto

			if($resultados -> num_rows > 0){
				$r = array();
				foreach($resultados as $row){
					array_push($r,$row);
				}
				$datosOperacion=$r[0];
			}
			$profit=0; //inicializamos la variable profit
			if($estado!="Neutro"){ //gananacia o perdida
				$profit=($valorVenta*$datosOperacion["Importe"])-($datosOperacion["ValorCompra"]*$datosOperacion["Importe"]); //el profit siempre sera la diferencia entre el valor de venta y el de compra
			}else if($estado=="Neutro"){
				$profit=0;
			}
			$conexion->query("UPDATE Forex SET Profit='".$profit."',ValorVenta='".$valorVenta."' WHERE ID='$ID'"); //insertamos el profit y el valor de venta de la operacion en concreto
			if($estado!="Neutro"){ //en estado neutro, el profit no varia, por lo que no es necesario hacer este fragmento de codigo
				$resultado4 = $conexion->query("SELECT Profit FROM Profitforex WHERE Fecha='".$datosOperacion["Fecha"]."' AND Usuario='".$datosOperacion["Usuario"]."'"); //recuperamos el profit del dia en concreto que ya habia almacenado
				$fila=$resultado4-> fetch_assoc();
				$profitActual=$fila["Profit"]; //todo esto es necesario para poder trabajar con el profitActual en las lineas de abajo
				$profitActual+=$profit; //actualizamos dicho profit sumando el de esta operacion
				$conexion->query("UPDATE Profitforex SET Profit='$profitActual' WHERE Fecha='".$datosOperacion["Fecha"]."' AND Usuario='".$datosOperacion["Usuario"]."'"); //actualizamos el nuevo profit en BBDD
			}
			require "../actividad/CaptarIP.php"; //una vez hecho todo, utilizamos los datos de operacion para registrarlos en los logs
			$ip=get_client_ip();
			$Usuario=$datosOperacion["Usuario"];
			$Fecha=$datosOperacion["Fecha"];
			$Tipo=$datosOperacion["Moneda"];
			$Cantidad=$datosOperacion["Importe"];
			require "../actividad/RegistroEditar.php";
			Registro($ID,$Usuario,$estado,$Fecha,$Tipo,$Cantidad,$ip);
		}
		
		
	}
	
?>