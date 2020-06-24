<?php
	function Registro($ID,$ip){
        $accion=" Se ha eliminado de la base de datos el movimiento con ID: ";
        $hora=date("G:i:s");
        $date=date("d-m-Y");
        $FileName=$date.".log";

        
        if($archivo = fopen("../actividad/LOGS/$FileName", "a"))
        {
            if(fwrite($archivo, date("d-m-Y").$accion."[".$ID."] a las ".$hora." Desde la direccion ".$ip. "\r\n"))
            {
                
            }
 
            fclose($archivo);
        }
        
    }
?>