import { Component, OnInit } from '@angular/core';
import {NavegacionService} from '../navegacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operacionesfondos',
  templateUrl: './operacionesfondos.component.html',
  styleUrls: ['./operacionesfondos.component.css']
})
export class OperacionesfondosComponent implements OnInit {

  constructor(private router: Router,private nav: NavegacionService) { }

  ngOnInit(): void {
	if(this.nav.data==undefined){ //si no se ha logeado un usuario, se redirige al login
		this.router.navigate(['/login']);
	}
  }

}
