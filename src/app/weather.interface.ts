export interface City {
  name: string;
  country: string;
  id: number;
}

export interface CitiesCheckList extends City {
  checked: boolean;
}

export interface CityWeather extends City {
  weather: Weather[],
  main: WeatherMain,
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface WeatherMain {
  humidity: number,
  pressure: number,
  temp: number,
  temp_max: number,
  temp_min: number,
}
