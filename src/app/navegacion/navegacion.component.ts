import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavegacionService} from '../navegacion.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  constructor(private router: Router,private nav: NavegacionService) { }

  ngOnInit(): void {
	this.nav.data='S'; //indicador de que el usuario esta logeado
	if(this.nav.categoria!=undefined){ //si se encuentra en una categoria, muestra las funcionalidades
		(function ($) {
		 $('.funcion').show();
		})(jQuery);
	}else{ //si no, las oculta
		(function ($) {
		 $('.funcion').hide();
		})(jQuery);
	}
  }
	//el sentido de este servicio reside en que se asegura que el usuario esta logeado, y esta accediendo desde la pagina principal
	onMiCartera(){
		this.router.navigate(['/mi-cartera']); //navega a Mi Cartera
	}
	onOperaciones(){
		var categoria=this.nav.categoria;
		switch (categoria){
			case 'I':{
				this.router.navigate(['/operacionesfondos']); //navega a Operaciones de Fondos de Inversion
				break;
			}
			case 'F':{
				this.router.navigate(['/operacionesforex']); //navega a Operaciones de Forex
				break;
			}
			case 'C':{
				this.router.navigate(['/operacionescripto']); //navega a Operaciones de Criptomonedas
				break;
			}
			case 'A':{
				this.router.navigate(['/operacionesapuestas']); //navega a Operaciones de Apuestas Deportivas
				break;
			}
			case 'H':{
				this.router.navigate(['/operacioneshogar']); //navega a Operaciones de Gestion del Hogar
				break;
			}
		}
	}
	onTrayectoria(){
		this.router.navigate(['/trayectoria']); //navega a Trayectoria
	}
	onMiCuenta(){
		this.router.navigate(['/mi-cuenta']); //navega a Mi Cuenta
	}
	onContacto(){
		this.router.navigate(['/contacto']); //navega a Contacto
	}
	onFondos(){
		this.nav.categoria='I';
		this.router.navigate(['/fondos']); //navega a Fondos de Inversion
	}
	onForex(){
		this.nav.categoria='F';
		this.router.navigate(['/forex']); //navega a Forex
	}
	onCripto(){
		this.nav.categoria='C';
		this.router.navigate(['/cripto']); //navega a Criptomonedas
	}
	onApuestas(){
		this.nav.categoria='A';
		this.router.navigate(['/apuestas']); //navega a Apuestas Deportivas
	}
	onHogar(){
		this.nav.categoria='H';
		this.router.navigate(['/hogar']); //navega a Gestion del Hogar
	}
}
