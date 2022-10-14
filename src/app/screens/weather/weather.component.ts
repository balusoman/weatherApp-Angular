import { Component, HostBinding, Injector, OnInit, Self } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { tuiPure, TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';

import { Chart, registerables, Tooltip } from 'chart.js';
import { WeatherService } from 'src/app/services/weather.service';
import { Aqi } from 'src/app/models/aqi';
import { Weather } from 'src/app/models/weather';
import { Data } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather!:Weather
  aqi!:Aqi

  currentData!:Date
  time:any;
  month!:any
  day!:number
  year!:number
  week!:string
  sunrise!:any
  sunset!:any

  currentDate:any

  

 
  testForm = new FormGroup({
    darkMode : new FormControl(false)
}); 

citySearch = new FormControl(null, [
  Validators.required,
]); 

search:any="";
cities: readonly any[] = [
  'London',
  'India',
  'Paris',
  'usa',
  'Ireland',
  'delhi'
];
   

  @HostBinding('style.--target-width') private targetWidth: string = '50%';
  @HostBinding('style.--target-rotate') private rotate: string = '90deg';

  constructor(private weatherService:WeatherService) {

    this.citySearch.valueChanges.subscribe( cityname => { 
      if(cityname != null){  
        weatherService.getCoord(cityname) 
      }  
    }); 


 
  }

  ngOnInit(): void {

    this.weatherService.getCoord('thrissur') 

    this.weatherService.WeatherData.subscribe(res =>{ 
      this.weather=res
      console.log(this.weather)
      // set Current DATE
      this.currentDate = new Date(res.current.dt * 1000);   
      // set Current TIME
      let Time = this.currentDate.toLocaleTimeString()
      let setTime =  Time.split(":",2) 
      this.time = `${setTime[0]}:${setTime[1]}` 
      // set SUNRICE
      let sunRiceString =  new Date(res.current.sunrise * 1000).toTimeString()
      let setSunrise =  sunRiceString.split(":",2) 
      this.sunrise = `${setSunrise[0]}:${setSunrise[1]}`
      // set SUNSET
      let sunSetString =  new Date(res.current.sunset * 1000).toLocaleTimeString()
      let setSunset:any =  sunSetString.split(":",2)  
      this.sunset = `${setSunset[0]}:${setSunset[1]}` 
      // set MONTH DATE WEEK YEAR
      this.month = this.currentDate.toLocaleString('default', { month: 'long' }); //months from 1-12
      this.day = this.currentDate.getUTCDate();
      this.year = this.currentDate.getUTCFullYear();
      this.week = this.currentDate.toLocaleString('en-us', {  weekday: 'long' })
    
    }) 
 
  } 

  @tuiPure
    filter(search: string | null): readonly string[] {
      if(search && search!.length>=2){
        return this.cities.filter(city => TUI_DEFAULT_MATCHER(city, search || ''));
      }
      return [];
      
    }  

}
