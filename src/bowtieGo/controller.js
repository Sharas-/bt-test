let prefs = fetch("prefs").
    then(resp =>{alert(resp.status); return resp.json()}).
    then(data => alert("prefs: " + data)).
    catch(err => alert(err));
let docs = fetch("partner-doctors.js")
     .then(resp => resp.ok ? resp.json() : Promise.reject(resp))
     .then(data => new Doctors(data))

class Doctors
{
    constructor(docs)
    {
        this._docs = docs;
    }

    get all()
    {
        return this._docs;
    }

    get locations()
    {
        return Array.from(this.all.reduce((acc, doc) => acc.add(doc.location), new Set()));
    }

    byLocation(l)
    {
        return this.all.filter((doc) => doc.location == l);
    }
}

window.bowtieGo = {docsPromise:  docs};


