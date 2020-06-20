import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {
	data:string; //esta variable devuelve una S si el usuario se ha logeado con exito
	categoria:string; //esta variable devuelve un valor si el usuario se encuentra dentro de una categoria
	/*VALORES DE VARIABLE CATEGORIA:
	I -> Fondos de Inversion
	F -> Forex
	C -> Criptomonedas
	A -> Apuestas Deportivas
	H -> Gestion del Hogar
	*/
  constructor() { }
}
