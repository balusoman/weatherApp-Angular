import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rotateInDownLeftOnEnterAnimation, rotateInUpLeftOnEnterAnimation, slideInLeftOnEnterAnimation, slideInRightOnEnterAnimation, zoomInOnEnterAnimation } from 'angular-animations';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({duration:7000,translate:'70px'}),
    zoomInOnEnterAnimation({duration:3000}), 
    slideInLeftOnEnterAnimation({duration:7000,translate:'70px'}),
    rotateInUpLeftOnEnterAnimation(),
    rotateInDownLeftOnEnterAnimation()
    
  ]
})
export class HomeComponent implements OnInit {
 
  loading:boolean=true
  loadingNum!:number

  @HostBinding('style.--scaleX') private scaleX: string = 'scaleX(0)';


  constructor(private weatherService:WeatherService,private router:Router) {
    weatherService.siteLoaded.subscribe(res =>{
      if(res == false){
        for (let i = 0; i < 101; i++) {
      
          setTimeout(()=> {     
            this.loadingNum = i
            this.scaleX = `scaleX(${i/100})`  
          }, i * 20, i); 
     
        }
    
        setTimeout(() => {
          this.loading = false
          weatherService.siteLoaded.next(true)
        }, 2200);
      }
      else{
        this.loading=false
      }
    })
  }

  ngOnInit(): void {

    
    
  }

  click(){
    this.router.navigate(['weather'])
  }

}
