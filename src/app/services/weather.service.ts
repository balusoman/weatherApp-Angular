import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';
import { Aqi } from '../models/aqi';
import { Weather } from '../models/weather';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {  

  siteLoaded=new BehaviorSubject<boolean>(false);

  landscapeMode = new BehaviorSubject<boolean>(true);

  searchedCity= new BehaviorSubject<string>('thrissur') 
  darkMode = new BehaviorSubject<boolean>(false)

  
  API_key="8038a1909033301585eb00d07f25c65b";

  constructor(private http:HttpClient) { 
   }

  getCoordinates(city:string):Observable<any>{ 
      return this.http.get<any>(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.API_key}`)
 
  }

  getWeather(lat:any,lon:any):Observable<any>{
   return this.http.get<any>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${this.API_key}`)
  
  }
  getMyLocation(lat:any,lon:any):Observable<any>{
    return this.http.get<any>(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.API_key}`)
    // http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
   
   }

  getAirQualityData(lat:any,lon:any):Observable<any>{
return this.http.get<any>(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this.API_key}`)
  }

  // getHistoricData(lat:any,lon:any,date:any):Observable<any>{
 
    
  //   // let date = Math.round(new Date(new Date().setDate(new Date().getDate() - 1 )).getTime() / 1000)
     

  //   return this.http.get<any>(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&appid=${this.API_key}`)
  // }

 
}
