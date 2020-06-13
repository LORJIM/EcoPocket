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
  }
	//el sentido de este servicio reside en que se asegura que el usuario esta logeado, y esta accediendo desde la pagina principal
	onMiCuenta(){
		this.router.navigate(['/mi-cuenta']); //navega a Mi Cuenta
	}
	onContacto(){
		this.router.navigate(['/contacto']); //navega a Contacto
	}
	onFondos(){
		this.router.navigate(['/fondos']); //navega a Fondos de Inversion
	}
	onForex(){
		this.router.navigate(['/forex']); //navega a Forex
	}
	onCripto(){
		this.router.navigate(['/cripto']); //navega a Criptomonedas
	}
	onApuestas(){
		this.router.navigate(['/apuestas']); //navega a Apuestas Deportivas
	}
	onHogar(){
		this.router.navigate(['/hogar']); //navega a Gestion del Hogar
	}
}
