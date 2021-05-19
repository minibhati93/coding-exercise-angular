import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../service/weather-service/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  city: string;
  sub: Subscription;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.sub = this.weatherService.getCityName().subscribe(
      data => this.city = data
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
