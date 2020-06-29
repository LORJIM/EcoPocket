import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Registro} from './registro';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
	private _url:string=localStorage.getItem("host")+"ecopocket/registro.php";
	private mensajeSource = new BehaviorSubject(null);
  	mensajeActual = this.mensajeSource.asObservable();
	mensaje:string;
  constructor(private router: Router,private http:HttpClient,private snackBar: MatSnackBar) { }

	Registro(datos){
		return this.http.post(this._url,datos).subscribe(data=>{
			this.mensajeSource.next(data);
			this.mensajeActual.subscribe(mensaje => this.mensaje = mensaje);
			if(this.mensaje.substring(0,1)!='S'){ //si el mensaje de vuelta no es Se ha registrado correctamente, significa que el registro no se ha realizado
				let snackBarRef = this.snackBar.open(this.mensaje,"",{duration: 3000});
			}else{ //si el registro se ha realizado bien, navega al login
				this.router.navigate(['/login']);
			}
		});  
	}
}
