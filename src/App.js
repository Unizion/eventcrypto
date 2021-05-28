import './App.css';
import React from 'react';
import axios from 'axios';

import EventList from './components/EventList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       events: [],
       eventtypes: [],
       countries: []
       };

    this.showstate = this.showstate.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }
  componentDidMount() {
    this.getEvents();
    this.getEventsTypes();
    this.getCountries();
    
  }

  getEvents(...args){
    let request = "https://api.coingecko.com/api/v3/events?upcoming_events_only=false";
    if(args.length > 1 ){
      console.log(args)
      //country
      if(args[0] !== 0) {
        request += '&country_code='+args[0]
      }
      //type
      if(args[1] !== 0){
        request += '&type='+args[1]
      }
      //year
      if(args[2] !== 0){
        request += '&from_date='+ args[2] +'-01-01&to_date='+ args[2]+'-12-31'
      }
      console.log(request)
      return(
        axios.get(request)
        .then((response) => {
          this.setState({ events: response.data.data })
          console.log(this.state.events)
        })
        .catch(function (error) {
          console.log(error);
      })
      )
    }
    return (
      axios.get('https://api.coingecko.com/api/v3/events?upcoming_events_only=false')
        .then((response) => {
          this.setState({ events: response.data.data })
        })
        .catch(function (error) {
          console.log(error);
      })
    )
  }
  getEventsTypes(){
    return (
      axios.get('https://api.coingecko.com/api/v3/events/types')
      .then((response) => {
        this.setState({ eventtypes: response.data.data })
      })
      .catch(function (error) {
        console.log(error);
    })
    )
  }

  getCountries(){
    return (
      axios.get('https://api.coingecko.com/api/v3/events/countries')
        .then((response) => {
          this.setState({ countries: response.data.data })
        })
        .catch(function (error) {
          console.log(error);
      })
    )
  }

  showstate(){
      console.log(this.state);
  }
  
  render(){
    return (
      <div className="App">
        <div>
          {this.state.events.length > 0 && this.state.eventtypes.length > 0 && this.state.countries.length > 0
            ?
              <div>
                <EventList
                  countries={this.state.countries} 
                  eventtypes={this.state.eventtypes}
                  data={this.state.events}
                  getMoreData={this.getEvents}
                />
              </div>
            : <div>Loading .......</div>
          }
        </div>
        <div onClick={this.showstate}>CLick</div>
      </div>
    );
  }
  
}

export default App;
