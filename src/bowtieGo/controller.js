"use strict";

const prefsUrl, docsUrl = ["prefs/favourites", "partner-doctors.js"]

let fetchData = url => fetch(url)
    .then(resp => resp.ok ? resp.json() : Promise.reject(resp))

const data = Promise.all([fetchData(prefsUrl), fetchData(docUrl)]);

let _favs;
let _locations;

function _saveFavs()
{
    fetch(prefsUrl, 
        { method: 'PUT', 
          cache: 'no-cache',
          body: JSON.stringify(Array.from(_favs)),
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
}

class Doctors
{
    constructor(docs)
    {
        this._docs = docs;
    }

    isFavourite(doc)
    {
        return _favs.has(doc.id);
    }

    favouriteChanged(doc, isLiked)
    {
        if(isLiked)
            _favs.add(doc.id)
        else
            _favs.delete(doc.id)
        console.log(`saving favs: ${Array.from(_favs)}`);
        _saveFavs();
    }

    get list()
    {
        return this._docs;
    }

    get locations()
    {
        return _locations;
    }

    byLocation(l)
    {
        return new Doctors(this.list.filter((doc) => doc.location == l));
    }
}

const docsInit = data.then(([favs, docs]) => 
{
    _favs = new Set(favs);
    _locations = Array.from(docs.reduce((acc, doc) => acc.add(doc.location), new Set()));
    return new Doctors(docs)
});

window.bowtieGo = {docsPromise: docsInit};
