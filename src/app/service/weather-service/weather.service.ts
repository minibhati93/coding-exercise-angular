import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_KEY = '3f510b12aa59b39aa37a1edbe57c8809';
  private WEATHER_BASE_URL = 'http://api.openweathermap.org';

  constructor(private http: HttpClient) { }

  getDataOfCities() {
    //return this.http.get(
    //  `${this.WEATHER_BASE_URL}/data/2.5/box/city?bbox=12,32,15,37,10&appid=${this.API_KEY}`);

    return this.http.get(
      `${this.WEATHER_BASE_URL}/data/2.5/find?lat=27.65195&lon=77.23149&cnt=5&units=metric&appid=${this.API_KEY}`
    )
  }
}
