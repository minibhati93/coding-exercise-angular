import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from '../service/weather-service/weather.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit, OnDestroy {

  cityId: any;
  forecastData = [];
  subscription: Subscription;
  private imgBaseUrl: string = 'https://openweathermap.org/img/wn/';

  constructor(private route: ActivatedRoute,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.cityId = this.route.snapshot.params.id;
    this.subscription = this.weatherService.getForecastByCity(this.cityId).
      subscribe( (data:any) => {
        this.weatherService.setCityName(data.city.name + ','+ data.city.country);
        this.populateForecastData(data.list);
      });
  }

  populateForecastData(data) {
    this.forecastData =  data.reduce((list, info) => {
      const [forecastDate] = info.dt_txt.split(" "),
        hour = new Date(info.dt_txt).getHours(),
        day = this.getDayInfo(info.dt);
      if (hour === 9) {
        list[forecastDate] = list[forecastDate] || {};
        list[forecastDate] = Object.assign(info, {day});
      }
      return list;
    }, {});
    console.log(this.forecastData);
  }

  getDayInfo(data) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[new Date(data * 1000).getDay()];
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
