import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { WeatherDetailComponent } from './weather-detail.component';

describe('WeatherDetailComponent', () => {
  let component: WeatherDetailComponent;
  let fixture: ComponentFixture<WeatherDetailComponent>;
  const fakeActivatedRoute =  {
    snapshot: {
       params: {id: 1234}
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherDetailComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
