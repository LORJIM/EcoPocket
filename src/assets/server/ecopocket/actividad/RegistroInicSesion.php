<?php
        
    function Registro($variable,$user,$ip){

        $accion=" ha iniciado sesion a las ";
        $hora=date("G:i:s");
        $date=date("d-m-Y");
        $FileName=$date.".log";

        if ($variable == 1) {
        
            if($archivo = fopen("./actividad/LOGS/$FileName", "a"))
            {
                if(fwrite($archivo, date("d-m-Y")." El Usuario ".$user.$accion.$hora." Desde la direccion ".$ip. "\r\n"))
                {
                }
 
                fclose($archivo);
            }
        }
        else{
            if ($archivo = fopen("./actividad/LOGS/$FileName", "a")) {
                if(fwrite($archivo, date("d-m-Y")." Intento de conexión fallido a las ".$hora." Desde la direccion ".$ip. "\r\n"))
                {
                   
                }
 
                fclose($archivo);
            }
        }
    }
?>