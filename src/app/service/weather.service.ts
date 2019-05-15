import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable, of} from "rxjs";
import {API_KEY} from "../weather.const";
import {switchMap} from "rxjs/operators";
import {CityWeather} from "../weather.interface";

const MAX_REQUEST_IDS = 20;

@Injectable()
export class WeatherService {

  private citiesWeatherRaw: any = [];

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getWeatherByCityIds(ids: number[]): Observable<CityWeather[]> {
    const cachedCitiesAsObservable = this.getCachedCities(ids).map(cityWeatherRaw => of({list: cityWeatherRaw}));
    const idsChunks = this.chunkArray(this.getIdsForRequests(ids));
    const httpRequests = idsChunks.map(idsChunk => this.getRequest(idsChunk));
    const requests = cachedCitiesAsObservable.concat(httpRequests);

    return forkJoin(requests)
      .pipe(
        switchMap(data => {
          const citiesWeatherLists = data.map(d => d.list);
          this.citiesWeatherRaw = [].concat(...citiesWeatherLists);
          const citiesWeather: CityWeather[] = [].concat(...citiesWeatherLists).map(cityWeather => {
            return {
              id: cityWeather.id,
              name: cityWeather.name,
              weather: cityWeather.weather,
              main: cityWeather.main,
              country: cityWeather.sys.country,
            }
          });
          return [citiesWeather];
        })
      );
  }

  private chunkArray(ids: number[]): number[][] {
    const idsChunks = [];
    for (let index = 0; index < ids.length; index += MAX_REQUEST_IDS) {
      const chunk = ids.slice(index, index + MAX_REQUEST_IDS);
      idsChunks.push(chunk);
    }
    return idsChunks;
  }

  private getRequest(ids: number[]): Observable<any> {
    const api = `http://api.openweathermap.org/data/2.5/group?id=${ids.join(',')}&units=metric&appid=${API_KEY}`;
    return this.httpClient.get(api);
  }

  private getCachedCities(ids: number[]): any[] {
    return this.citiesWeatherRaw.filter(city => ids.find(id => id === city.id))
  }

  private getIdsForRequests(ids: number[]): number[] {
    return ids.filter(id => this.citiesWeatherRaw.some(city => city.id === id) !== true)
  }
}
