import React , {useEffect} from 'react';
import Event from './Event.js';

let Search = (props) => {
    let years = [];
    for(let x = 2018; x <= new Date().getFullYear() ; x++){
        years[years.length] = x;
    }
    return(
        <div>
            <div><input id="title" type="text" onChange={(val) => props.filterTitle(val.target)} /></div>
            <div className="selectcountry">
                <label for="countries">Choose a country:</label>
                <select name="countries" id="countries" onChange={(val) => props.filterCountry(val.target)}>
                    {
                        props.countries.map((country) =>
                            <option key={country.code} value={country.code}>{country.country}</option>
                        )
                    }
                </select>
            </div>
            <div className="eventtypes">
                <label for="eventtypes">Choose an event type:</label>
                <select name="eventtypes" id="eventtypes" onChange={(val) => props.filterType(val.target)}>
                    <option value=""></option>
                    {
                        props.eventtypes.map((type) =>
                            <option key={type} value={type}>{type}</option>
                        )
                    }
                </select>
            </div>
            <div className="eventyear">
                <label for="eventyear">Choose an event state:</label>
                <select name="eventyear" id="eventyear" onChange={(val) => props.filterYear(val.target)}>
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

function EventList (props){
    const [events, setEvents] = React.useState(props.data);
    const [sorted, setSorted] = React.useState([]);
    const [today, setToday] = React.useState("");
   
    const [stitle, setSTitle] = React.useState("");
    const [scountry, setSCountry] = React.useState("");
    const [stype, setSType] = React.useState("");
    const [syear, setSYear] = React.useState("");
    const [sort, setSort] = React.useState([]);
    
    const handleSTitle = event => {
      setSTitle(event.value);
    };
    const handleSCountry = event => {
      setSCountry(event.value);
    };
    const handleSType = event => {
      setSType(event.value);
    };
    const handleSYear = event => {
      setSYear(event.value);
    };
    useEffect(() => {
      const d = new Date();
      setToday(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate());
      
      console.log("Mounted EventList"); 
    }, []);
  
     useEffect(() => {
      let sortbis = [];
      setEvents(props.data)
      console.log(events)
      let filteredresult = events;
      if(stitle.length > 0){
        filteredresult = filteredresult.filter(event =>
          event.title.toLowerCase().includes(stitle.toLowerCase())
        );
      }
      if(scountry.length > 0){
        filteredresult = filteredresult.filter(event =>
          event.country.toLowerCase() === scountry.toLowerCase()
        );
        sortbis[0] = scountry;
      } else {
        sortbis[0] = 0
      }
      if(stype.length > 0){
        filteredresult = filteredresult.filter(event =>
          event.type.toLowerCase() === stype.toLowerCase()
        );
        sortbis[1] = stype;
      } else {
        sortbis[1] = 0
      }
      if(syear.length > 0){
        filteredresult = filteredresult.filter(event =>
          event.start_date.split('-')[0] === syear
        );
        sortbis[2] = scountry;
      } else {
        sortbis[2] = 0
      }
      setSort(sortbis);
      setSorted(filteredresult);
    }, [stitle , scountry , stype , syear , props.data, events]);
    
    return(
      <div>

        {console.log(props)}
        <Search  
          countries = {props.countries}
          eventtypes = {props.eventtypes}
          filterTitle = {handleSTitle}
          filterCountry = {handleSCountry}
          filterType = {handleSType}
          filterYear = {handleSYear}
        />
        {
          
          sorted.map((data) =>
            <div key={data.title}>
              <Event data={data} day={today} />
            </div>
            )
        }
        
        <div onClick={() => {props.getMoreData(sort[0],sort[1],sort[2])}}>More Events</div>
        
      </div>
    )
}
export default EventList;