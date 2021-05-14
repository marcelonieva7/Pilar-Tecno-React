import React from "react";

const AdminCountry = ({addCountry, delCountry, countries }) => (
    <React.Fragment>
        <form className="form-inline justify-content-center" onSubmit={addCountry}><input className="form-control mx-2 rounded" id="inp" type="text" required placeholder="Ingresar País"/><button className="btn btn-outline-primary" type="submit">Agregar</button></form>
        <ul>{countries.map(country => <li key={country}><h3>{country}</h3><button className="btn btn-danger btn-sm" onClick={() =>delCountry(country)}>Borrar</button></li>)}</ul>
    </React.Fragment>
)

export default AdminCountry;