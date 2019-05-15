import {Component, OnInit} from '@angular/core';
import {CityListService} from "./service/city-list.service";
import {City, CityWeather} from "./weather.interface";
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

  onGetWeather(selectedIds: number[]): void {
    this.weatherService.getWeatherByCityIds(selectedIds)
      .subscribe(citiesWeatherData => {
        console.log('citiesWeatherData', citiesWeatherData);
        this.citiesWeather = this.compareWeatherService
          .sortWeatherList(citiesWeatherData);
      });
  }
}
