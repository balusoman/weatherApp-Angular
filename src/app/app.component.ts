import { Component } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherApp-Angular'; 

  constructor(private weatherService:WeatherService,private bpObserable: BreakpointObserver,private router: Router){

    this.bpObserable
      .observe(['(min-width: 1100px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Welcome');
          weatherService.landscapeMode.next(true)
          this.router.navigate([`/weather`]);
        } else {  
          this.router.navigate([`/home`]);
          weatherService.landscapeMode.next(false)
          
        }
      });
  }
   

}
