# The best weather on earth

## Flow
- Requests local city list JSON (downloaded from OpenWeatherMap) and maps the json data (containing cityId) to a predefined list of cities. the list generates the form
![image](https://user-images.githubusercontent.com/24462119/57803415-07ecc000-7761-11e9-807a-da0d8d1b2db9.png)
- Form emits object containing array of city ids, and gender
- Request is sent to the OpenWeatherMap API with array of city ids
- On request return, cities are ordered by algorythm that defines the best weather, this data generates the city list
![image](https://user-images.githubusercontent.com/24462119/57806073-0cb47280-7767-11e9-8c21-b7a3a434f3e3.png)

## Services
**CityListService**
- responsible for getting the list of city data to build the form.

**WeatherService**
- responsible for getting weather data for city by city ids.
- has a caching mechanism, will not request the same city twice in the same session.
- might make more then 1 network call if more then 20 cities are requested. Max ids per request = 20.

**CompareWeatherService**
- responsible to sort the cities based on their weather data.
- uses an algorythm that takes into account the temperature and humidity. temperature is a stronger factor on the ordering, I assume that change in 1 degree of temperature is more significant the a change of 1 % humidity. temperature multiplier is 3.
