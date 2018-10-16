import React, { Component, Fragment } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
const styles={
  profile:{
    width:40,
    height:30,
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

    async getIcon(){
      var iconVal=this.state.icon;
      if(iconVal===""){
        Alert.error('Test message 3');
      }
      else{
        var url2='https://openweathermap.org/img/w/';
        var url3=url2+iconVal+".png";
        this.setState({
          icon: url3
        })
      }
      return url3
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
          <button class="btn waves-effect waves-light" type="submit" name="action" onClick={this.getIcon.bind(this)}> Show Icon<i class="material-icons right"></i></button>
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
    <p> ICON:  <img style={styles.profile} src={this.state.icon}/></p>
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
