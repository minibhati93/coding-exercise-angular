import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WeatherService } from '../service/weather-service/weather.service';

import { WeatherListComponent } from './weather-list.component';
import { mockData } from '../mocks/mock-data';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  template: ''
})

class DummyComponent {}

describe('WeatherListComponent', () => {
  let component: WeatherListComponent;
  let fixture: ComponentFixture<WeatherListComponent>;
  let weatherService: WeatherService;
  let location: Location

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherListComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'city/:id', component: DummyComponent }
      ])]
    })
    .compileComponents();
    weatherService = TestBed.inject(WeatherService);
    location = TestBed.inject(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(weatherService, 'setCityName').and.returnValue(null);
    spyOn(weatherService, 'getDataOfCities').and.returnValue(of(mockData.weather));
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return weather data of two cities', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    expect(component.weatherData.length).toEqual(2);
  }));

  it('should return the city name of the first tile as `Kāman, IN`', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    const name = fixture.debugElement.queryAll(By.css('.city-name'))[0].nativeElement,
      text = mockData.weather.list[0].name + ', ' + mockData.weather.list[0].sys.country;
    expect(name.textContent).toEqual(text);
  }));

  it('should route to /city/:id when clicking on the first tile', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    const firstTile = fixture.debugElement.queryAll(By.css('.card-body'))[0].nativeElement;
    firstTile.click();
    tick();
    fixture.detectChanges();
    expect(location.path()).toEqual('/city/'+mockData.weather.list[0].id);
  }));
});
