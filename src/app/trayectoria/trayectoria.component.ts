import { Component, OnInit } from '@angular/core';
import {NavegacionService} from '../navegacion.service';
import {HttpClient} from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
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
	arrayIntervalo:any;
	arrayMeses:any;
	arrayDias:any;
	categoria:any;
	intervaloSeleccionado:any='1 semana'; //valor por defecto
	
	
lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Profit' }, //es necesario poner unos valores por defecto para que no pete en la compilacion
  ];

  lineChartLabels: Label[];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(77,254,209,0.80)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  constructor(private nav: NavegacionService,private http:HttpClient, private router: Router) {
		if(this.router.getCurrentNavigation().extras.state){ //si refrescamos con f5 no hay navegacion y no encontrara el valor state
			this.categoria=this.router.getCurrentNavigation().extras.state.categoria; //obtenemos la categoria en la que nos encontramos
		}
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
				if(this.intervaloSeleccionado=='1 semana'){
					this.arrayIntervalo=new Array(); //necesario para calcular los dias
					this.ultimosDias(); //cargar filtro de 1 semana
					
					var j;
					var i;
					var profit=0;
					var arrayProfit=new Array();
					for(i=0;i<this.dataSource.length;i++){ //en este primer for recorremos los dias y comprobamos los que tienen profit de esta semana
						for(j=0;j<this.arrayDias.length;j++){
							if(this.dataSource[i].Fecha==this.arrayDias[j].dia){
								this.arrayDias[j].existe=true; //si existe, quiere decir que tiene profit
								break;
							}
						}	
					}
					for(j=0;j<this.arrayDias.length;j++){ //en este segundo for, recorremos los dias de la semana y sumamos los profits en orden
						profit=0; //reinicia profit antes de meterlo en cada dia
						if(this.arrayDias[j].existe){ // si el dia existe
							for(i=0;i<this.dataSource.length;i++){ //recorremos el array de respuesta php para encontrarlo
								if(this.dataSource[i].Fecha==this.arrayDias[j].dia){ //cuando coincida, significa que es el indicado y metemos su profit
									profit=parseFloat(this.dataSource[i].Profit);
								}
							}
							arrayProfit.push(profit);
						}else{ //si el dia no existe, metemos profit 0
							arrayProfit.push(profit);
						}
					}
				}else{ //filtro de Todo
					var j;
					var i;
					var profit=0;
					var arrayProfit=new Array();
					for(i=0;i<this.dataSource.length;i++){ //en este primer for recorremos todas las fechas
						for(j=0;j<this.arrayMeses.length;j++){ //y aqui recorremos los 7 ultimos meses
							if(this.dataSource[i].Fecha.substring(0,7)==this.arrayMeses[j].mes){ //si la substring de la fecha coincide con alguno de los 7 meses, significa que este mes tiene profit
								this.arrayMeses[j].existe=true; //si tiene profit, existe
								break;
							}
						}	
					}
					for(j=0;j<this.arrayMeses.length;j++){ //en este segundo for, recorremos los ultimos 7 meses
						profit=0;
						if(this.arrayMeses[j].existe){ //si el mes existe
							for(i=0;i<this.dataSource.length;i++){ //recorremos las fechas
								if(this.dataSource[i].Fecha.substring(0,7)==this.arrayMeses[j].mes){ //por cada fecha cuya substring coincida con el mes en cuestion
									profit+=parseFloat(this.dataSource[i].Profit); //sumamos el profit de dicha fecha
								}
							}
							arrayProfit.push(profit); //despues de haber recorrido todas las fechas y sumar los profits de las de dicho mes, lo metemos en el array
						}else{ //si el mes no existe, metemos profit 0
							arrayProfit.push(profit);
						}
					}
				}
				this.lineChartData=[{ data: arrayProfit, label: 'Profit' }] //cargamos el array de profits en la grafica
			}
		});
	}
	onFiltroIntervalo(event: any){
		this.intervaloSeleccionado=event.target.value;
		this.arrayIntervalo=new Array();
		if(this.intervaloSeleccionado=='1 semana'){
			this.ultimosDias(); //averiguar los ultimos 7 dias
		}else{ //todo
			var i;
			var date = new Date();
			var year=date.getFullYear();
			var mesActual=date.getMonth();
			this.arrayMeses=new Array();
			for(i=6; i>=0; i--){ //metemos en un array los ultimos 7 meses
				if(mesActual - i<0){ //si nuestra fecha actual menos 7 meses es un numero negativo, significa que es del anyo pasado
					date.setMonth(12-(mesActual - i));
				    year--;
				} else { //si no es un numero negativo, es de este anyo y asi lo seran las siguientes
					date.setMonth(mesActual - i);
				}
				var mes = date.toLocaleString('default', { month: 'long' });
				if(date.getMonth()<9){ //este mes para calcular sera necesario para asociar los meses con los profits que obtenemos de consulta
					var mesparaCalcular=year+"-0"+(date.getMonth()+1).toString();
				}else{
					var mesparaCalcular=year+(date.getMonth()+1).toString();
				}
				
				mes=mes+" "+year;
				this.arrayIntervalo.push(mes);
				this.arrayMeses.push({mes:mesparaCalcular}); //este array sera necesario para asociar los 7 ultimos meses con los profits que obtenemos de consulta
				
				if(mesActual - i<0){ //si este mes era del anyo pasado, antes de repetir la operacion, volvemos a poner el anyo actual
				    year++;
				}
			}
			this.lineChartLabels=this.arrayIntervalo; //cargamos en la grafica la escala por meses
		}
		this.consulta(); //refrescar solo la consulta
	}
	
	ultimosDias(){ //necesario ponerlo aqui para realizarlo al cargar la pagina y al cambiar filtro
		var i;
		this.arrayDias=new Array();
		for(i=6; i>=0; i--){ //metemos en un array los ultimos 7 dias, calculandolos por resta de milisegundos
			var date = new Date();
			var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
			var day =last.getDate();
			var month=last.getMonth()+1;
			var year=last.getFullYear();
			var fecha=day+"/"+month+"/"+year;
			if(month<10){ //estos ifs es para adecuar los campos, formatear la fecha para calcular
				var mesparacalcular="0"+month.toString();
			}else{
				var mesparacalcular=month.toString();
			}
			if(day<10){
				var diaparacalcular="0"+day.toString();
			}else{
				var diaparacalcular=day.toString();
			}
			var fechaparaCalcular=year+"-"+mesparacalcular+"-"+diaparacalcular;
			this.arrayIntervalo.push(fecha);
			this.arrayDias.push({dia:fechaparaCalcular}); //este array contiene los 7 ultimos dias, pero en un formato que podamos compararlos con las fechas que vienen de la respuesta php
		}
		this.lineChartLabels=this.arrayIntervalo; //cargamos en la grafica la escala por dias
	}
}
