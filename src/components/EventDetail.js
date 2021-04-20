import React from 'react';
import './EventDetail.css'

export default class EventDetail extends React.Component {

    constructor(props){
        super(props);
        this.detail = React.createRef();

        this.handleAnimation = this.handleAnimation.bind(this);
        this.stopClose = this.stopClose.bind(this)
        
    }
    handleAnimation(){
        const detail = this.detail.current;
        detail.classList.toggle('show');
    }
    stopClose(e){
        e.stopPropagation();
    }
    componentDidMount() {
        setTimeout(function() {
            this.handleAnimation();
        }.bind(this), 10)

    }

    render(){
        return(
            <div>
                <div className="eventdetail">
                    <div onClick={this.stopClose} ref={this.detail} className="detail">
                        <div>{this.props.data.title}</div>
                        <div>{this.props.data.description}</div>
                        <a href={this.props.data.website} target="_blank" rel="noopener noreferrer">To Website</a>
                    </div>
                </div>
            </div>
        )
    }
}