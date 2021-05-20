import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { mockData } from '../mocks/mock-data';
import { WeatherService } from '../service/weather-service/weather.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [ HttpClientTestingModule ]
    })
      .compileComponents();
      weatherService = TestBed.inject(WeatherService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display city name in the header', fakeAsync(() => {
    const cityName = mockData.weather.list[0].name;
    spyOn(weatherService, 'getCityName').and.returnValue(of(cityName));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.city).toEqual(cityName);
    const header = fixture.debugElement.query(By.css('nav span')).nativeElement;
    expect(header.textContent).toEqual(cityName);
  }));

  it('should not display city name in the header', () => {
    const header = fixture.debugElement.query(By.css('nav span'));
    expect(header).toBeNull();
  });
});
