import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {TextField, Checkbox} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Regions({options, onSelected})
{
    return(
        <Autocomplete
          id="locations"
          autoHighlight
          options={options}
          onChange={(evt,val,reason) => {if(['select-option', 'clear'].includes(reason)) onSelected(val)}}
          renderInput={(params) => <TextField {...params} label="Regions" variant="outlined" />}
        />
      );
}

function LikeButton({isLiked, onLikeChanged})
{
    const [liked, setLiked] = useState(isLiked)
    return (<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={liked} 
                onChange={(e)=>{setLiked(!liked); onLikeChanged(!liked)}} />)
}

function Prices({list})
{
    return(<div>
            {list.map(p => <div key={Math.random()}>{p.type}&nbsp;{p.amount}</div>)}
        </div>)
}

function Services({list})
{
    return(<div>
            {list.map(s => <div key={Math.random()}>{s.name_en}</div>)}
           </div>)
}

function DoctorsTable({doctors})
{
    return(<TableContainer component={Paper}>
          <Table size="small" aria-label="Doctors">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Favourite</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Prices</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.list.map((doc) => (
                <TableRow key={Math.random()}>
                  <TableCell component="th" scope="row">
                    {doc.name}
                  </TableCell>
                  <TableCell>
                        <LikeButton isLiked={doctors.isFavourite(doc)} onLikeChanged={isLiked => doctors.favouriteChanged(doc, isLiked)} />
                  </TableCell>
                  <TableCell><Services list={doc.services} /></TableCell>
                  <TableCell><Prices list={doc.payment_info} /></TableCell>
                  <TableCell>{doc.address_line_1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>)
}

function App({doctors})
{
    const [location, setRegion] = useState("");
    return(<div>
            <h1>Find doctors by region</h1>
            <Regions onSelected={l => setRegion(l)} options={doctors.regions}/>
            {location &&
                <DoctorsTable doctors={doctors.byLocation(location)}/>
            }
      </div>)
}

bowtieGo.docsPromise.then(docs => ReactDOM.render(<App doctors={docs} />, document.getElementById('content')))
