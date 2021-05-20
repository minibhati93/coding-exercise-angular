import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { WeatherService } from '../service/weather-service/weather.service'

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  weatherData = [];
  private imgBaseUrl: string = 'https://openweathermap.org/img/wn/';
  private subscription: Subscription;

  constructor(private weatherService: WeatherService,
              private router: Router) { }

  ngOnInit(): void {
    this.weatherService.setCityName(null);
    this.subscription = this.weatherService.getDataOfCities().
      subscribe((rspData:any) => this.weatherData = rspData.list);
  }

  openDetail(city) {
    this.router.navigate([`/city/${city.id}`]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
