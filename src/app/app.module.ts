import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherListComponent,
    ErrorPageComponent,
    WeatherDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
