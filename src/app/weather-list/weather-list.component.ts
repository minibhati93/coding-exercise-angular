import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../service/weather-service/weather.service'

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  weatherData = [];
  imgBaseUrl: string = 'https://openweathermap.org/img/wn/';
  subscription: Subscription;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.subscription = this.weatherService.getDataOfCities().subscribe((rspData:any) => {
      this.weatherData = rspData.list;
      console.log(this.weatherData);
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
