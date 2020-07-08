import { Component, OnInit, ViewChildren  } from '@angular/core';
import {NavegacionService} from '../navegacion.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalaltahogarComponent } from '../modalaltahogar/modalaltahogar.component';
import {MatDialog} from '@angular/material/dialog';
import { ModalbajaComponent } from '../modalbaja/modalbaja.component';

@Component({
  selector: 'app-operacioneshogar',
  templateUrl: './operacioneshogar.component.html',
  styleUrls: ['../cartera/cartera.component.css']
})
export class OperacioneshogarComponent implements OnInit {
  private _url:string=localStorage.getItem("host")+"ecopocket/hogar/seleccionar.php";
  mensaje:any;
  arrayProfit:any;
  dataSource:any;  
  @ViewChildren('registros') listaregistros: any; //esto es un listener

  constructor(private router: Router,public dialog: MatDialog,private http:HttpClient,private nav: NavegacionService) { }

  ngOnInit(): void {
	if(this.nav.data==undefined){ //si no se ha logeado un usuario, se redirige al login
		this.router.navigate(['/login']);
	}else{
      this.consulta(); //consulta previa o refresco de datos
    }
  }

	ngAfterViewInit(){
    this.listaregistros.changes.subscribe(t => { //cuando el listener detecta un cambio en la lista
      this.ngForTerminado(); //significa que se ha mapeado el dataSource en el ngFor
    })
  }

	ngForTerminado(){ //ya mapeado el dataSource
	    //Y AQUI APLICAMOS LOS ESTILOS PARA MOSTRAR FECHAS Y PROFITS EN LOS QUE CORRESPONDA:
	          var element=$(".fechas"); //el elemento del html
	          for(var i=0;i<element.length;i++){
	            if(element[i].innerHTML==""){
	              element[i].className="oculto";
	            }
	          }
	          var element=$(".profit, .detalles"); //el elemento del html
	          for(var i=0;i<element.length;i++){
	            if(element[i].innerHTML==""){
	              element[i].parentElement.className="oculto"; //utilizamos el parentElement para ocultar tambien sus cabeceras o literales
	            }
	          }
	  }

	consulta(){
	    //reiniciamos los datos de salida
			this.dataSource = null;
			this.mensaje='';
			//mandamos los datos para consultar automaticamente
			var datos={usuario: localStorage.getItem("usuario"), tipo:'O'}; //la O es consulta de operaciones
			this.http.post(this._url,datos).subscribe(data=>{ 
				if(data=="Sin resultados"){
					this.mensaje=data;
				}else{
	        var arrayOperaciones = data; //guardamos las operaciones en un array
	        var longitud=Object.keys(data).length; //guardamos su longitud para luego recorrerlo
	        datos={usuario: localStorage.getItem("usuario"), tipo:'P'}; //la P es consulta de profit
			    this.http.post(this._url,datos).subscribe(data=>{
	          this.arrayProfit=data; //guardamos los profits de cada dia en un array
	          var fecha=''; //inicializamos la variable fecha, que sera un comparador para separar los dias
	          var index=''; //servira para localizar el profit de cada dia
	          for(var i=0; i<longitud; i++){
	            if(arrayOperaciones[i].Fecha!=fecha){ //si la fecha es distinta, es un nuevo dia
	                index=this.arrayProfit.findIndex(item => item.Fecha === arrayOperaciones[i].Fecha); //buscamos el profit de dicho dia
	                arrayOperaciones[i].profit=this.arrayProfit[index].Profit; //metemos el profit en el registro
	                fecha=arrayOperaciones[i].Fecha; //actualizamos la fecha del if con la del nuevo dia
	            }else{ //si es la misma que el anterior registro, la borramos para que no salga cuando hagamos el mapeo por html
	              arrayOperaciones[i].Fecha='';
	            }
	          }
	          this.dataSource=arrayOperaciones; //asignamos el array resultante al dataSource que se mapeara en html
	          
	          
	        });
				}
			});
	  }

	onAlta(){
	    const dialogRef = this.dialog.open(ModalaltahogarComponent, {
	      		width: '1000px',
				height: '400px',
	    	});
			dialogRef.afterClosed().subscribe(() => { 
				//cuando se cierre la modal de alta tambien refrescamos
				this.consulta(); 
			} ); 
	  }
	
	onBaja(event: any){
	    var ID=event.target.children.id.innerHTML; //el boton en concreto que estamos haciendo click, contiene un elemento hidden donde tenemos almacenada la ID
	    const dialogRef = this.dialog.open(ModalbajaComponent, { //abrimos la ventana de confirmacion
				data:{ //este data sera el JSON que contenga la ID
	        ID:ID, //le pasamos la id en el matdialogdata
	        tipo:'H' //indicador de que venimos de Fondos de Inversion
				},
	      		width: '800px',
				height: '200px',
	    	});
			dialogRef.afterClosed().subscribe(resultado => { 
				if(resultado==1){ //si devuelve un 1 significa que ha aceptado la eliminacion, por lo que refrescamos
					this.consulta(); 
				}
			} ); 
	  }
}
