import './App.css';
import React from 'react';


//import Search from './components/Search.js';
import EventList from './components/EventList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       events: [],
       eventtypes: [],
       countries: [],
       loaded: 0,
       today:'',
       search: false,
       sort: false,
       stitle:"",
       syear:"",
       stype:"",
       scountry:"",
       sortorder:0
       };

    this.showstate = this.showstate.bind(this);
    this.filter = this.filter.bind(this);
  }
  componentDidMount() {
    const axios = require('axios');
    this.getEvents(axios);
    this.getEventsTypes(axios);
    this.getCountries(axios);
    
  }

  getEvents(ax){
    return (
      ax.get('https://api.coingecko.com/api/v3/events?upcoming_events_only=false')
        .then((response) => {
          this.setState({ events: response.data.data })
          this.setState((state) => ({
            loaded: state.loaded +1
          }))
        })
        .catch(function (error) {
          console.log(error);
      })
    )
  }
  getEventsTypes(ax){
    return (
      ax.get('https://api.coingecko.com/api/v3/events/types')
      .then((response) => {
        this.setState({ eventtypes: response.data.data })
        this.setState((state) => ({
          loaded: state.loaded +1
        }))
      })
      .catch(function (error) {
        console.log(error);
    })
    )
  }

  getCountries(ax){
    return (
      ax.get('https://api.coingecko.com/api/v3/events/countries')
        .then((response) => {
          this.setState({ countries: response.data.data })
          this.setState((state) => ({
            loaded: state.loaded +1
          }))
        })
        .catch(function (error) {
          console.log(error);
      })
    )
  }

  showstate(){
      console.log(this.state);
  }
  filter(e){
      console.log(e);
      console.log(e.id);
      console.log(e.value);
      switch(e.id) {
        case 'title':
              console.log(e.value);
              this.setState(() => ({
                stitle: e.value
              }),() => 
              this.state.search !== true ?  this.setState(() =>({
                search:true
              })) : null
              )
            
          break;
        case 'eventtypes':
            console.log(e.value);
            this.setState(() => ({
              stype: e.value
            }),() => 
            this.state.search !== true ?  this.setState(() =>({
              search:true
            })) : null
            )
          
          break;
        case 'eventyear':
            console.log(e.value);
            this.setState(() => ({
              syear: e.value
            }),() => 
            this.state.search !== true ?  this.setState(() =>({
              search:true
            })) : null
            )
          break;
        case 'countries':
            console.log(e.value);
            this.setState(() => ({
              scountry: e.value
            }),() => 
            this.state.search !== true ?  this.setState(() =>({
              search:true
            })) : null
            )
          
          break;
        default:
          // code block
      }
      console.log(this.state.stitle + this.state.scountry + this.state.syear + this.state.stype);
      console.log(this.state.stitle + this.state.scountry + this.state.syear + this.state.stype === "");
      if(this.state.stitle + this.state.scountry + this.state.syear + this.state.stype === "" ){
        this.setState(() =>({
          search:false
        }))
      }
  }
  render(){
    return (
      <div className="App">
        <div>
          {this.state.loaded === 3
            ?
              <div>
                {/* <Search
                  filtering={this.filter}
                  countries={this.state.countries} 
                  eventtypes={this.state.eventtypes}
                  />  */}
                <EventList
                  countries={this.state.countries} 
                  eventtypes={this.state.eventtypes}
                  data={this.state.events}
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
