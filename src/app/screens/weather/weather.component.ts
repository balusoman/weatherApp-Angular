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
  'delhi',
  'thrissur'
];
   

  @HostBinding('style.--target-width') private targetWidth: string = '0%';
  @HostBinding('style.--target-rotate') private rotate: string = '0deg';

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
      
      this.setDate()
      


    }) 
 
  } 

  setDate(){
    // set Current DATE
    this.currentDate = new Date(this.weather.current.dt * 1000);   
    // set Current TIME
    let Time = this.currentDate.toTimeString()
    let setTime =  Time.split(":",2) 
    this.time = `${setTime[0]}:${setTime[1]}`  
    // this.time = '06:15'

    // set SUNRICE
    let sunRiceString =  new Date(this.weather.current.sunrise * 1000).toTimeString()
    let setSunrise =  sunRiceString.split(":",2) 
    this.sunrise = `${setSunrise[0]}:${setSunrise[1]}` 
    // set SUNSET
    let sunSetString =  new Date(this.weather.current.sunset * 1000).toTimeString()
    let setSunset:any =  sunSetString.split(":",2)  
    this.sunset = `${setSunset[0]}:${setSunset[1]}`  
    // set MONTH DATE WEEK YEAR
    this.month = this.currentDate.toLocaleString('default', { month: 'long' }); //months from 1-12
    this.day = this.currentDate.getUTCDate();
    this.year = this.currentDate.getUTCFullYear();
    this.week = this.currentDate.toLocaleString('en-us', {  weekday: 'long' })
    
    console.log(this.time)
    console.log(this.sunrise)
    console.log(this.sunset) 

   
   if(this.time == this.sunrise){
      this.targetWidth ='1%'
      this.rotate = '4deg'
    }

   else if(this.time > this.sunrise && this.time < this.sunset){ 
    console.log("middele")
      if(this.time <= '07:00' ){
        this.targetWidth= '8.33%'

        this.rotate = '38deg'
      }
      else if(this.time <= '08:00' ){
        this.targetWidth= '16.66%'

        this.rotate = '52deg'
      }
      else if(this.time <= '09:00' ){
        this.targetWidth= '24.99%'

        this.rotate = '62deg'
      }
      else if(this.time <= '10:00' ){
        this.targetWidth= '33.32%'

        this.rotate = '70deg'
      }
      else if(this.time <= '11:00' ){
        this.targetWidth= '41.65%'

        this.rotate = '80deg'
      }
      else if(this.time <= '12:00' ){
        this.targetWidth= '49.98%'

        this.rotate = '88deg'
      }
      else if(this.time <= '13:00' ){
        this.targetWidth = '58.31%'
        this.rotate = '96deg'
        
      }
      else if(this.time <= '14:00' ){
        this.targetWidth = '66.64%'
        this.rotate = '106deg'
        
      }
      else if(this.time <= '15:00' ){
        this.targetWidth = '74.97%'
        this.rotate = '114deg'
        
      }
      else if(this.time <= '16:00' ){
        this.targetWidth = '83.3%'

        this.rotate = '126deg'
      }
      else if(this.time <= '17:00' ){
        this.targetWidth = '91.63%'
        this.rotate = '138deg'
        
      }
      else if(this.time < this.sunset ){
        this.targetWidth = '98.00%'
        this.rotate = '150deg'
        
      }


    }

   else if(this.time >= this.sunset){
      this.targetWidth ='100%'
      this.rotate = '175deg'
      console.log("sunset is start")
    } 
    else{
      console.log("test")
    }
  }

  @tuiPure
    filter(search: string | null): readonly string[] {
      if(search && search!.length>=2){
        return this.cities.filter(city => TUI_DEFAULT_MATCHER(city, search || ''));
      }
      return [];
      
    }  

}
