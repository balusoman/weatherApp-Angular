import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaigaUiModule } from './../../shared/taiga-ui/taiga-ui.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '../../pipes/date.pipe'




import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { NumberPipe } from 'src/app/pipes/number.pipe';


@NgModule({
  declarations: [
    WeatherComponent,
    DatePipe,
    NumberPipe
     
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
