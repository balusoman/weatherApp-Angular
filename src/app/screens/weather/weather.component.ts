import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  testForm = new FormGroup({
    darkMode : new FormControl(false)
});

  constructor() { }

  ngOnInit(): void {
  }

}
