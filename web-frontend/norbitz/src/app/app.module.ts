import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatCardModule,
  MatTableModule,
  MatStepperModule,
  MatIconModule,
  MatCheckboxModule,
} from '@angular/material';

import { ApiModule as NorbitzModule } from '../apis/norbitz';
import { ApiModule as AirdndModule, BASE_PATH as AirdndBasePath } from '../apis/airdnd';
import { ApiModule as CarnivoreModule, BASE_PATH as CarnivoreBasePath } from '../apis/carnivore-cruise-lines';
import { ApiModule as DelterModule, BASE_PATH as DelterBasePath } from '../apis/delter-airlines';
import { ApiModule as HilbunModule, BASE_PATH as HilbunBasePath } from '../apis/hilbun-hotels';
import { ApiModule as HurtsModule, BASE_PATH as HurtsBasePath } from '../apis/hurts-car-rental';
import { ApiModule as ScandalsModule, BASE_PATH as ScandalsBasePath } from '../apis/scandals';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user/user.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LodgingComponent } from './lodging/lodging.component';
import { ExtrasComponent } from './extras/extras.component';
import { HotelComponent } from './hotel/hotel.component';
import { CruisesComponent } from './cruises/cruises.component';
import { FunComponent } from './fun/fun.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    LodgingComponent,
    ExtrasComponent,
    HotelComponent,
    CruisesComponent,
    FunComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    NorbitzModule,
    AirdndModule,
    CarnivoreModule,
    DelterModule,
    HilbunModule,
    HurtsModule,
    ScandalsModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [
    UserService,
    { provide: AirdndBasePath, useValue: "http://35.193.67.106/AirDND/AirDND/1.0.1"},
    { provide: CarnivoreBasePath, useValue: "http://35.196.221.242"},
    { provide: DelterBasePath, useValue: "http://35.188.55.177/api/v1.0"},
    { provide: HilbunBasePath, useValue: "http://35.196.7.68:3000"},
    { provide: HurtsBasePath, useValue: "http://softwarebois.com"},
    { provide: ScandalsBasePath, useValue: "http://35.196.71.129"},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
