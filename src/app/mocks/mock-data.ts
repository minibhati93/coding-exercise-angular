export const mockData = {
  weather: {
    cod: "200",
    count: 5,
    message: "accurate",
    list : [
      {
        clouds: {all: 3},
        coord: {lat: 27.65, lon: 77.2667},
        dt: 1621526957,
        id: 1268266,
        main: {temp: 25.85, feels_like: 26.27, temp_min: 25.85, temp_max: 25.85, pressure: 1004},
        name: "Kāman",
        rain: null,
        snow: null,
        sys: {country: "IN"},
        weather: [{
            description: "clear sky",icon: "01n", id: 800, main: "Clear"
        }],
        wind: {speed: 3.23, deg: 110}
      },
      {
        clouds: {all: 3},
        coord: {lat: 27.65, lon: 77.2667},
        dt: 1621526987,
        id: 1276857,
        main: {
          feels_like: 25.83,grnd_level: 983,humidity: 70,pressure: 1004,sea_level: 1004,temp: 25.41},
        name: "Barsāna",
        rain: null,
        snow: null,
        sys: {country: "IN"},
        weather: [{
            description: "clear sky",icon: "01n", id: 800, main: "Clear"
        }],
        wind: {speed: 2.95, deg: 106}
      },
    ]
  }
}
