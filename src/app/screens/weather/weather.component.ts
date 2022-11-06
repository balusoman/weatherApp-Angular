import { Component, ElementRef, HostBinding, Injector, OnInit, Renderer2, Self, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { TuiDay, tuiPure, TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';


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

   
  calenderValue: TuiDay | null = null;

  cityData!:any 
  weatherData!:Weather  
  night:boolean=true

  time:any;
  month!:any
  day!:any
  year!:number
  week!:string
  sunrise!:any
  sunset!:any 
  moonRise!:any
  moonSet!:any
  currentDate:any 

   


darkMode = new FormControl(false); 
darkScreenMode!:boolean



citySearch = new FormControl(null, [
  Validators.required,
]); 
searchFocus:boolean=false

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


expanddiv:boolean=false;
 
@ViewChild('forecast') forecast:ElementRef|any;

  @HostBinding('style.--target-width') private targetWidth: string = '0%';
  @HostBinding('style.--target-rotate') private rotate: string = '0deg';

  constructor(private weatherService:WeatherService,private renderer: Renderer2 ) {

    this.citySearch.valueChanges.subscribe( cityname => { 
      if(cityname != null){  
        weatherService.searchedCity.next(cityname)
        // weatherService.getCoordinates(cityname)
        this.weatherService.getCoordinates(cityname).subscribe(res=>{
          this.cityData = res[0]  
          this.weatherService.getWeather(this.cityData?.lat,this.cityData?.lon).subscribe(res=>{ 
            this.weatherData= res  
          })
        })
      }  
    }); 

    this.darkMode.valueChanges.subscribe(res=>{ 
      if(this.darkMode.value == true){
         this.darkScreenMode = true 
      }
      else{
        this.darkScreenMode=false
      }
       
      
    })


 
  }

  ngOnInit(): void { 
    this.weatherService.searchedCity.subscribe(res=>{
      this.weatherService.getCoordinates(res).subscribe(res=>{
        this.cityData = res[0]
        // console.log(this.cityData)
        this.weatherService.getWeather(this.cityData?.lat,this.cityData?.lon).subscribe(res=>{ 
          this.weatherData= res 
          this.setDate()
          // console.log(this.weatherData)
        })
      })
    })

    
    

    // this.weatherService.WeatherData.subscribe(res =>{ 
    //   this.weather=res
    //   console.log(this.weather)
      
    //   this.setDate()
      
      


    // }) 
 
  }  


  expand(){ 
    this.expanddiv = !this.expanddiv
    if(this.expanddiv == false){
      var height = `50%`;
    }
    else{
      var height = `86%`;
    } 
  this.renderer.setStyle(this.forecast.nativeElement, "height", height);
  } 

  setDate(){  
    // set Current DATE
    this.currentDate = new Date(this.weatherData.current.dt * 1000);   
    // set Current TIME
    let Time = this.currentDate.toTimeString()
    let setTime =  Time.split(":",2) 
    this.time = `${setTime[0]}:${setTime[1]}`  
    // this.time = '06:15'

    // set moon
    let moonRiceString =  new Date(this.weatherData.daily[0].moonrise * 1000).toTimeString()
    let moonSunrise =  moonRiceString.split(":",2) 
    this.moonRise = `${moonSunrise[0]}:${moonSunrise[1]}` 
    

    let moonSetString =  new Date(this.weatherData.daily[0].moonset * 1000).toTimeString()
    let moonSet =  moonSetString.split(":",2) 
    this.moonSet = `${moonSet[0]}:${moonSet[1]}` 
    

    // set SUNRICE
    let sunRiceString =  new Date(this.weatherData.current.sunrise * 1000).toTimeString()
    let setSunrise =  sunRiceString.split(":",2) 
    this.sunrise = `${setSunrise[0]}:${setSunrise[1]}` 
    // set SUNSET
    let sunSetString =  new Date(this.weatherData.current.sunset * 1000).toTimeString()
    let setSunset:any =  sunSetString.split(":",2)  
    this.sunset = `${setSunset[0]}:${setSunset[1]}`  
    // set MONTH DATE WEEK YEAR
    this.month = this.currentDate.toLocaleString('default', { month: 'long' }); //months from 1-12
    this.day = this.currentDate.getUTCDate();
    this.year = this.currentDate.getUTCFullYear();
    this.week = this.currentDate.toLocaleString('en-us', {  weekday: 'long' })
    
    // console.log(this.time)
    // console.log(this.sunrise)
    // console.log(this.sunset) 
    console.log(this.time)
    console.log(this.sunrise,this.sunset)
    console.log(this.moonRise,this.moonSet)
    if(this.time < this.sunset){
      this.night =false
    }
    else{
      this.night=true
    }



   
   if(this.time == this.sunrise){
      this.targetWidth ='1%'
      this.rotate = '4deg'
    }

   else if(this.time > this.sunrise && this.time < this.sunset){ 
    // console.log("middele")
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
      // console.log("sunset is start")
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
 

    focus(){ 
      this.searchFocus=!this.searchFocus  
      if(this.search != ''){
        this.searchFocus = true
      }  
    }

  //   onDayClick(day: TuiDay): void {
  //     this.calenderValue = day;
  //     console.log(this.calenderValue.day)
  //     let newDate=new Date(this.calenderValue.year,this.calenderValue.month,this.calenderValue.day).getTime()/1000
  //     console.log(newDate)
  //     console.log(this.cityData.lat,this.cityData.lon)
  //     this.weatherService.getHistoricData(this.cityData.lat,this.cityData.lon,
  //       newDate ).subscribe(res=>{
  //         console.log(res)
  //       })
  // }
    

}
