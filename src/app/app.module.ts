import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    ModalaltaComponent
  ],
  imports: [
    BrowserModule,
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
