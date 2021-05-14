import React from "react";

const AdminCities = ({addCity, delCity, cities, countries}) => (
    <React.Fragment>
        <form className="form-inline justify-content-center" onSubmit={addCity}>
            <select className="form-control mx-2 rounded" defaultValue={""} name="country">
                <option value="" disabled >Seleccionar País</option>
                {(countries.length && (countries.map(country=> <option key={country} value={country}>{country}</option>)))}
            </select>
            <input className="form-control mx-2 rounded" id="addCity" type="text" required placeholder="Ingresar Ciudad"/>
            <button className="btn btn-outline-primary" type="submit">Agregar</button>
        </form>
        <ul>{(cities.length && cities.map(city => <li key={city.city}><h3>{city.city}</h3><button className="btn btn-danger btn-sm" onClick={() =>delCity(city.city)}>Borrar</button></li>)) || <h2>Sin ciudades</h2>}</ul>
    </React.Fragment>
)
 
export default AdminCities;