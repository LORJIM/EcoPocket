import { Component, OnInit } from '@angular/core';
import {NavegacionService} from '../navegacion.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ModalaltaComponent } from '../modalalta/modalalta.component';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css']
})
export class CarteraComponent implements OnInit {

	private _url:string="http://127.0.0.1/ecopocket/cartera/seleccionar.php";
 dataSource:any;
total:number;
mensaje:string;
tipoSeleccionado:any='Todo'; //valores por defecto
intervaloSeleccionado:any='1 d\u00EDa'; //valores por defecto

  constructor(private nav: NavegacionService,public dialog: MatDialog,private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
	if(this.nav.data==undefined){ //si no se ha logeado un usuario, se redirige al login
		this.router.navigate(['/login']);
	}else{
		this.consulta(); //consulta previa o refresco de datos
	}
  }
	consulta(){
		//reiniciamos los datos de salida
		this.total=0; 
		this.dataSource = null;
		this.mensaje='';
		//mandamos los datos y filtros para consultar automaticamente
		var datos={usuario: localStorage.getItem("usuario"),tipo: this.tipoSeleccionado,intervalo: this.intervaloSeleccionado};
		this.http.post(this._url,datos).subscribe(data=>{ 
			if(data=="Sin resultados"){
				this.mensaje=data;
			}else{
				this.dataSource = data;
				//este for suma importes al balance total
				for (var i = 0; i < this.dataSource.length; i++) {
					if (this.dataSource[i].Tipo=='Retiro'){ //solo sumamos los retiros
						this.total+=parseFloat(this.dataSource[i].Importe);
					}
				}
			}
		});
	}
	onFiltroTipo(event: any){
		this.tipoSeleccionado=event.target.value;
		this.consulta(); //refrescar
	}
	onFiltroIntervalo(event: any){
		this.intervaloSeleccionado=event.target.value;
		this.consulta(); //refrescar
	}
	onAlta(){
		const dialogRef = this.dialog.open(ModalaltaComponent, {
      		width: '500px',
			height: '500px',
    	});
	}
	
	onBaja(){
		
	}
}
