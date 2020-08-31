import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function Location({options, onSelected})
{
    return(
        <Autocomplete
          id="locations"
          autoHighlight
          options={options}
          onChange={(evt,val,reason) => {if(['select-option', 'clear'].includes(reason)) onSelected(val)}}
          renderInput={(params) => <TextField {...params} label="Location" variant="outlined" />}
        />
      );
}

function Doctor({doc})
{
    return(
        <div className="doctor">
            <span className="name">{doc.name}</span>
            <span className="id">{doc.id}</span>
            <span className="location">{doc.location}</span>
        </div>)
}

function DoctorsList({doctors})
{
    return (
        <form action="bowtieGo/favourites">
            <label htmlFor="doctorsList">{doctors.length}: doctors</label>
            <ul id="doctorsList">
                {doctors.map(doc => <li key={doc.id}><Doctor doc={doc}/></li>)}
            </ul>
        </form>)
}

function App({doctors})
{
    const [location, setLocation] = useState("");
    return(<div>
            <h1>Find doctors by location</h1>
            <Location onSelected={l => setLocation(l)} options={doctors.locations}/>
            {location &&
                <DoctorsList doctors={doctors.byLocation(location)}/>
            }
      </div>)
}

//doctors.docsPromise.then(docs => alert(docs.all.length))
bowtieGo.docsPromise.then(docs => ReactDOM.render(<App doctors={docs} />, document.getElementById('content')))
//doctors.docsPromise.then(docs => alert(Array.from(docs.byLocation(Array.from(docs.locations)[3])).map(doc => JSON.stringify(doc))))
//ReactDOM.render(TestSearch(tests), document.getElementById('testSearch'));

