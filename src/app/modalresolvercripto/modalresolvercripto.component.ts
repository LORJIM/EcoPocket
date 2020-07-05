import { Component, Inject, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-modalresolvercripto',
  templateUrl: './modalresolvercripto.component.html',
  styleUrls: ['../modalalta/modalalta.component.css']
})
export class ModalresolvercriptoComponent implements OnInit {
	private _url:string=localStorage.getItem("host")+"ecopocket/cripto/resolverOperacion.php";
	form: FormGroup;
	valorVenta:any;
	dividendos:any;
	mensaje:any;
  constructor(fb: FormBuilder,private http:HttpClient,public dialogRef: MatDialogRef<ModalresolvercriptoComponent>,
        @Inject(MAT_DIALOG_DATA) public datosResolver: any) { //datosResolver es la id y estado que le hemos pasado metidos en un JSON
			this.form = fb.group({
				valorVenta: [this.valorVenta, Validators.required],
				dividendos: [this.dividendos]
            });
		 }

  ngOnInit(): void {
  }
onAceptar(){
		const {value, valid} = this.form;
	    if(valid){ //si el formulario es valido, es decir, todos los values estan rellenos
			this.datosResolver.valorVenta=value.valorVenta; // metemos el valor de venta a los valores del form que vamos a enviar
			this.datosResolver.dividendos=value.dividendos; // metemos los dividendos a los valores del form que vamos a enviar
			//peticion php
			this.http.post(this._url,this.datosResolver).subscribe(data=>{ 
				this.dialogRef.close(1);  //el 1 indicara a Operaciones que ha aceptado para que refresque
			});
	    }else{ //si hay algun input null -> sin rellenar
			for (var input in value){ //value contiene todos los inputs del formgroup
				var element=$("#form_"+input); //el elemento del html
				var error_element=$("span", element.parent());
				if(this.form.controls[input].status!='VALID'){ //si el estado del input no es valido (cuando sea obligatorio y no este relleno), activamos un aviso en su elemento html
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
    this.dialogRef.close(0); //el 0 indicara a Operaciones que la resolucion no ha llegado a realizarse por lo tanto no hace falta refrescar
  }
}
