import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rotateInDownLeftOnEnterAnimation, rotateInUpLeftOnEnterAnimation, slideInLeftOnEnterAnimation, slideInRightOnEnterAnimation, zoomInOnEnterAnimation } from 'angular-animations';

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

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  click(){
    this.router.navigate(['weather'])
  }

}
