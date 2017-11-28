import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LodgingComponent } from './lodging/lodging.component';
import { ExtrasComponent } from './extras/extras.component';
import { HotelComponent } from './hotel/hotel.component';
import { CruisesComponent } from './cruises/cruises.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'book/lodging',  component: LodgingComponent },
  { path: 'book/extras',  component: ExtrasComponent },
  { path: 'book/hotel',  component: HotelComponent },
  { path: 'book/cruises', component: CruisesComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
