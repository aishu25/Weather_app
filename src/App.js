import React, { Component } from 'react';
import WheatherDisplay from './components/WeatherDisplay';
import "./css/weather.css";
import "./css/grayscale.min.css";
import "./css/bootstrap/css/bootstrap.min.css";
import "./css/fontawesome-free/css/all.min.css"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      country: '',
      temp: '',
      currLat: '',
      currLon: '',
      currTemp_K: '',
      currTemp_C: '',
      currTemp_F: '',
      weatherMain: '',
      weatherDetail: '',
      value: '',
      dis_city: ''
    }
    this.getLocation = this.getLocation.bind(this);
  }
  componentWillMount() {
    this.getLocation();
  }
  getLocation() {
    fetch('https://ipapi.co/json/' , {
      headers: {
        "Content-Type" : "text/plain",
      }
    })
    .then (response => response.json())
    .then(response => {
      this.setState ({
        city: response.city,
        country: response.country,
        currLat: response.latitude,
        currLon: response.longitude,
      })
      // console.log("response from LocationAPI : ", response)
      this.getWeather(); 
    })
  }
  getWeather() {
    // console.log("this.state.currLat : ", this.state.currLat)
    var api_key = "787472803459bd31100cde1d9e1ed4cf";
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.currLat + '&lon=' + this.state.currLon + "&&appid=" + api_key, {
      headers: {
        "Content-Type" : "text/plain",
      }
    })
    .then (response => response.json())
    .then(response => {
      var temp_K = response.main.temp;
      var temp_C = temp_K - 273.15;
      var temp_F = temp_C * 1.8 + 32;
      this.setState({
        currTemp_K : (temp_K).toString() + 'K',
        temp: (temp_K).toString() + 'K',
        currTemp_F: (temp_F.toFixed(2)).toString() + '°F',
        currTemp_C: (temp_C.toFixed(2)).toString() + '°C',
        weatherMain: response.weather[0].main,
        weatherDetail: response.weather[0].description
      });
    })
  }

  handleKelvin() {
    this.setState({temp: this.state.currTemp_K});
  }
  handleCelsius() {
    this.setState({temp: this.state.currTemp_C});
  }
  handleFaren() {
    this.setState({temp: this.state.currTemp_F});
  }  
  render() {
    return (
      <div className="App">
        <WheatherDisplay
          setKelvin = {this.handleKelvin.bind(this)}
          setFaren = {this.handleFaren.bind(this)}
          setCelsius = {this.handleCelsius.bind(this)}
          temp = {this.state.temp}
          tempCategory = {this.state.tempCategory}
          latitude = {this.state.currLat}
          longitude = {this.state.currLon}
          city = {this.state.city}
          country = {this.state.country}
          kelvin = {this.state.currTemp_K}
          celsius = {this.state.currTemp_C}
          faren = {this.state.currTemp_F}
          weather = {this.state.weatherMain}
          weatherDetail = {this.state.weatherDetail}
          value = {this.state.value}
          handleChange = {this.state.handleChange}
          handleSubmit = {this.state.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
