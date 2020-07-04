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
	private _url2:string=localStorage.getItem("host")+"ecopocket/fondos/eliminar.php";
	private _url3:string=localStorage.getItem("host")+"ecopocket/forex/eliminar.php";
	private _url4:string=localStorage.getItem("host")+"ecopocket/cripto/eliminar.php";
	private _url5:string=localStorage.getItem("host")+"ecopocket/apuestas/eliminar.php";
	private _url6:string=localStorage.getItem("host")+"ecopocket/hogar/eliminar.php";
	mensaje:any;
  constructor(private snackBar: MatSnackBar,private http:HttpClient,public dialogRef: MatDialogRef<ModalbajaComponent>,
 	@Inject(MAT_DIALOG_DATA) public datosMiCartera: any) { //datosMiCartera es la id que le hemos pasado metida en un JSON
		}

  ngOnInit(): void {
	
  }
	
	onAceptar(){
			switch(this.datosMiCartera.tipo){ //segun de donde estamos realizando la baja, se utilizara una url u otra
				case 'CA':{ //Mi Cartera
					var url=this._url;
					break;
				}
				case 'I':{ //Fondos de Inversion
					var url=this._url2;
					break;
				}
				case 'F':{ //Forex
					var url=this._url3;
					break;
				}
				case 'CR':{ //Criptomonedas
					var url=this._url4;
					break;
				}
				case 'A':{ //Apuestas Deportivas
					var url=this._url5;
					break;
				}
				case 'H':{ //Gestion del Hogar
					var url=this._url6;
					break;
				}
			}
			//peticion php
			this.http.post(url,this.datosMiCartera).subscribe(data=>{ 
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
