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
  month!:any
  day!:number
  year!:number
  week!:string
  sunrise!:any
  sunset!:any

  

 
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
        // console.log(cityname)

        weatherService.getCoord(cityname) 
      }  
    }); 


 
  }

  ngOnInit(): void {

    this.weatherService.getCoord('thrissur')



    this.weatherService.WeatherData.subscribe(res =>{
      // console.log(res)
      this.weather=res

      this.currentData = new Date(res.current.dt * 1000);
// let dateString = this.currentData.getu;
//       console.log(dateString)

      let riseHour = new Date(res.current.sunrise).getUTCHours()
      let riseMinute =new Date(res.current.sunrise).getUTCMinutes()
      this.sunrise = `${riseHour}:${riseMinute}`
      // console.log(this.sunrise)

      let setHour = new Date(res.current.sunset).getUTCHours()
      let setMinute =new Date(res.current.sunset).getUTCMinutes()
      this.sunset = `${setHour}:${setMinute}`
      // console.log(this.sunrise)


      
      // let demodate = Math.round(new Date(new Date().setDate(new Date().getDate() - 1 )).getTime() / 1000)
      
      // this.currentData = new Date() 
      this.month = this.currentData.toLocaleString('default', { month: 'long' }); //months from 1-12
      this.day = this.currentData.getUTCDate();
      this.year = this.currentData.getUTCFullYear();
      this.week = this.currentData.toLocaleString('en-us', {  weekday: 'long' })
      // console.log(this.day,this.month,this.year,this.week)


    })
    this.weatherService.AqiData.subscribe(res=>{
      // console.log(res)
      this.aqi=res
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
