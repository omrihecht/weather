# The best weather on earth

## Flow
- Requests local city list JSON (downloaded from OpenWeatherMap) and maps city data with cityId to a predefined list of cities, and with this generate this form:
![image](https://user-images.githubusercontent.com/24462119/57803415-07ecc000-7761-11e9-807a-da0d8d1b2db9.png)
- Form emits object containing array of city ids, and gender
- Request is sent to the OpenWeatherMap API with array of city ids
- On request return, cities are ordered by algorythm that defines the best weather, this data generates the city list
 ![image](https://user-images.githubusercontent.com/24462119/57803839-0079e680-7762-11e9-80a7-4a16dc1c7c6e.png)
