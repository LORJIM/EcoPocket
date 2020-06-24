import { Component, OnInit } from '@angular/core';
import {NavegacionService} from '../navegacion.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ModalaltaComponent } from '../modalalta/modalalta.component';
import { ModalbajaComponent } from '../modalbaja/modalbaja.component';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css']
})
export class CarteraComponent implements OnInit {

	private _url:string="http://127.0.0.1/ecopocket/cartera/seleccionar.php";
 dataSource:any;
 totalSource:any;
total:number;
mensaje:any;
tipoSeleccionado:any='Todo'; //valores por defecto
intervaloSeleccionado:any='1 d\u00EDa'; //valores por defecto

  constructor(private nav: NavegacionService,public dialog: MatDialog,private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
	if(this.nav.data==undefined){ //si no se ha logeado un usuario, se redirige al login
		this.router.navigate(['/login']);
	}else{
		this.obtenerTotal(); //calcular balance total
		this.consulta(); //consulta previa o refresco de datos
	}
  }
	obtenerTotal(){
		//reiniciamos los datos de salida
		this.total=0; 
		this.totalSource = null;
		var datos={usuario: localStorage.getItem("usuario"),tipo: "Todo",intervalo: "Todo"}; //sin filtros
		this.http.post(this._url,datos).subscribe(data=>{ 
			if(data!="Sin resultados"){ //si el usuario tiene movimientos
				this.totalSource = data;
				//este for calcula el balance total
				for (var i = 0; i < this.totalSource.length; i++) {
					if (this.totalSource[i].Tipo=='Retiro'){ //solo sumamos los retiros
						this.total+=parseFloat(this.totalSource[i].Importe);
					}else if (this.totalSource[i].Tipo=='Depósito'){ //y restamos los depositos
						this.total-=parseFloat(this.totalSource[i].Importe);
					}
				}
			}
		});
	}
	consulta(){
		//reiniciamos los datos de salida
		this.dataSource = null;
		this.mensaje='';
		//mandamos los datos y filtros para consultar automaticamente
		var datos={usuario: localStorage.getItem("usuario"),tipo: this.tipoSeleccionado,intervalo: this.intervaloSeleccionado};
		this.http.post(this._url,datos).subscribe(data=>{ 
			if(data=="Sin resultados"){
				this.mensaje=data;
			}else{
				this.dataSource = data;
			}
		});
	}
	onFiltroTipo(event: any){
		this.tipoSeleccionado=event.target.value;
		this.consulta(); //refrescar solo la consulta
	}
	onFiltroIntervalo(event: any){
		this.intervaloSeleccionado=event.target.value;
		this.consulta(); //refrescar solo la consulta
	}
	onAlta(){
		const dialogRef = this.dialog.open(ModalaltaComponent, {
      		width: '500px',
			height: '650px',
    	});
		dialogRef.afterClosed().subscribe(() => { 
			//cuando se cierre la modal de alta tambien refrescamos
			this.obtenerTotal();
			this.consulta(); 
		} ); 
	}
	
	onBaja(event: any){
		var ID=event.target.children.id.innerHTML; //el boton eliminar en concreto que estamos haciendo click, contiene un elemento hidden donde tenemos almacenada la ID
		const dialogRef = this.dialog.open(ModalbajaComponent, { //abrimos la ventana de confirmacion
			data:{ //este data sera el JSON que contenga la ID
				ID:ID //le pasamos la id en el matdialogdata
			},
      		width: '800px',
			height: '200px',
    	});
		dialogRef.afterClosed().subscribe(resultado => { 
			if(resultado==1){ //si devuelve un 1 significa que ha aceptado la eliminacion, por lo que refrescamos
				this.obtenerTotal();
				this.consulta(); 
			}
		} ); 
	}
}
