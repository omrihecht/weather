import {Injectable} from '@angular/core';
import {CityWeather, Gender} from "../weather.interface";

const IDEAL_TEMP_MALE: number = 21;
const IDEAL_TEMP_FEMALE: number = 22;
const IDEAL_HUMID: number = 50;

const TEMP_MULTIPLIER: number = 2;

@Injectable()
export class CompareWeatherService {

  sortWeatherList(
    citiesWeather: CityWeather[],
    gender: Gender,
  ): CityWeather[] {
    return citiesWeather.sort((a, b) => {
      const cityScore1 = this.getTempScore(a, gender) + this.getHumidScore(a);
      const cityScore2 = this.getTempScore(b, gender) + this.getHumidScore(b);
      return (cityScore1 < cityScore2)
        ? -1
        : (cityScore1 > cityScore2)
          ? 1
          : 0;
    });
  }

  private getTempScore(cityWeather: CityWeather, gender: Gender): number {
    const idealTemp = gender === Gender.male
      ? IDEAL_TEMP_MALE
      : IDEAL_TEMP_FEMALE;
    return Math.abs(cityWeather.main.temp - idealTemp) * TEMP_MULTIPLIER;
  }

  private getHumidScore(cityWeather: CityWeather): number {
    return Math.abs(cityWeather.main.humidity - IDEAL_HUMID);
  }
}
