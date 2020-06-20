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
		$intervalo=$obj['intervalo'];

		require "../conexion.php";

		if($tipo!='Todo' && $intervalo!='Todo'){ //si ambos filtros son especificos
			//preparamos los valores de tipo
			if ($tipo=='Depósitos'){
				$tipo='Depósito';
			}else if($tipo=='Retiros'){
				$tipo='Retiro';
			}
			//ejecutamos la query segun intervalo de tiempo
			if ($intervalo=='1 día'){
				$seleccionar = "SELECT * FROM Cartera WHERE Usuario ='".$user."' AND Tipo='".$tipo."' AND Fecha >= DATE_ADD(CURDATE(), INTERVAL -1 DAY)";
			}else if($intervalo=='1 semana'){
				$seleccionar = "SELECT * FROM Cartera WHERE Usuario ='".$user."' AND Tipo='".$tipo."' AND Fecha >= DATE_ADD(CURDATE(), INTERVAL -7 DAY)";
			}else if($intervalo=='1 mes'){
				$seleccionar = "SELECT * FROM Cartera WHERE Usuario ='".$user."' AND Tipo='".$tipo."' AND Fecha >= DATE_ADD(CURDATE(), INTERVAL -30 DAY)";
			}
		}else if($tipo!='Todo' || $intervalo!='Todo'){ //si solo un filtro es especifico
			if($tipo!='Todo'){ //si es el tipo filtramos solo por este
				if ($tipo=='Depósitos'){
					$tipo='Depósito';
				}else if($tipo=='Retiros'){
					$tipo='Retiro';
				}
				$seleccionar = "SELECT * FROM Cartera WHERE Usuario ='".$user."' AND Tipo='".$tipo."'";
			}else{ //si solo es el intervalo filtramos solo por este
				if ($intervalo=='1 día'){
					$seleccionar = "SELECT * FROM Cartera WHERE Usuario ='".$user."' AND Fecha >= DATE_ADD(CURDATE(), INTERVAL -1 DAY)";
				}else if($intervalo=='1 semana'){
					$seleccionar = "SELECT * FROM Cartera WHERE Usuario ='".$user."' AND Fecha >= DATE_ADD(CURDATE(), INTERVAL -7 DAY)";
				}else if($intervalo=='1 mes'){
					$seleccionar = "SELECT * FROM Cartera WHERE Usuario ='".$user."' AND Fecha >= DATE_ADD(CURDATE(), INTERVAL -30 DAY)";
				}
			}
		}else{ //ningun filtro es especifico, no filtramos
			$seleccionar = "SELECT * FROM Cartera WHERE Usuario ='".$user."'";
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