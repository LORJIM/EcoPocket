import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Registro} from '../registro';
import {RegistroService} from '../registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../login/login.component.css'] //el estilo es el mismo que en el login
})
export class RegistroComponent implements OnInit {
	nombre:string;
	apellidos:string;
	usuario:string;
	email:string;
	contrasenia:string;
  constructor(private router: Router, private reg: RegistroService) { }

  ngOnInit(): void {
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

datos:Registro;
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
	
	
	onRegistro(){
		if(this.validacion()==true){ //el registro es correcto por parte front
			this.datos=   {nombre:this.nombre, apellidos:this.apellidos, usuario: this.usuario, contrasenia: this.contrasenia, email: this.email};
		//	this.reg.Registro(this.datos);
			this.router.navigate(['/login']); //navega al login
		}
		
	}
}
