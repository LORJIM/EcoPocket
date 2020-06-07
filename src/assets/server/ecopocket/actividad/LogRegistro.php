<?php
    function Registro($Nombre,$Apellidos,$Usuario,$Contrasenia,$Email,$ip){
        $accion=" Se han registrado en la base de datos con los siguientes datos: ";
        $hora=date("G:i:s");
        $date=date("d-m-Y");
        $FileName=$date.".log";
        
        if($archivo = fopen("./actividad/LOGS/$FileName", "a"))
        {
            if(fwrite($archivo, date("d-m-Y").$accion."[".$Nombre.", ".$Apellidos.", ".$Usuario.", ".$Contrasenia.", ".$Email."] a las ".$hora." Desde la direccion ".$ip. "\r\n"))
            {
               
            }
            else
            {
                echo "No se pudo ejecutar";
            }
 
            fclose($archivo);
        }
        
    }
?>