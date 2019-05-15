import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CityListService} from "./service/city-list.service";
import {WeatherService} from "./service/weather.service";
import {CityWeatherComponent} from './city-weather/city-weather.component';
import { CityFormComponent } from './city-form/city-form.component';
import {CompareWeatherService} from "./service/compare-weather.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    CityWeatherComponent,
    CityFormComponent,
  ],
  providers: [
    CityListService,
    WeatherService,
    CompareWeatherService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
