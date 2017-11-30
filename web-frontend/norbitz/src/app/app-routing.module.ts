import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { HomestaysComponent } from './homestays/homestays.component';
import { HotelComponent } from './hotel/hotel.component';
import { CruisesComponent } from './cruises/cruises.component';
import { CarsComponent } from './cars/cars.component';
import { FunComponent } from './fun/fun.component';
import { FlightsComponent } from './flights/flights.component';
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'orders',  component: OrderhistoryComponent },
  { path: 'book/homestays',  component: HomestaysComponent },
  { path: 'book/cars',  component: CarsComponent },
  { path: 'book/hotel',  component: HotelComponent },
  { path: 'book/cruises', component: CruisesComponent },
  { path: 'book/fun', component: FunComponent },
  { path: 'book/flights', component: FlightsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
