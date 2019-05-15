import {Injectable} from '@angular/core';
import {CityWeather} from "../weather.interface";

const IDEAL_TEMP: number = 21;
const IDEAL_HUMID: number = 50;

const TEMP_MULTIPLIER: number = 3;

@Injectable()
export class CompareWeatherService {

  sortWeatherList(citiesWeather: CityWeather[]): CityWeather[] {
    const sorted = citiesWeather.sort((a, b) => {
      const cityScore1 = this.getTempScore(a) + this.getHumidScore(a);
      const cityScore2 = this.getTempScore(b) + this.getHumidScore(b);
      return (cityScore1 < cityScore2)
        ? -1
        : (cityScore1 > cityScore2)
          ? 1
          : 0;
    });
    return sorted;
  }

  private getTempScore(cityWeather: CityWeather): number {
    return Math.abs(cityWeather.main.temp - IDEAL_TEMP) * TEMP_MULTIPLIER;
  }

  private getHumidScore(cityWeather: CityWeather): number {
    return Math.abs(cityWeather.main.humidity - IDEAL_HUMID);
  }
}
