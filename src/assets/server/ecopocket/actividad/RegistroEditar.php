<?php
	function Registro($ID,$Usuario,$estado,$Fecha,$Tipo,$Cantidad,$ip){
		$accion=" Se ha resuelto la operación con los siguientes datos: ";
        $hora=date("G:i:s");
        $date=date("d-m-Y");
        $FileName=$date.".log";

        if($archivo = fopen("../actividad/LOGS/$FileName", "a"))
        {
        	if (fwrite($archivo, date("d-m-Y").$accion."[ID: ".$ID." / Usuario: ".$Usuario." / Estado: ".$estado." / Fecha Operación: ".$Fecha." / Tipo: ".$Tipo." / Cantidad: ".$Cantidad."] Desde la direccion ".$ip. "\r\n")) 
        	{
        		 
        
			}
 
            fclose($archivo);
		}
    }

?>