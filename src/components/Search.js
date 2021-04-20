/*import React from 'react';

export default class Search extends React.Component{
    render(){
        let years = [];
        for(let x = 2018; x <= new Date().getFullYear() ; x++){
            years[years.length] = x;
        }
        return(
            <div>
                <div><input id="title" type="text" onChange={(val) => this.props.filtering(val.target)} /></div>
                <div className="selectcountry">
                    <label for="countries">Choose a country:</label>
                    <select name="countries" id="countries" onChange={(val) => this.props.filtering(val.target)}>
                        {
                            this.props.countries.map((country) =>
                                <option key={country.code} value={country.code}>{country.country}</option>
                            )
                        }
                    </select>
                </div>
                <div className="eventtypes">
                    <label for="eventtypes">Choose an event type:</label>
                    <select name="eventtypes" id="eventtypes" onChange={(val) => this.props.filtering(val.target)}>
                        <option value=""></option>
                        {
                            this.props.eventtypes.map((type) =>
                                <option key={type} value={type}>{type}</option>
                            )
                        }
                    </select>
                </div>
                <div className="eventyear">
                    <label for="eventyear">Choose an event state:</label>
                    <select name="eventyear" id="eventyear" onChange={(val) => this.props.filtering(val.target)}>
                        <option value=""></option>
                        {
                            years.map((year) =>
                            <option key={year} value={year}>{year}</option>
                        )
                        }
                        

                    </select>
                </div>
            </div>
        )
    }
} */