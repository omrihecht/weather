import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CitiesCheckList, City} from "../weather.interface";

const INIT_SELECTION_MAP = [2759794, 281184, 2643743, 6455259, 293397, 1850147];

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {

  @Input() cities: City[];
  @Output() getWeather: EventEmitter<number[]> = new EventEmitter<number[]>();

  citiesCheckList: CitiesCheckList[] = [];

  constructor() {
  }

  ngOnInit() {
    this.citiesCheckList = this.cities.map(city => Object.assign(
      {},
      city,
      {checked: INIT_SELECTION_MAP.indexOf(city.id) > -1}
    ))
      .sort((a, b) => {
        const cityName1 = a.name.toUpperCase();
        const cityName2 = b.name.toUpperCase();
        return (cityName1 < cityName2)
          ? -1
          : (cityName1 > cityName2)
            ? 1
            : 0;
      });
  }

  getList(): number[] {
    const checked = this.citiesCheckList.filter(item => item.checked);
    return checked.map(city => city.id);
  }
}
