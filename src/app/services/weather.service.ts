import { Injectable } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { Aqi } from '../models/aqi';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService { 

  latitude!:number
  longitude!:number 

  WeatherData=new Subject<Weather>();
  AqiData=new Subject<Aqi>();  

  API_key="8038a1909033301585eb00d07f25c65b";

  constructor() { }

  getCoord(cityname:string) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${this.API_key}`)
    .then(res => res.json()).then(data =>{  
      this.latitude = data[0].lat
      this.longitude = data[0].lon 
      // console.log(this.latitude,this.longitude,data) 
    }).then(() =>{
      this.getWeatherData()
      this.getAirQualityData()
    })
  }

  getWeatherData(){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.latitude}&lon=${this.longitude}&exclude=minutely&appid=${this.API_key}`)
    .then(res => res.json() ).then(data =>{ 
      this.WeatherData.next(data)
    })
  }

  getAirQualityData(){
    fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${this.latitude}&lon=${this.longitude}&appid=${this.API_key}`)
    .then(res => res.json() ).then(data =>{ 
      // console.log(JSON.stringify(data.list[0]))
      this.AqiData.next(data.list[0]) 
      
    })
  }

  // getForcastData(){
  //   let date = Math.round(new Date(new Date().setDate(new Date().getDate() - 1 )).getTime() / 1000)
  //   fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${this.latitude}&lon=${this.longitude}&dt=${date}&appid=${this.API_key}`)
  // }
}
