import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaigaUiModule } from './../../shared/taiga-ui/taiga-ui.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';


@NgModule({
  declarations: [
    WeatherComponent,
     
  ],
  imports: [
    CommonModule, 
    WeatherRoutingModule,
    TaigaUiModule, 
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class WeatherModule { }
