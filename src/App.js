import React, { Component, Fragment } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
const styles={
  profile:{
    width:100,
    height:100,
    margin:10

  }
}
class App extends Component {

  constructor(props){ //Construction of a constructor to Initialize the values
        super(props);  //To get data from parent class
        this.state={

          newMessage:'',
          temperature:"",
          pressure:"",
          humidity:"",
          main:"",
          description:"",
          icon:""

        }
    }


    async getData(){

      var cityname= this.state.newMessage;
      var url='https://api.openweathermap.org/data/2.5/weather?q=';

      var appid="19e6ce13b161a02dff960c3624058dd0"
      var resP =  fetch(url+cityname+"&appid="+appid);

      var res=await resP
      if(res.ok){
      //var res2=await res2P
      var json= await res.json();
      //var json2= await res2.json();

      this.setState({
        temperature:json.main.temp-273 + " C",
        pressure:json.main.pressure,
        humidity:json.main.humidity,
        main:json.weather[0].main,
        description:json.weather[0].description,
        icon:json.weather[0].icon

      })
      var iconVal=this.state.icon;
      var url2='https://openweathermap.org/img/w/';
      var url3=url2+iconVal+".png";
      this.setState({
        icon: url3
      })
      return json;
    }
      else{
        Alert.error('Test message 3');
      }
    }

    _handle2Click(){
      this.setState({
        newMessage:'',
        temperature:"",
        pressure:"",
        humidity:"",
        main:"",
        description:"",
        icon:""
      })
    }




  render() {
    return (
      <Fragment>
      <nav>
                    <div class="nav-wrapper">
                      <a href="#" class="brand-logo">Weather App</a>
                      <ul id="nav-mobile" class="right hide-on-med-and-down">


                      </ul>
                    </div>
                  </nav>
                  <br/>
                  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="Enter City" id="email" type="email" class="validate" value={this.state.newMessage}
      onChange={function(e){
        this.setState({
          newMessage:e.target.value
        })
      }.bind(this)}/><label for="email"></label>
        <span class="helper-text" data-error="wrong" data-success="right">Enter valid city</span>
      </div>
    </div>
  </form>
</div>
      <blockquote><h5> Enter City Name</h5></blockquote>
      <br/>
      <ul>
      <li>

          <Fragment>
          <button  class="btn waves-effect waves-light" type="submit" name="action" onClick={this.getData.bind(this)
          }> Submit</button>

          </Fragment>
        <button class="btn waves-effect waves-light" type="submit" name="action" onClick={this._handle2Click.bind(this)}> Another<i class="material-icons right"></i></button>
      </li>
      </ul>


      <blockquote>
    <p>  Temperature:  {this.state.temperature}  </p>
    <p>  Pressure:  {this.state.pressure}</p>
    <p>  Humidity:  {this.state.humidity}</p>
    <p>  Main:  {this.state.main}</p>
    <p>  Description:  {this.state.description}</p>
    <p> <img style={styles.profile} src={this.state.icon} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiokLfr7oveAhWIqo8KHVhmANgQjRx6BAgBEAU&url=https%3A%2F%2Fwww.washingtonpost.com%2Fnews%2Fcapital-weather-gang%2Fwp%2F2018%2F05%2F08%2Fd-c-area-forecast-nice-weather-week-continues-things-could-get-hot-this-weekend%2F&psig=AOvVaw0vgQ85V9csmgVFpnmFyp7L&ust=1539810380663284"}}/></p>
    </blockquote>



      </Fragment>
    );
  }
}

export default App;
//  <p>{this.state.weather[0].id}{this.state.weather[0].main}{this.state.weather[0].description}</p>
  // <p>{this.state.main.temp}{this.state.main.pressure}{this.state.main.humidity}{this.state.main.temp_min}
  // {this.state.main.temp_max}</p>
//<button onClick={this._handle2Click.bind(this)}> Another</button>
