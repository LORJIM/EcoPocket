import { Component, OnInit } from '@angular/core';
import {NavegacionService} from '../navegacion.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.css']
})
export class MicuentaComponent implements OnInit {
	private _url:string="http://127.0.0.1/ecopocket/micuenta.php";
	private dataSource = new BehaviorSubject(null);
  dataActual = this.dataSource.asObservable();
	usuario:string;
	nombre:string;
	apellidos:string;
	email:string;

  constructor(private nav: NavegacionService,private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
	if(this.nav.data==undefined){ //si no se ha logeado un usuario, se redirige al login
		this.router.navigate(['/login']);
	}else{
		var datos={usuario: localStorage.getItem("usuario")};
		this.http.post(this._url,datos).subscribe(data=>{
			this.dataSource.next(data);
			this.usuario=this.dataSource.value.Usuario;
			this.nombre=this.dataSource.value.Nombre;
			this.apellidos=this.dataSource.value.Apellidos;
			this.email=this.dataSource.value.Email;
		}); 
	}
	
  }
}
