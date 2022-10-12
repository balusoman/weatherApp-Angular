import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart, registerables, Tooltip } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  demoData=[20,34,28,22]
  chart:any=[]
  

image :HTMLImageElement = new Image()
  // image.src = "https://www.chartjs.org/img/chartjs-logo.svg";

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

      // console.log(x.getPixelForValue(0))
      
      // ctx.globalCompositeOperation = 'destination-over';
      // ctx.fillStyle = options.color;
      // ctx.fillRect(0, 0, chart.width, chart.height);
      // ctx.restore();
  },
  }

  constructor() {
    this.image.src= "https://www.chartjs.org/img/chartjs-logo.svg";
    
    Chart.register(...registerables) 
   }

  ngOnInit(): void {
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
          // fill:true, 
          pointBackgroundColor:"rgb(255, 168, 98)",
          tension:0.4,
          // borderCapStyle: 'butt',
          // borderDash: [10, 5],
          
          
      }]

      }
    })
  }

  showTemp() {

    this.demoData=[23,34,26,30] 


    this.chart.data = {
      labels:['mon','noon','eve','night'],
      datasets: [{
        label:'temperature',
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

  showWind() {

    this.demoData=[35,24,35,20] 


    this.chart.data = {
      labels:['mon','noon','eve','night'],
      datasets: [{
        label:'wind',
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

}
