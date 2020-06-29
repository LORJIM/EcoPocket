import { Component, OnInit, ViewChildren } from '@angular/core';
import {NavegacionService} from '../navegacion.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operacionesfondos',
  templateUrl: './operacionesfondos.component.html',
  styleUrls: ['../cartera/cartera.component.css']
})
export class OperacionesfondosComponent implements OnInit {
  private _url:string=localStorage.getItem("host")+"ecopocket/fondos/seleccionar.php";
  mensaje:any;
  arrayProfit:any;
  dataSource:any;
  @ViewChildren('registros') listaregistros: any; //esto es un listener
  constructor(private router: Router,private http:HttpClient,private nav: NavegacionService) { }

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
          var element=$(".fechas, .empresa"); //el elemento del html
          for(var i=0;i<element.length;i++){
            if(element[i].innerHTML==""){
              element[i].className="oculto";
            }
          }
          var element=$(".profit, .porcdividendo"); //el elemento del html
          for(var i=0;i<element.length;i++){
            if(element[i].innerHTML==""){
              element[i].parentElement.className="oculto";
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

  onBaja(event: any){

  }

}
