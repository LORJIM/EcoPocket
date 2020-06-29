import { Component,Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modalbaja',
  templateUrl: './modalbaja.component.html',
  styleUrls: ['./modalbaja.component.css']
})
export class ModalbajaComponent implements OnInit {
	private _url:string=localStorage.getItem("host")+"ecopocket/cartera/eliminar.php";
	mensaje:any;
  constructor(private snackBar: MatSnackBar,private http:HttpClient,public dialogRef: MatDialogRef<ModalbajaComponent>,
 	@Inject(MAT_DIALOG_DATA) public datosMiCartera: any) { //datosMiCartera es la id que le hemos pasado metida en un JSON
		}

  ngOnInit(): void {
	
  }
	
	onAceptar(){
			//peticion php
			this.http.post(this._url,this.datosMiCartera).subscribe(data=>{ 
				this.mensaje=data;
				let snackBarRef = this.snackBar.open(this.mensaje,"",{duration: 3000}); //mostramos el mensaje de salida de php
				if(this.mensaje!="Ha ocurrido un error inesperado"){ //si la eliminacion se realiza con exito cerramos la modal
		        	this.dialogRef.close(1); //el 1 indicara a Mi Cartera que ha aceptado para que refresque
				}
			});
	}
onCancelar(): void {
    this.dialogRef.close(0); //el 0 indicara a Mi Cartera que la eliminacion no ha llegado a realizarse por lo tanto no hace falta refrescar
  }
}
