import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-modalaltahogar',
  templateUrl: './modalaltahogar.component.html',
  styleUrls: ['../modalalta/modalalta.component.css']
})
export class ModalaltahogarComponent implements OnInit {
	private _url:string=localStorage.getItem("host")+"ecopocket/hogar/insertar.php";
	form: FormGroup;
	tipo:any;
	importe:any;
	fechaActual:any;
	causa:any;
	fecha:any;
  detalles:any;
		//declaramos estos objetos de opciones para el desplegable causa segun el onChangeTipo
		opcionesIngreso:any = {"N\u00F3mina": "N\u00F3mina",
		  "Venta": "Venta",
		  "Regalo": "Regalo",
		  "Otro": "Otro"
		}; 
		opcionesGasto:any = {"Ocio": "Ocio",
		  "Comida": "Comida",
		  "Luz": "Luz",
		  "Internet/Tel\u00E9fono": "Internet/Tel\u00E9fono",
		  "Alquiler/Hipoteca": "Alquiler/Hipoteca",
		  "Estudios": "Estudios",
		  "Gas": "Gas",
		  "Coche": "Coche",
		  "Agua": "Agua",
		  "Ropa": "Ropa",
		  "Otro": "Otro"
		}; 
	mensaje:any;

  constructor(fb: FormBuilder,private snackBar: MatSnackBar,private http:HttpClient,public dialogRef: MatDialogRef<ModalaltahogarComponent>,
        @Inject(MAT_DIALOG_DATA) lol) {
			this.form = fb.group({
				tipo: [this.tipo, Validators.required],
                importe: [this.importe, Validators.required],
                fecha: [this.fecha, Validators.required],
                causa: [this.causa, Validators.required],
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

	onChangeTipo(event: any){ //dependiendo del tipo de operacion, el desplegable de causa cambiara sus opciones
		if(event.target.value=="Ingreso"){ 
			$('#form_causa').prop("disabled", false);
			$('#form_causa option:gt(0)').remove(); // elimina todas las opciones, pero no la primera
			var $el = $("#form_causa");
			$.each(this.opcionesIngreso, function(key:any,value:any) {
			  $el.append($("<option></option>")
			     .attr("value", value).text(key));
			});
		}else if(event.target.value=="Gasto"){
			$('#form_causa').prop("disabled", false);
			$('#form_causa option:gt(0)').remove(); // elimina todas las opciones, pero no la primera
			var $el = $("#form_causa");
			$.each(this.opcionesGasto, function(key:any,value:any) {
			  $el.append($("<option></option>")
			     .attr("value", value).text(key));
			});
		}else{ //si no hay tipo de operacion, el desplegable de causa se mantendra deshabilitado y vacio
			$('#form_causa').val(''); //limpiar el campo antes de deshabilitarlo
			$('#form_causa').prop("disabled", true);
			this.form.get('causa').setValue(null); //esto hay que hacerlo para limpiar el campo del reactive form de angular
		}
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
