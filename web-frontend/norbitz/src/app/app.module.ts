import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { ApiModule as NorbitzModule } from '../apis/norbitz';
import { ApiModule as AirdndModule, BASE_PATH as AirdndBasePath } from '../apis/airdnd';
import { ApiModule as CarnivoreModule, BASE_PATH as CarnivoreBasePath } from '../apis/carnivore-cruise-lines';
import { ApiModule as HurtsModule, BASE_PATH as HurtsBasePath } from '../apis/hurts-car-rental';
import { ApiModule as ScandalsModule, BASE_PATH as ScandalsBasePath } from '../apis/scandals';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user/user.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LodgingComponent } from './lodging/lodging.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    LodgingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    NorbitzModule,
    AirdndModule,
    CarnivoreModule,
    HurtsModule,
    ScandalsModule,
    MatCardModule,
    MatSelectModule,
  ],
  providers: [
    UserService, 
    { provide: AirdndBasePath, useValue: "http://35.193.67.106/AirDND/AirDND/1.0.1"},
    { provide: CarnivoreBasePath, useValue: ""},
    { provide: HurtsBasePath, useValue: "http://softwarebois.com"},
    { provide: ScandalsBasePath, useValue: ""},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
