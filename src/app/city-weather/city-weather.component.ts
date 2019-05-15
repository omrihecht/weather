import {Component, Input, OnInit} from '@angular/core';
import {CityWeather} from "../weather.interface";

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {

  @Input() cityWeather: CityWeather;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

  getDescriptionIcon(iconCode: string): string {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }

}
