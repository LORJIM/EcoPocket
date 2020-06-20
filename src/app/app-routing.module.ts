import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MicuentaComponent } from './micuenta/micuenta.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroComponent } from './registro/registro.component';
import { CarteraComponent } from './cartera/cartera.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	/*los paths de categorias son necesarios para que se refresque el componente home y muestre las funcionalidades*/ 
	{ path: 'fondos', component: HomeComponent },
	{ path: 'forex', component: HomeComponent },
	{ path: 'cripto', component: HomeComponent },
	{ path: 'apuestas', component: HomeComponent },
	{ path: 'hogar', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'mi-cuenta', component: MicuentaComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'mi-cartera', component: CarteraComponent },

    // cualquier otra ruta redirige a la pagina principal
    { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
