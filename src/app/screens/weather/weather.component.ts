import { Component, HostBinding, Injector, OnInit, Self } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { tuiPure, TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';

import { Chart, registerables, Tooltip } from 'chart.js';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  

 
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
        console.log(cityname)

        weatherService.getCoord(cityname) 
      }  
    }); 


 
  }

  ngOnInit(): void {

    this.weatherService.WeatherData.subscribe(res =>{
      console.log(res)
    })
    this.weatherService.AqiData.subscribe(res=>{
      console.log(res)
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
