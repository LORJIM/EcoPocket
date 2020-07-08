import { Component, OnInit } from '@angular/core';
import {NavegacionService} from '../navegacion.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trayectoria',
  templateUrl: './trayectoria.component.html',
  styleUrls: ['../cartera/cartera.component.css']
})
export class TrayectoriaComponent implements OnInit {
	private _url:string=localStorage.getItem("host")+"ecopocket/trayectoria.php";
	mensaje:any;
	dataSource:any;
	categoria:any;
	modoSeleccionado:any='D\u00EDas'; //valores por defecto
	intervaloSeleccionado:any='1 semana'; //valores por defecto

  constructor(private nav: NavegacionService,private http:HttpClient, private router: Router) {
	this.categoria=this.router.getCurrentNavigation().extras.state.categoria; //obtenemos la categoria en la que nos encontramos
 	}

  ngOnInit(): void {
	if(this.nav.data==undefined){ //si no se ha logeado un usuario, se redirige al login
		this.router.navigate(['/login']);
	}else{
		this.consulta(); //consulta
	}
  }

	consulta(){
		//reiniciamos los datos de salida
		this.dataSource = null;
		this.mensaje='';
		//mandamos el usuario, filtro de intervalo y categoria pasa consultar los datos adecuados
		var datos={usuario: localStorage.getItem("usuario"),categoria: this.categoria, intervalo: this.intervaloSeleccionado};
		this.http.post(this._url,datos).subscribe(data=>{ 
			if(data=="Sin resultados"){
				this.mensaje=data;
			}else{
				this.dataSource = data;
			}
		});
	}
	onFiltroModo(event: any){
		this.modoSeleccionado=event.target.value;
		this.consulta(); //refrescar solo la consulta
	}
	onFiltroIntervalo(event: any){
		this.intervaloSeleccionado=event.target.value;
		this.consulta(); //refrescar solo la consulta
	}
}
