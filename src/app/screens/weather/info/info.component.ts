import { Component, OnDestroy, OnInit ,ViewEncapsulation} from '@angular/core';
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

  constructor(private weatherService:WeatherService,private clipboard: Clipboard) {
    weatherService.searchedCity.subscribe(res =>{
      this.weatherService.getCoordinates(res).subscribe(res=>{
        this.cityData = res[0]
        // console.log(this.cityData)
        this.weatherService.getWeather(this.cityData?.lat,this.cityData?.lon).subscribe(res=>{ 
          this.weatherData= res
          this.dailyData = res.daily[0]
 
            // this.getHistoty() 

          console.log(this.weatherData)
         
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
          // console.log(this.aqiData) 
        }) 
        // weatherService.getHistoricData(this.cityData?.lat,this.cityData?.lon).subscribe(res =>{
        //   console.log(res)
        //   this.historicData=res
        // })

        
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
    console.log(data)
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

  //   getHistoty() {
  //     console.log(this.cityData.lat,this.cityData.lon)
  //      this.historicData=[]
  //         for(let i = 1; i <=5; i++){
            
  //           let date = Math.round(new Date(new Date().setDate(new Date().getDate() - i )).getTime() / 1000)
  //           this.weatherService.getHistoricData(this.cityData?.lat,this.cityData?.lon,date).
  //           subscribe(res=>{ 
  //               this.historicData.push(res) 
  //           }) 
  //         } 
  //         setTimeout(() =>{
  //           console.log(this.weatherData.daily)
  //         console.log(this.historicData)
  //         let Data = this.historicData.concat(this.weatherData)
  //         console.log(Data)
  //         },900) 
 
      
  //     let newDate=new Date(this.calenderValue.year,this.calenderValue.month,this.calenderValue.day).getTime()/1000
  //     console.log(newDate)
  //     console.log(this.cityData.lat,this.cityData.lon)
  //     this.weatherService.getHistoricData(this.cityData.lat,this.cityData.lon,
  //       newDate ).subscribe(res=>{
  //         console.log(res)
  //       })
  // }

//   find(){
//     // this.currentDate = new Date(this.weatherData.current.dt * 1000); 
//     let myDates:any[]=new Date().toLocaleDateString().split("/") 
// let newDate = new Date( myDates[2], myDates[0] - 1, myDates[1]); 
// let unixDate=newDate.getTime()/1000
// console.log(unixDate)
// let morning6 = unixDate+21600
// let morning9 = morning6+10800
// let noon12 = morning9+10800
// let noon3 = noon12+10800
// let eve6 = noon3+10800
// let night9 = eve6+10800
// console.log(morning6,morning9,noon12,noon3,eve6,night9) 
 
//     for(let i=0; i<this.weatherData?.hourly.length ;i++){
//       this.array.push(this.weatherData?.hourly[i].dt)
//       // console.log()
//     }
//     // console.log(this.array)
//     let result = this.array.filter(s => s > night9);
//     console.log(result
//     )  
//   }



  // ngOnDestroy(): void {
  //   this.chart1.destroy()
  // }

  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
}

more(){
  this.expand = !this.expand
}



}
