import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavegacionService} from './navegacion.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Login} from './login';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	private _url:string="http://127.0.0.1/ecopocket/Login.php";
	private mensajeSource = new BehaviorSubject(null);
  	mensajeActual = this.mensajeSource.asObservable();
	mensaje:string;
  constructor(private router: Router,private nav: NavegacionService,private http:HttpClient,private snackBar: MatSnackBar) { }

	Login(datos){
		return this.http.post(this._url,datos).subscribe(data=>{
			this.mensajeSource.next(data);
			this.mensajeActual.subscribe(mensaje => this.mensaje = mensaje);
			let snackBarRef = this.snackBar.open(this.mensaje,"",{duration: 3000});
			if(this.mensaje=='Bienvenido'){ //si el php devuelve este mensaje, significa que el login ha sido un exito
				localStorage.setItem("usuario", datos.usuario); //guardamos el usuario que ha iniciado sesion
				this.nav.data='S'; //indicador de que el log ha sido un exito, de que el usuario esta logeado
				this.router.navigate(['']); //navega a la pagina principal
			}
		});  
	}
}
