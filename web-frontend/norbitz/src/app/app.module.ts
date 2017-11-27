import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiModule as NorbitzModule } from '../apis/norbitz';
import { ApiModule as AirdndModule } from '../apis/airdnd';
import { ApiModule as CarnivoreModule } from '../apis/carnivore-cruise-lines';
import { ApiModule as HurtsModule } from '../apis/hurts-car-rental';
import { ApiModule as ScandalsModule } from '../apis/scandals';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    NorbitzModule,
    AirdndModule,
    CarnivoreModule,
    HurtsModule,
    ScandalsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
