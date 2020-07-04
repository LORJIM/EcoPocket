import { Component,Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modalaltafondos',
  templateUrl: './modalaltafondos.component.html',
  styleUrls: ['../modalalta/modalalta.component.css']
})
export class ModalaltafondosComponent implements OnInit {
	private _url:string=localStorage.getItem("host")+"ecopocket/fondos/insertar.php";
	form: FormGroup;
	tipo:any;
	cantidad:any;
	fechaActual:any;
	empresa:any;
	rentabilidad:any;
	dividendo:any;
	porcdividendo:any;
	fecha:any;
  detalles:any;
	mensaje:any;

  constructor(fb: FormBuilder,private snackBar: MatSnackBar,private http:HttpClient,public dialogRef: MatDialogRef<ModalaltafondosComponent>,
        @Inject(MAT_DIALOG_DATA) lol) {
            this.form = fb.group({
				        tipo: [this.tipo, Validators.required],
                cantidad: [this.cantidad, Validators.required],
                fecha: [this.fecha, Validators.required],
                rentabilidad: [this.rentabilidad, Validators.required],
                dividendo: [this.dividendo, Validators.required],
                porcdividendo: [this.porcdividendo],
                empresa: [this.empresa],
                detalles: [this.detalles]
            });
         }

  ngOnInit(): void {
	var d = new Date();
	var anio=d.getFullYear();
	var mes = d.getMonth()+1;
	var dia=d.getDate();
	if(dia<10){
       var dd='0'+dia.toString();
    }else{
		var dd=dia.toString();
	}
    if(mes<10){
        var mm='0'+mes.toString();
    }else{
		var mm=mes.toString();
	}
	this.fechaActual=anio+"-"+mm+"-"+dd;//establecemos la fecha maxima (hoy) para el input fecha, evitando que metan operaciones que aun no se han realizado
  }

	
	onChangeTipo(event: any){
		if(event.target.value=="Bienes Inmobiliarios" || event.target.value=="Bonos del Estado"){ //el campo empresa solo estara habilitado cuando el tipo sea acciones o fondos
			$('#form_empresa').val(''); //limpiar el campo antes de deshabilitarlo
			$('#form_empresa').prop("disabled", true);
			this.form.get('empresa').setValue(null); //esto hay que hacerlo para limpiar el campo del reactive form de angular
		}else{
			$('#form_empresa').prop("disabled", false);
		}
	}
	onChangeDividendo(event: any){
		if(event.target.value=="No"){ //el campo porcentaje de dividendo solo estara habilitado y sera obligatorio cuando haya un tipo de dividendo
			$('#form_porcdividendo').val(''); //limpiar el campo antes de deshabilitarlo
			$('#form_porcdividendo').prop("disabled", true);
			this.form.get('porcdividendo').clearValidators();
			this.form.get('porcdividendo').setValue(null); //esto hay que hacerlo para limpiar el campo del reactive form de angular
		}else{
			$('#form_porcdividendo').prop("disabled", false);
			this.form.get('porcdividendo').setValidators([Validators.required]);
		}
		this.form.get('porcdividendo').updateValueAndValidity();
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
      this.dialogRef.close();
    }
}
