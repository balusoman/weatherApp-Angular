import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Chart, registerables, Tooltip } from 'chart.js';
import { Weather } from 'src/app/models/weather';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  cityData!:any
  weatherData!:Weather 
  aqiData!:any
  historicData!:any

  chart1:any=[] 
  firstChartLoad:boolean=true
  tempData!:any[]

  array:any[]=[]
  clickedDay!:any

  constructor(private weatherService:WeatherService,private clipboard: Clipboard) {
    weatherService.searchedCity.subscribe(res =>{
      this.weatherService.getCoordinates(res).subscribe(res=>{
        this.cityData = res[0]
        // console.log(this.cityData)
        this.weatherService.getWeather(this.cityData?.lat,this.cityData?.lon).subscribe(res=>{ 
          this.weatherData= res
          console.log(this.weatherData)
          this.tempData=[res.daily[0].temp.morn,res.daily[0].temp.day,res.daily[0].temp.eve,res.daily[0].temp.night,]
          if(this.firstChartLoad){
            this.InitialChartJs() 
            this.firstChartLoad=false 
            this.clickedDay = res.daily[0]
          }
          else{
            this.updateChart()
          } 
          // console.log(this.tempData)
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
  //     {
  //       label:'wind',
  //       data: [10,20,50,30],
  //       borderWidth:2,
  //       borderColor: 'rgb(100 146 60)',
  //       fill:false, 
  //       pointBackgroundColor:"rgb(100, 168, 98)",
  //       tension:0.4, 
  //   },
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
        // label:'temperature',
        data: this.tempData,
        borderWidth:2,
        borderColor: 'rgb(251 146 60)',
        // fill:true, 
        pointBackgroundColor:"rgb(255, 168, 98)",
        tension:0.4,
        // borderCapStyle: 'butt',
        // borderDash: [10, 5],
      }]
    }
    this.chart1.update();
  }


  show(data:any){
let temp=[data.temp.morn,data.temp.day,data.temp.eve,data.temp.night,]
    if(this.clickedDay != data){ 
      this.restartChart(temp)
    } 
    this.clickedDay = data
  }

  restartChart(data:any){
    this.chart1.data = {
      labels:['Morning','Noon','Evening','Night'],
      datasets: [{
        // label:'temperature',
        data: data,
        borderWidth:2,
        borderColor: 'rgb(251 146 60)',
        // fill:true, 
        pointBackgroundColor:"rgb(255, 168, 98)",
        tension:0.4,
        // borderCapStyle: 'butt',
        // borderDash: [10, 5],
      }]
    }
    this.chart1.update();
  }

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

}
