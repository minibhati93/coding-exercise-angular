import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from '../service/weather-service/weather.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {

  cityId: any;
  subscription: Subscription
  constructor(private route: ActivatedRoute,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.cityId = this.route.snapshot.params.id;
    this.subscription = this.weatherService.getForecastByCity(this.cityId).
      subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

}
