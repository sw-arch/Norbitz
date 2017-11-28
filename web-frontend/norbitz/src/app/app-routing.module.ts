import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LodgingComponent } from './lodging/lodging.component';
import { HotelComponent } from './hotel/hotel.component';
import { CruisesComponent } from './cruises/cruises.component';
import {FunComponent} from "./fun/fun.component";
import { CarsComponent } from './cars/cars.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'book/lodging',  component: LodgingComponent },
  { path: 'book/cars',  component: CarsComponent },
  { path: 'book/hotel',  component: HotelComponent },
  { path: 'book/cruises', component: CruisesComponent },
  { path: 'book/fun', component: FunComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
