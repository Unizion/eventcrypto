import React from 'react';
import './Event.css'
import nopic from './img/nopicture.png'
import EventDetail from './EventDetail.js';

export default class Event extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showDetail: false,
            data: this.props.data,
            eventstate:'',
            today: this.props.day
        }
        this.handleDetail = this.handleDetail.bind(this)
    }
    componentDidMount(){
        let d = this.state.today.split("-")
        let start = this.state.data.start_date.split("-")
        if(this.state.data.end_date != null){
            let end = this.state.data.end_date.split("-");
            let unixend = new Date(end[1]+' '+end[2]+' '+end[0]).getTime();
            let unixd = new Date(d[1]+ ' '+ d[2]+ ' ' + d[0]).getTime();
            let unixstart = new Date(start[1]+ ' ' + start[2]+ ' ' + start[0]).getTime();
            if(unixstart > unixd){
                this.setState(() =>({
                    eventstate: 'Soon'
                }))
            } else if(unixstart < unixd && unixd < unixend){
                this.setState(() =>({
                    eventstate: 'Now'
                }))
            } else {
                this.setState(() =>({
                    eventstate: 'Ended'
                }))
            }
        } else {
            this.setState(() =>({
                eventstate: 'Unknown'
            }))
        }
    }
    handleDetail(){
        this.setState((state) =>({
            showDetail: !state.showDetail
        }))
    }
    render(){
        let data = this.state.data
        if(data.screenshot === 'missing_original.png'){
            data.screenshot = nopic;
        }
        return(
            <div onClick={this.handleDetail} className="event">
                <div className="img"><img src={data.screenshot} alt="event-picture" /></div>
                <h2 className="eventtitle">{data.title}</h2>
                <span className="eventtype">{data.type}</span>
                <div className="eventcountry">{data.city}</div>
                <div className="eventstate">{this.state.eventstate}</div>
                { this.state.showDetail
                ? <EventDetail ref={this.detail} data={data} handleDetail={this.handleDetail}/> 
                : null
                }
                
            </div>
        )
    }
}