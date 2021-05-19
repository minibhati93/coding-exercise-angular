import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherListComponent } from './weather-list/weather-list.component';

const routes: Routes = [
  { path: '', component: WeatherListComponent },
  { path: 'city/:id', component: WeatherDetailComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
