import React from 'react';
import Event from './Event.js';


export default class EventList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events:this.props.data,
            today:'',
            sort:this.props.filters[2]
        }
    }
    componentDidMount(){
        const today = new Date();
        const d = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        this.setState(() =>({
            today:d
        }))
    }
    render(){
      let filtered = []
      if(this.props.filters[0] === true){
        //sort event type
        let filtering = this.state.events;
        if(this.state.sort[1] !== ""){
          let filteringbis = filtering.filter(event => event.type.toUpperCase() === this.state.sort[1].toUpperCase());
          filtering = filteringbis;
          filtered = filteringbis;
          console.log("event type"+filtered);
        }
        //sort event year
        if(this.state.sort[2] !== ""){
          let filteringbis = filtering.filter(event => event.start_date.split('-')[0] === this.state.sort[2]);
          filtering = filteringbis;
          filtered = filteringbis;
          console.log("event year"+this.state.sort[2]);
        }
        //sort event country
        if(this.state.sort[3] !== ""){
          let filteringbis = filtering.filter(event => event.country === this.state.sort[3]);
          filtering = filteringbis;
          filtered = filteringbis;
          console.log("event country"+this.state.sort[3]);
        }
        //sort title
        if(this.state.sort[0] !== ""){
          let filteringbis = filtering.filter(event => event.title.toUpperCase().indexOf(this.state.sort[0].toUpperCase()) !== -1)
          filtering = filteringbis;
          filtered = filteringbis;
          console.log("event title"+filtered)
        }
      }
        
        console.log(this.props.filters)
        return(
          <div>
            {
              this.props.filters[0] === true ? 
                (filtered.map((data,index) =>
                <div key={index}>
                  <Event data={data} day={this.state.today} />
                </div>
                )) :
                this.state.events.map((data,index) =>
                <div key={index}>
                  <Event data={data} day={this.state.today} />
                </div>
                )
              
            }
          </div>
        )
    }
        
      
}