import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherService } from './weather.service';
import { mockData } from 'src/app/mocks/mock-data';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  let API_KEY, WEATHER_BASE_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ WeatherService ],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
    API_KEY = '3f510b12aa59b39aa37a1edbe57c8809';
    WEATHER_BASE_URL = 'http://api.openweathermap.org';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data of two cities', () => {
    const weatherData = mockData.weather;
    service.getDataOfCities().subscribe((data: any) => {
      expect(data.count).toEqual(weatherData.count);
    });
    const req = httpMock.expectOne(`${WEATHER_BASE_URL}/data/2.5/find?lat=27.65195&lon=77.23149&cnt=5&units=metric&appid=${API_KEY}`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(weatherData);
    httpMock.verify();
  });

  it('should return forecast of 5 days', () => {
    const forecast = mockData.forecastData;
    service.getForecastByCity(1268266).subscribe((data: any) => {
      expect(data.list.length).toEqual(10);
    });
    const req = httpMock.expectOne(`${WEATHER_BASE_URL}/data/2.5/forecast?id=1268266&units=metric&appid=${API_KEY}`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(forecast);
    httpMock.verify();
  });

  it('should set & get city name properly', async(() => {
    service.setCityName('Kaman,IN');
    service.getCityName().subscribe((data: any) => {
      expect(service.city$.value).toEqual('Kaman,IN');
    });
  }));
});
