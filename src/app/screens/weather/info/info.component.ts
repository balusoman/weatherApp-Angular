import { Component, HostBinding, OnDestroy, OnInit ,ViewEncapsulation} from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Chart, registerables, Tooltip } from 'chart.js';
import { Weather } from 'src/app/models/weather';
import { Clipboard } from '@angular/cdk/clipboard'; 
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoComponent implements OnInit {

 

 

  cityData!:any
  weatherData!:Weather 
  aqiData!:any
  historicData:any[]=[]
  dailyData!:any

  chart1:any=[] 
  firstChartLoad:boolean=true
  tempData!:any[]
  feelsLikeData!:any[]

  array:any[]=[]
  clickedDay!:any

  expand:boolean=false

  @HostBinding('style.--primaryColor') private primaryColor: string ='';


  constructor(private weatherService:WeatherService,private clipboard: Clipboard) {
    
    weatherService.darkMode.subscribe(res=>{
      if(res == true){
        this.primaryColor= 'purple'
      }
      else{
        this.primaryColor='orange'
      }
    })
    
    weatherService.searchedCity.subscribe(res =>{
      this.weatherService.getCoordinates(res).subscribe(res=>{
        this.cityData = res[0]
         this.weatherService.getWeather(this.cityData?.lat,this.cityData?.lon).subscribe(res=>{ 
          this.weatherData= res
          this.dailyData = res.daily[0] 
         
          this.tempData=[res.daily[0].temp.morn,res.daily[0].temp.day,res.daily[0].temp.eve,res.daily[0].temp.night,]
          this.feelsLikeData=[res.daily[0].feels_like.morn,res.daily[0].feels_like.day,res.daily[0].feels_like.eve,res.daily[0].feels_like.night,]
          if(this.firstChartLoad){
            this.InitialChartJs() 
            this.firstChartLoad=false 
            this.clickedDay = res.daily[0]
          }
          else{
            this.updateChart()
          } 
        }) 
        this.weatherService.getAirQualityData(this.cityData?.lat,this.cityData?.lon).subscribe(res=>{ 
          this.aqiData= res.list[0]
         })  

        
      })
    })
 

   
    
    Chart.register(...registerables) 

    
  }

  ngOnInit(): void {  
    
    
    
  }

  InitialChartJs(){ 
    this.chart1 = new Chart('canvas1',{ 
      // plugins:[this.barAvatar],
    
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
            enabled:true,
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
            display:false ,
            grid:{
              display:false
            }
            
            
            
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
        
        
        labels:['Morning','Noon','Evening','Night'],
        datasets: [{
          label:'temperature',
          data: this.tempData,
          borderWidth:2,
          borderColor: 'rgb(251 146 60)',
          fill:false, 
          pointBackgroundColor:"rgb(255, 168, 98)",
          tension:0.4,
          // borderCapStyle: 'butt',
          // borderDash: [10, 5],  
        //   backgroundColor: [
        //    "rgb(205, 108, 98)" ,
             
        // ],   
      },
      {
        label:'feels_like',
        data: this.feelsLikeData,
        borderWidth:2,
        borderColor: 'rgb(100 146 60)',
        fill:false, 
        pointBackgroundColor:"rgb(100, 168, 98)",
        tension:0.4, 
    },
  //   {
  //     label:'pressure',
  //     data: [20,10,50,40],
  //     borderWidth:2,
  //     borderColor: 'rgb(50 70 60)',
  //     fill:false, 
  //     pointBackgroundColor:"rgb(50, 168, 98)",
  //     tension:0.4, 
      
  // }
    ]

      }
    }) 
  }

  
 

  updateChart(){
      this.chart1.data = {
      labels:['Morning','Noon','Evening','Night'],
      datasets: [{
        label:'temperature',
        data: this.tempData,
        borderWidth:2,
        borderColor: 'rgb(251 146 60)',
        // fill:true, 
        pointBackgroundColor:"rgb(255, 168, 98)",
        tension:0.4,
        // borderCapStyle: 'butt',
        // borderDash: [10, 5],
      },
      {
        label:'feels_like',
        data: this.feelsLikeData,
        borderWidth:2,
        borderColor: 'rgb(100 146 60)',
        fill:false, 
        pointBackgroundColor:"rgb(100, 168, 98)",
        tension:0.4, 
    },
    ]
    }
    this.chart1.update();
  }


  show(data:any){ 
       this.dailyData = data
let temp=[data.temp.morn,data.temp.day,data.temp.eve,data.temp.night,]
let feels_like =[data.feels_like.morn,data.feels_like.day,data.feels_like.eve,data.feels_like.night,]
    if(this.clickedDay != data){ 
      this.restartChart(temp,feels_like)
    } 
    this.clickedDay = data
  }

  restartChart(temp:any,feels_like:any){
    this.chart1.data = {
      labels:['Morning','Noon','Evening','Night'],
      datasets: [{
        label:'temperature',
        data: temp,
        borderWidth:2,
        borderColor: 'rgb(251 146 60)',
        // fill:true, 
        pointBackgroundColor:"rgb(255, 168, 98)",
        tension:0.4,
        // borderCapStyle: 'butt',
        // borderDash: [10, 5],
      },
      {
        label:'feels_like',
        data: feels_like,
        borderWidth:2,
        borderColor: 'rgb(100 146 60)',
        fill:false, 
        pointBackgroundColor:"rgb(100, 168, 98)",
        tension:0.4, 
    },
    ]
    }
    this.chart1.update();
  }

   

  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
}

more(){
  this.expand = !this.expand
}



}
