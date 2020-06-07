import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {RegistroService} from '../registro.service';
import {LoginService} from '../login.service';
import {Login} from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	usuario:string;
	contrasenia:string;
	mensaje:string;
  constructor(private router: Router,private snackBar: MatSnackBar, private reg:RegistroService, private log:LoginService) { }

  ngOnInit(): void {
	//mensaje de resultado del registro, si viene, lo muestra en una popup
	this.reg.mensajeActual.subscribe(mensaje => this.mensaje = mensaje);
	if(this.mensaje!=null){
		let snackBarRef = this.snackBar.open(this.mensaje,"",{duration: 3000});
	}
	
	//utilizamos un disparador de jquery para que cuando seleccionemos uno de los campos se eliminen los mensajes de aviso
	//como esto siempre debe estar alerta, lo pongo en el ngOnInit y utilizo el document ready de jquery
	   (function ($) {
		 $('.validate-form .input100').each(function(){
	        $(this).focus(function(){
	           hideValidate(this);
	        });
	    });
		//oculta mensajes de aviso
	    function hideValidate(input) {
	        var thisAlert = $(input).parent();
	
	        $(thisAlert).removeClass('alert-validate');
	    }

		})(jQuery);
  }
datos:Login;
validacion(){
	    "use strict";
	
	    /*==================================================================
	    [ Validacion ]*/
	    var input = $('.validate-input .input100');
	    var check = true;
		//si la validacion devuelve un false, mostramos los mensajes de aviso
	    for(var i=0; i<input.length; i++) {
	      if(validate(input[i]) == false){
	          showValidate(input[i]);
	          check=false;
	   	  }
	    }
			
	    return check; //variable de validacion definitiva
		//validacion de campos
	    function validate (input) {
	        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
	            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
	                return false;
	            }
	        }
	        else {
	            if($(input).val().trim() == ''){
	                return false;
	            }
	        }
	    }
		//muestra mensajes de aviso
	    function showValidate(input) {
	        var thisAlert = $(input).parent();
			
	        $(thisAlert).addClass('alert-validate');
	    }
	   
	    
	}
	
	
	onLogin(){
		if(this.validacion()==true){ //si la validacion por front es correcta
			this.datos=   {usuario: this.usuario, contrasenia: this.contrasenia};
			this.log.Login(this.datos); //ya es el servicio el que se encarga de lo demas, incluida navegacion
		}
	}

}
