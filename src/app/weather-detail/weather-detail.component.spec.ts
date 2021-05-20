import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { mockData } from '../mocks/mock-data';
import { WeatherService } from '../service/weather-service/weather.service';

import { WeatherDetailComponent } from './weather-detail.component';

describe('WeatherDetailComponent', () => {
  let component: WeatherDetailComponent;
  let fixture: ComponentFixture<WeatherDetailComponent>;
  const fakeActivatedRoute =  {
    snapshot: {
      params: { id: 1268266 }
    }
  };
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherDetailComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute } ]
    })
    .compileComponents();
    weatherService = TestBed.inject(WeatherService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set city id approriately', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.cityId).toEqual(1268266);
  }));

  it('should return "Thursday" for 20th May 2021', () => {
    const day = component.getDayInfo(1621512000);
    expect(day).toEqual('Thursday');
  });

  it('should populate weather forecast data properly', fakeAsync(() => {
    spyOn(weatherService, 'getForecastByCity').and.returnValue(of(mockData.forecastData));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(Object.keys(component.forecastData).length).toEqual(5);
  }));

  it('should set city name properly', fakeAsync(() => {
    spyOn(weatherService, 'getForecastByCity').and.returnValue(of(mockData.forecastData));
    const setSpy = spyOn(weatherService, 'setCityName').and.callThrough();
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const name = mockData.forecastData.city.name + ',' + mockData.forecastData.city.country;
    expect(setSpy).toHaveBeenCalledWith(name);
  }));
});
