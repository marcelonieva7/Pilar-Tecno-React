import React, { Component } from "react";

class AdminCompanies extends Component {
    constructor() {
        super()
        this.state = {
            citiesOptions: []
        }
    }

    addCompanies = (e) => {
        this.props.addCompanies(e)
    }
    delCompany = (companyToDelete) => {
        this.props.delCompany(companyToDelete)
    }

    changeCoutry = (e) => {
        const {cities} = this.props;
        const {target:selectCountry} = e;
        const filterCities = cities.filter(city => city.country === selectCountry.value)
        this.setState({citiesOptions: filterCities})        
    }

    render() {
        const {countries, companies} = this.props;
        const {citiesOptions:cities} = this.state;
        return (
            <React.Fragment>
                <form className="form-inline justify-content-center" onSubmit={this.addCompanies}>
                    <select className="form-control mx-2 rounded" onChange={this.changeCoutry} defaultValue="" name="countries">
                        <option value="" disabled >Selecccionar País</option>
                        {(countries.length && (countries.map(country => <option key={country} value={country}>{country}</option>)))}
                    </select>
                    <select className="form-control mx-2 rounded" name="cities" defaultValue="">
                        <option value="" disabled>Seleccionar Ciudad</option>
                        {cities.length && (cities.map(city=> <option key={city.city} value={city.city}>{city.city}</option>))}
                    </select>
                    <input className="form-control mx-2 rounded" id="inp" type="text" required/>
                    <button className="btn btn-outline-primary" type="submit">Agregar</button>
                </form>
                <ul>{(companies.length && companies.map(company => <li key={company.company}><h3>{company.company}</h3><button className="btn btn-danger btn-sm" onClick={() =>this.delCompany(company.company)}>Borrar</button></li>)) || <h2>sin empresas</h2>}</ul>
            </React.Fragment>
        );
    }
}
 
export default AdminCompanies;