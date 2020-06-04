import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

	fecha:string;
	valorBusqueda:string;
  constructor() { }

  ngOnInit(): void {
	var d = new Date();
	var anio=d.getFullYear();
	const mes = d.toLocaleString('default', { month: 'short' });
	var dia=d.getDate();
	this.fecha=dia+" "+mes+" "+anio;
  }

}
