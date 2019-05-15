import {Component, OnInit} from '@angular/core';
import {CityListService} from "./service/city-list.service";
import {City, CityWeather, FormConfig} from "./weather.interface";
import {WeatherService} from "./service/weather.service";
import {CompareWeatherService} from "./service/compare-weather.service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  cities: City[];
  citiesWeather: CityWeather[];

  constructor(
    private cityListService: CityListService,
    private weatherService: WeatherService,
    private compareWeatherService: CompareWeatherService,
  ) {
  }

  ngOnInit(): void {
    this.cityListService.getCities()
      .subscribe(cities => {
        this.cities = cities;
      });
  }

  onGetWeather(formConfig: FormConfig): void {
    this.weatherService.getWeatherByCityIds(formConfig.citiesIds)
      .subscribe(citiesWeatherData => {
        this.citiesWeather = this.compareWeatherService
          .sortWeatherList(citiesWeatherData, formConfig.gender);
      });
  }
}
