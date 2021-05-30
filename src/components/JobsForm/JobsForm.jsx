const JobsForm = ({countries, citiesOptions, companiesOptions, newJob, changeCoutry, changeCity}) => (
    <form className="my-3 d-flex flex-column" onSubmit={newJob}>
        <h2>Ingresar puesto</h2>
        <div className="input-group py-4 form-row">
            <select className="form-control mx-2 rounded" id="country" defaultValue="" name="country" onChange={changeCoutry}>
                <option value="" >Seleccionar País</option>
                {(countries.length && (countries.map(country=> <option key={country} value={country}>{country}</option>)))}
            </select>
            <select className="form-control mx-2 rounded" id="city" name="cities" defaultValue="" onChange={changeCity}>
                <option value="" >Seleccionar Ciudad</option>
                {citiesOptions.length && (citiesOptions.map(city=> <option key={city.city} value={city.city}>{city.city}</option>))}
            </select>
            <select className="form-control mx-2 rounded" id="company" name="company" defaultValue="">
                <option value="" >Seleccionar Empresa</option>
                {companiesOptions.length && (companiesOptions.map(company=> <option key={company.company} value={company.company}>{company.company}</option>))}
            </select>
            <input className="form-control mx-2 rounded" placeholder="Posición"  id="position" type="text" required/>
        </div>
        <div className="align-self-end">
            <button className="btn btn-outline-primary">Agregar</button>
        </div>
    </form>
);
 
export default JobsForm;