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
		$Contrasenia=$obj['contrasenia'];

		require "conexion.php";

		$login = "SELECT * FROM Acceso WHERE Usuario ='".$user."'";
		$resultados = $conexion->query($login);
		

		if ($resultados-> num_rows > 0) { //si hay coincidencia, significa que el usuario existe

			$fila=$resultados-> fetch_assoc();
			if(password_verify ( $Contrasenia , $fila["Contrasenia"] )){ //si devuelve true, los passwords coinciden, asi que el usuario se ha autenticado correctamente
				require "InsertarLogeos.php";
				require "./actividad/CaptarIP.php";
				$ip=get_client_ip();
				require "./actividad/RegistroInicSesion.php";
				$variable=1; //indicador de que el login se ha realizado correctamente
				Registro($variable,$user,$ip);
				$mensaje="Bienvenido";
			}else{
				require "./actividad/CaptarIP.php";
				$ip=get_client_ip();
				require "./actividad/RegistroInicSesion.php";
				$variable=0; //indicador de que el login NO se ha realizado correctamente porque el password no es correcto
				Registro($variable,$user,$ip);
				$mensaje="Usuario o Contraseña erróneos";
			}
		}
		else
		{
			require "./actividad/CaptarIP.php";
			$ip=get_client_ip();
			require "./actividad/RegistroInicSesion.php";
			$variable=0; //indicador de que el login NO se ha realizado correctamente porque el usuario no existe
			Registro($variable,$user,$ip);
			$mensaje="Usuario o Contraseña erróneos";
		}
			echo json_encode($mensaje);
	}
	
?>