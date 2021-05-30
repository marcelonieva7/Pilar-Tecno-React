import PropTypes from 'prop-types';
import React from 'react';

const JobsForm = ({countries, placesOptions, organizationsOptions, newJob, changeData}) => (
    <React.Fragment>
        <h2 className="my-3">Ingresar puesto</h2>
        <form className="my-3" onSubmit={newJob}>
            <div className="form-inline justify-content-around">
                <select className="form-control mx-2 rounded mb-4" id="countryId" defaultValue="" name="countryId" onChange={(e)=>{changeData(e, "places", true)}}>
                    <option value="" >Seleccionar País</option>
                    {(countries.length && (countries.map(country=> <option key={country.id} value={country.id}>{country.name}</option>)))}
                </select>
                <select className="form-control mx-2 rounded mb-4" id="placeId" name="placeId" defaultValue="" onChange={(e)=>{changeData(e, "organizations", false)}}>
                    <option value="" >Seleccionar Ciudad</option>
                    {placesOptions.length && (placesOptions.map(place=> <option key={place.id} value={place.id}>{place.name}</option>))}
                </select>
                <select className="form-control mx-2 rounded mb-4" id="organizationId" name="organizationId" defaultValue="">
                    <option value="" >Seleccionar Empresa</option>
                    {organizationsOptions.length && (organizationsOptions.map(organization=> <option key={organization.id} value={organization.id}>{organization.name}</option>))}
                </select>
                <input className="form-control mx-2 rounded mb-4" placeholder="Posición" id="position" type="text" required/>
            </div>
            <div className="input-group">
                <textarea className="form-control mx-2 rounded" placeholder="Descripción" name="description" type="text" required/>
            </div>
            <div className="align-self-end">
                <button className="btn btn-outline-primary my-3">Agregar</button>
            </div>
        </form>
    </React.Fragment>
);
 
export default JobsForm;

JobsForm.propTypes = {
    countries: PropTypes.array ,
    placesOptions: PropTypes.array ,
    organizationsOptions: PropTypes.array,
    changeData: PropTypes.func ,
    newJob: PropTypes.func
};