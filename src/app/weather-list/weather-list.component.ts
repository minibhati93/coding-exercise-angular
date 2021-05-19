import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  private subscription: Subscription;

  constructor(private weatherService: WeatherService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.weatherService.getDataOfCities().subscribe((rspData:any) => {
      this.weatherData = rspData.list;
      console.log(this.weatherData);
    }, error => {
      console.log(error);
    });
  }

  openDetail(city) {
    this.router.navigate([`/city/${city.id}`]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
