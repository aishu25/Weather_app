import React from 'react';

class WheatherDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            location: '',
            code: '',
            dis_weather: '',
            dis_city: '',
            dis_weather_detail: '',
            dis_country: '',
            isShow: false,
            error: '',
            showErr: false,
            value: ''
        };
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleCodeChange = this.handleCodeChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleLocationChange(event){
        this.setState( {
            location: event.target.value,
        });
    }
    handleCodeChange(event) {
        this.setState ({
            code: event.target.value,
        })
    }
    handleSubmit(event) {
        console.log("comes to handleSubmit")
        event.preventDefault();
        var api_key = "787472803459bd31100cde1d9e1ed4cf";
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.location + "," + this.state.code + "&&appid=" + api_key, {
          headers: {
            "Content-Type" : "text/plain",
          }
        })
        .then (response => response.json())
        .then(response => {
            if (response.cod !== '404') {
                var temp_Kelvin = response.main.temp
                var temp_Celsius = temp_Kelvin - 273.15
                var temp_Farenheit = temp_Celsius * 1.8 + 32
                this.setState ({
                    dis_city: response.name,
                    dis_weather: response.weather[0].main,
                    dis_weather_detail: response.weather[0].description,
                    dis_country : response.sys.country,
                    dis_temp : temp_Farenheit.toFixed(2),
                    isShow: true,
                    showErr: false,
                    location: '',
                    code: '',
                });
            }
            else {
                this.setState ( {
                    isShow: false,
                    showErr: true,
                    error: response.message,
                    location: '',
                    code: '',
                })
            }
            console.log("dis_city : ", this.state.dis_city)
            console.log("response from WeatherAPI in handleSubmit: ", response)
        })
      }  
    render() {  
        var lat = Number(this.props.latitude).toFixed(2); 
        var lon = Number(this.props.longitude).toFixed(2);
        return(
            <div>
                <div className="masthead">
                    <div className="container d-flex h-100 align-items-center">
                        <div className="mx-auto text-center">
                            <h1 className="mx-auto my-0 text-uppercase">Weather App!</h1>
                            <h4>Your current location: {this.props.city},{this.props.country}</h4>
                            <h4>Your current coordinates are: {lat} Lat,{lon} Lon</h4>
                            <h5>Weather Detail : {this.props.weather}, {this.props.weatherDetail}</h5>
                            <div>
                                <button className="btn btn-primary mx-auto" onClick={this.props.setKelvin}>Kelvin</button>
                                <button className="btn btn-primary mx-auto" onClick={this.props.setCelsius}>Celsius</button>
                                <button className="btn btn-primary mx-auto" onClick={this.props.setFaren}>Farenheit</button>
                                <div>Temprature : {this.props.temp }</div>
                            </div>
                            <br></br>
                            
                            <br></br>
                            <h1 className="text-white-50 mx-auto mt-2 mb-5">Look around</h1>
                            <br></br>
                            <form className="form-inline d-flex" onSubmit={this.handleSubmit}>
                                <input type="text" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputEmail" placeholder="Ex: San Francisco,Montreal..." value={this.state.location} onChange={this.handleLocationChange}></input>
                                <input type="text" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputEmail" placeholder="Ex: US,CA,IN..." value={this.state.code} onChange={this.handleCodeChange}></input>
                                <button type="submit" value="Submit" className="btn btn-primary mx-auto">Submit</button>
                            </form>
                            <br></br>
                            {this.state.isShow ? 
                            <div>
                                <p>City : {this.state.dis_city}, {this.state.dis_country}</p>
                                <p>Weather : {this.state.dis_weather}-{this.state.dis_weather_detail}</p>
                                <p>Temprature : {this.state.dis_temp} °F</p>
                            </div> : null }
                            {this.state.showErr ? <div>{this.state.error}</div> : null }
                        </div>
                    </div>
                </div>
            </div>
                 
        )
    }
}

export default WheatherDisplay;