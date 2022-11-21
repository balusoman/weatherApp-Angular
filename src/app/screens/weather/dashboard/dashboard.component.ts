import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fadeInDownOnEnterAnimation, fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation, slideInDownOnEnterAnimation, slideInUpOnEnterAnimation, zoomInOnEnterAnimation } from 'angular-animations';
import { Chart, registerables, Tooltip } from 'chart.js';
import { Observable, switchMap } from 'rxjs';
import { Aqi } from 'src/app/models/aqi';
import { Weather } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    slideInDownOnEnterAnimation({translate:'6px'}),
    fadeInDownOnEnterAnimation({delay:100,translate:'10px',duration:1000}),
    zoomInOnEnterAnimation(),
    slideInUpOnEnterAnimation({translate:'20px'})
    
  ]
})
export class DashboardComponent implements OnInit {

   
  cityData!:any
  weatherData!:any 
  aqiData!:any
 

  AQIValue!:number;
  AQIIndex!:number

  demoData!:any[]
  firstChartLoad:boolean=true
  chart:any=[]  

  image :HTMLImageElement = new Image() 

  barAvatar= {
    id:'barAvatar',
    beforeDraw: (chart:any, args:any, options:any) => { 
      const {ctx,
      chartArea: { top, right, bottom, left, width, height },
      scales:{x,y}
      } = chart;
      ctx.save();

      for(let i=0 ; i<=this.demoData.length - 1; i++){
        ctx.drawImage(this.image,x.getPixelForValue(i)-25, y.getPixelForValue(this.demoData[i])-60,50,50)
      } 
  },
  }
 

  constructor(private weatherService:WeatherService) { 

      

    weatherService.searchedCity.subscribe(res =>{
      this.weatherService.getCoordinates(res).subscribe(res=>{
        this.cityData = res[0] 
         this.weatherService.getWeather(this.cityData?.lat,this.cityData?.lon).subscribe(res=>{ 
          this.weatherData= res  
           this.demoData=[res.daily[0].temp.morn,res.daily[0].temp.day,res.daily[0].temp.eve,res.daily[0].temp.night,]
 
        if(this.firstChartLoad){
          this.InitialChartJs() 
          this.firstChartLoad=false 
        }
        else{
          this.updateChart()
        } 
         })
        this.weatherService.getAirQualityData(this.cityData?.lat,this.cityData?.lon).subscribe(res=>{ 
          this.aqiData= res.list[0]
           this.caclAqi(this.aqiData)
        })
      })
    })


    this.image.src= "../../../../assets/icons/sun-anim.png";
    
    Chart.register(...registerables) 
 
     
   }

  ngOnInit(): void {
 
  }

  InitialChartJs(){ 
    this.chart = new Chart('canvas',{ 
      plugins:[this.barAvatar],
    
      options: { 
        layout:{
          padding:{
            right:30,
            left:30,
            top:60
          }
        } ,
        
        responsive:true,
        
        maintainAspectRatio:false,
        elements:{
          point:{
            radius:3,
            hitRadius:10,
            hoverRadius:6, 
            // hoverBackgroundColor:'#000',
             
          }
        },
        plugins: 
        {
          
          tooltip:{
            enabled:false,
          },
          legend:{
            display:false,
          }  
          
        },

        // hover:{
        //   mode:'y',
        // },
         
        scales: {
          
           x:{
            display:false
            
            
           }, 
           y:{
            display:false,
            // suggestedMin:270, 
            // suggestedMax: 320  ,
            
            
            
            
           }
        },
        
      },
      type:'line',
      
    
      data:{
        
        
        labels:['mon','noon','eve','night'],
        datasets: [{
          label:'temperature',
          data: this.demoData,
          borderWidth:2,
          borderColor: 'rgb(251 146 60)',
          // fill:false, 
          pointBackgroundColor:"rgb(255, 168, 98)",
          tension:0.4,
          // borderCapStyle: 'butt',
          // borderDash: [10, 5],  
          
          
      }]

      }
    }) 
  }

  
 

  updateChart(){
      this.chart.data = {
      labels:['mon','noon','eve','night'],
      datasets: [{
        // label:'temperature',
        data: this.demoData,
        borderWidth:2,
        borderColor: 'rgb(251 146 60)',
        // fill:true, 
        pointBackgroundColor:"rgb(255, 168, 98)",
        tension:0.4,
        // borderCapStyle: 'butt',
        // borderDash: [10, 5], 
      }]
    }
    this.chart.update();
  }

  caclAqi(data:Aqi){
    if(data.components.pm2_5 <= 12.0){
      var l_low = 0;
      var l_high = 50;
      var c_low = 0;
      var c_high = 12;
      var c = data.components.pm2_5; 
      this.AQIValue = (l_high - l_low)/(c_high - c_low)*(c - c_low)+l_low;
      this.AQIIndex = 1
    }
    else if(data.components.pm2_5 > 12.0 && data.components.pm2_5<=35.4){
      var l_low = 51;
      var l_high = 100;
      var c_low = 12.1;
      var c_high = 35.4;
      var c = data.components.pm2_5; 
      this.AQIValue = (l_high - l_low)/(c_high - c_low)*(c - c_low)+l_low;
      this.AQIIndex = 2
    }
    else if(data.components.pm2_5 > 35.4 && data.components.pm2_5 <= 55.4){
      var l_low = 101;
      var l_high = 150;
      var c_low = 35.5;
      var c_high = 55.4;
      var c = data.components.pm2_5; 
      this.AQIValue = (l_high - l_low)/(c_high - c_low)*(c - c_low)+l_low;
      this.AQIIndex = 3
    }
    else if(data.components.pm2_5 > 55.4 && data.components.pm2_5 <= 150.4){
      var l_low = 151;
      var l_high = 200;
      var c_low = 55.5;
      var c_high = 150.4;
      var c = data.components.pm2_5;
      
      this.AQIValue = (l_high - l_low)/(c_high - c_low)*(c - c_low)+l_low;
      this.AQIIndex = 4
    }
    else if(data.components.pm2_5 > 150.4 && data.components.pm2_5 <= 250.4){
      var l_low = 201;
      var l_high = 300;
      var c_low = 150.5;
      var c_high = 250.4;
      var c = data.components.pm2_5;
      
      this.AQIValue = (l_high - l_low)/(c_high - c_low)*(c - c_low)+l_low;
      this.AQIIndex = 5
    }
    else if(data.components.pm2_5 > 250.4 && data.components.pm2_5 <= 350.4){
      var l_low = 301;
      var l_high = 400;
      var c_low = 250.5;
      var c_high = 350.4;
      var c = data.components.pm2_5;
      
      this.AQIValue = (l_high - l_low)/(c_high - c_low)*(c - c_low)+l_low;
      this.AQIIndex = 6
    }
    else if(data.components.pm2_5 >350.4 && data.components.pm2_5 <= 500.4){
      var l_low = 401;
      var l_high = 500;
      var c_low = 350.5;
      var c_high = 500.4;
      var c = data.components.pm2_5;
      
      this.AQIValue = (l_high - l_low)/(c_high - c_low)*(c - c_low)+l_low;
      this.AQIIndex = 7
     
    }
  }
 

  
  


   

}
