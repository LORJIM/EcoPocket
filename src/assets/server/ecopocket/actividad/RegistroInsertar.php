<?php
	function Registro($user,$tipo,$importe,$plataforma,$fecha,$ip){
        $accion=" ha introducido a la base de datos: ";
        $hora=date("G:i:s");
        $date=date("d-m-Y");
        $FileName=$date.".log";
        
        if($archivo = fopen("../actividad/LOGS/$FileName", "a")) //Esta ruta tiene como punto de referencia la ruta donde esta el archivo que tiene el require, que en este caso es insertar.php
        {
            if(fwrite($archivo, date("d-m-Y")." El Usuario ".$user.$accion."[".$tipo.", ".$importe." EUR, Plataforma: ".$plataforma.", ".$fecha."] a las ".$hora." Desde la direccion ".$ip. "\r\n"))
            {
                
            }
 
            fclose($archivo);
        }
        
    }
?>