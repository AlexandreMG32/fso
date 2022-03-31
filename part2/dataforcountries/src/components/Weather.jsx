const Weather = ({ weather }) => {
  if (weather) {
    return (
      <div>
        <div>temperature {weather.main.temp} celcius</div>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    );
  } else {
    return <div>Weather a dar loading</div>;
  }
};

export default Weather;
