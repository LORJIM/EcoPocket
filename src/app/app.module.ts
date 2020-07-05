import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {NavegacionService} from './navegacion.service';
import {RegistroService} from './registro.service';
import {LoginService} from './login.service';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import * as $ from 'jquery';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { MicuentaComponent } from './micuenta/micuenta.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CarteraComponent } from './cartera/cartera.component';
import { ModalaltaComponent } from './modalalta/modalalta.component';
import { ModalbajaComponent } from './modalbaja/modalbaja.component';
import { OperacionesfondosComponent } from './operacionesfondos/operacionesfondos.component';
import { OperacionesforexComponent } from './operacionesforex/operacionesforex.component';
import { OperacioneshogarComponent } from './operacioneshogar/operacioneshogar.component';
import { OperacionescriptoComponent } from './operacionescripto/operacionescripto.component';
import { OperacionesapuestasComponent } from './operacionesapuestas/operacionesapuestas.component';
import { ModalaltaforexComponent } from './modalaltaforex/modalaltaforex.component';
import { ModalaltafondosComponent } from './modalaltafondos/modalaltafondos.component';
import { ModalaltacriptoComponent } from './modalaltacripto/modalaltacripto.component';
import { ModalaltahogarComponent } from './modalaltahogar/modalaltahogar.component';
import { ModalaltaapuestasComponent } from './modalaltaapuestas/modalaltaapuestas.component';
import { ModalresolverforexComponent } from './modalresolverforex/modalresolverforex.component';
import { ModalresolvercriptoComponent } from './modalresolvercripto/modalresolvercripto.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    NavegacionComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    MicuentaComponent,
    ContactoComponent,
    CarteraComponent,
    ModalaltaComponent,
    ModalbajaComponent,
    OperacionesfondosComponent,
    OperacionesforexComponent,
    OperacioneshogarComponent,
    OperacionescriptoComponent,
    OperacionesapuestasComponent,
    ModalaltaforexComponent,
    ModalaltafondosComponent,
    ModalaltacriptoComponent,
    ModalaltahogarComponent,
    ModalaltaapuestasComponent,
    ModalresolverforexComponent,
    ModalresolvercriptoComponent
  ],
  imports: [
    BrowserModule,
	ReactiveFormsModule,
    FormsModule,
	MatDialogModule,
	MatSnackBarModule,
    AppRoutingModule,
    FontAwesomeModule,
	HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [RegistroService,LoginService,NavegacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
