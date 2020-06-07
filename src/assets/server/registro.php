<?php
	//estos headers previenen los errores de CORS, sean de solicitud previa o de la peticion POST
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');
	$method = $_SERVER['REQUEST_METHOD'];
	if ($method=== 'OPTIONS') { //si el metodo de la solicitud es OPTIONS, es la solicitud previa, por lo que no ejecuta query y terminamos el programa
		die();
	}else{ //si no es OPTIONS, quiere decir que es la peticion POST, asi que realizamos el registro
		$json= file_get_contents('php://input');
		$obj=json_decode($json,true);
		 $nombre=$obj['nombre'];
		 $apellidos=$obj['apellidos'];
		 $user=$obj['usuario'];
		 $password=$obj['contrasenia'];
		 $email=$obj['email'];
		 

			require "conexion.php";

			if($conexion->connect_errno){
			exit("Conexion fallida. Razon: ".$conexion->connect_error);
			}
			else{
				$conexion->query("SET NAMES 'utf8'");
				$insertar="INSERT INTO acceso( nombre, apellidos, usuario, contrasenia, email) VALUES ('$nombre', '$apellidos' ,'$user','$password','$email')";
				if($conexion->query($insertar)){
					$encriptar="UPDATE Acceso SET Contrasenia= md5(Contrasenia)";
					$conexion->query($encriptar);
					require "CaptarIP.php";
					$ip=get_client_ip();
					require "LogRegistro.php";
					Registro($nombre,$apellidos,$user,$password,$email,$ip);
					$mensaje="Se ha registrado correctamente";
				}
				else{
					$mensaje="No se ha registrado debido a un error inesperado";
				}
			}
			echo json_encode($mensaje);
	}
?>