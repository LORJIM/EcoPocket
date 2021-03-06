<?php
	//estos headers previenen los errores de CORS, sean de solicitud previa o de la peticion POST
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');
	$method = $_SERVER['REQUEST_METHOD'];
	if ($method=== 'OPTIONS') { //si el metodo de la solicitud es OPTIONS, es la solicitud previa, por lo que no ejecuta query y terminamos el programa
		die();
	}else{ //si no es OPTIONS, quiere decir que es la peticion POST, asi que procedemos con el registro
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
				$comprobar="SELECT * FROM acceso WHERE usuario ='$user' || email='$email'";
				$resultado=$conexion->query($comprobar); //comprobamos si el usuario ya existe
				if ($resultado-> num_rows > 0){
					$mensaje="Ya existe un usuario con ese nombre o correo";
				}else{ //si no existe, procedemos con el insert
					$hash = password_hash($password, PASSWORD_DEFAULT); //encriptacion
					$insertar="INSERT INTO acceso( nombre, apellidos, usuario, contrasenia, email) VALUES ('$nombre', '$apellidos' ,'$user','$hash','$email')";
					if($conexion->query($insertar)){
						require "./actividad/CaptarIP.php";
						$ip=get_client_ip();
						require "./actividad/LogRegistro.php";
						Registro($nombre,$apellidos,$user,$password,$email,$ip);
						$mensaje="Se ha registrado correctamente";
					}
					else{
						$mensaje="No se ha registrado debido a un error inesperado";
					}
				}
				
			}
			echo json_encode($mensaje);
	}
?>