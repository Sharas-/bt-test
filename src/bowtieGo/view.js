import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {TextField, Checkbox} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Favorite, FavoriteBorder} from '@material-ui/icons';

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
            <span className="name">{doc.name}</span>&nbsp;
            <span className="id">{doc.id}</span>&nbsp;
            <span className="location">{doc.location}</span>
        </div>)
}

function LikeButton({isLiked, onLikeChanged})
{
    const [liked, setLiked] = useState(isLiked)
    return (<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={liked} 
                onChange={(e)=>{setLiked(!liked); onLikeChanged(!liked)}} />)
}

function DoctorsList({doctors})
{
    return (
        <figure>
            <figcaption>{doctors.list.length}&nbsp;doctors</figcaption>
            <ul id="doctorsList">
                {doctors.list.map(doc => 
                    <li key={Math.random()}>
                        <Doctor doc={doc} /> 
                        <LikeButton isLiked={doctors.isFavourite(doc)} onLikeChanged={isLiked => doctors.favouriteChanged(doc, isLiked)} />
                    </li>)}
            </ul>
        </figure>)
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

bowtieGo.docsPromise.then(docs => ReactDOM.render(<App doctors={docs} />, document.getElementById('content')))
