import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {
	data:string; //esta variable devuelve una S si el usuario se ha logeado con exito
  constructor() { }
}
