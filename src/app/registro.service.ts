import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {Registro} from './registro';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
	private _url:string="http://127.0.0.1/ecopocket/registro.php";
	private mensajeSource = new BehaviorSubject(null);
  	mensajeActual = this.mensajeSource.asObservable();
  constructor(private router: Router,private http:HttpClient) { }

	Registro(datos){
		return this.http.post(this._url,datos).subscribe(data=>{
			this.mensajeSource.next(data);
			this.router.navigate(['/login']); //navega al login
		});  
	}
}
