import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {City} from "../weather.interface";
import {CITIES_LIST} from "../weather.const";

@Injectable()
export class CityListService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getCities(): Observable<City[]> {
    const api = 'assets/city.list.json';
    return this.httpClient.get(api)
      .pipe(
        take(1),
        map((allCities: any[]) => {
          return CITIES_LIST.map(listCity => ({
            id: allCities.find(city => city.name === listCity.name && city.country === listCity.country).id,
            name: listCity.name,
            country: listCity.country,
          }));
        })
      );
  }
}
