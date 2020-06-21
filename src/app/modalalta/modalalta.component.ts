import { Component,Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modalalta',
  templateUrl: './modalalta.component.html',
  styleUrls: ['./modalalta.component.css']
})
export class ModalaltaComponent implements OnInit {
	private _url:string="http://127.0.0.1/ecopocket/cartera/insertar.php";
	form: FormGroup;
	tipo:any;
	importe:any;
	plataforma:any;
	fecha:any;
	mensaje:any;
  constructor(fb: FormBuilder,private snackBar: MatSnackBar,private http:HttpClient,public dialogRef: MatDialogRef<ModalaltaComponent>,
        @Inject(MAT_DIALOG_DATA) lol) {
            this.form = fb.group({
				tipo: [this.tipo, Validators.required],
                importe: [this.importe, Validators.required],
                fecha: [this.fecha, Validators.required],
                plataforma: [this.plataforma, Validators.required]
            });
		}

  ngOnInit(): void {
	
  }
	
	onAceptar(){
		const {value, valid} = this.form;
	    if(valid){ //si el formulario es valido, es decir, todos los values estan rellenos
			value.usuario=localStorage.getItem("usuario"); // metemos el usuario a los valores del form que vamos a enviar
			//peticion php
			this.http.post(this._url,value).subscribe(data=>{ 
				this.mensaje=data;
				let snackBarRef = this.snackBar.open(this.mensaje,"",{duration: 3000}); //mostramos el mensaje de salida de php
				if(this.mensaje!="Ha ocurrido un error inesperado"){ //si la insercion se realiza con exito cerramos la modal
		        	this.dialogRef.close();
				}
			});
	    }else{ //si hay algun input null -> sin rellenar
			for (var input in value){ //value contiene todos los inputs del formgroup
				var element=$("#form_"+input); //el elemento del html
				var error_element=$("span", element.parent());
				if(value[input]==null){ //si el value es null, activamos un aviso en su elemento html
					element.removeClass("valid").addClass("invalid");
					error_element.removeClass("error").addClass("error_show");
				}else{ //si el value no es null, bordeamos con verde su elemento html
					element.removeClass("invalid").addClass("valid");
					error_element.removeClass("error_show").addClass("error");
				}
			}
		}
	}
onCancelar(): void {
    this.dialogRef.close();
  }
}
