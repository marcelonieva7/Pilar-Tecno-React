import React, { Component } from "react";
import PropTypes from 'prop-types';
import EditModal from "../../components/EditModal/EditModal";
import Loader from "../../components/Loader/Loader";

class AdminOrganizations extends Component {
    constructor() {
        super()
        this.state = {
            placesOptions: [],
            toEdit: {
                id: 0,
                name: ""
            }
        }
    }

    addOrg = (e) => {
        e.preventDefault()
        const {organization, placeId} = e.target
        this.props.addData("organizations", organization.value, placeId.value)
    }

    delOrg = (organizationId) => {
        this.props.delData(organizationId, "organizations")
    }

    editOrg = (e) => {
        e.preventDefault()
        const field = "name"
        const toEdit = this.state.toEdit
        const type = "organizations"

        this.props.edit(e, field, toEdit, type)        
    }

    changeCoutry = (e) => {
        const {places} = this.props;
        const {target:selectCountryId} = e;
        // eslint-disable-next-line eqeqeq
        const filterPlaces = places.filter(place => place.countrieId == Number(selectCountryId.value))
        this.setState({placesOptions: filterPlaces})        
    }

    findPlace = (placeId) => {
        // eslint-disable-next-line eqeqeq
        const place = this.props.places.find(place=> place.id == placeId)
        return place.name
    }

    findCountry = (placeId) => {
        // eslint-disable-next-line eqeqeq
        const place = this.props.places.find(place=> place.id == placeId)
        
        // eslint-disable-next-line eqeqeq
        const country = this.props.countries.find(country=> country.id == place.countrieId)
        return country.name
    }

    render() {
        const {countries, organizations, isLoading} = this.props
        const {placesOptions} = this.state
        return ( isLoading ? <Loader/> :
            <React.Fragment>
                <form className="form-inline justify-content-center my-4" onSubmit={this.addOrg}>
                    <select className="form-control mx-2 rounded mb-2" onChange={this.changeCoutry} defaultValue="" name="countries">
                        <option value="" disabled >Selecccionar País</option>
                        {(countries.length && (countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)))}
                    </select>
                    <select className="form-control mx-2 rounded mb-2" name="placeId" defaultValue="">
                        <option value="" disabled>Seleccionar Ciudad</option>
                        {placesOptions.length && (placesOptions.map(place=> <option key={place.id} value={place.id}>{place.name}</option>))}
                    </select>
                    <input className="form-control mx-2 rounded mb-2" name="organization" type="text" placeholder="Ingresar Empresa" required/>
                    <button className="btn btn-outline-primary mb-2" type="submit">Agregar</button>
                </form>
                <div className="table-responsive-sm">
                    <table className="table table-striped table-dark table-hover rounded">
                        <thead>
                            <tr>
                            <th scope="col">Empresa</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">País</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(organizations.length && organizations.map(organization => <tr key={organization.id}>
                                <th scope="row">{organization.name}</th>
                                <td>{this.findPlace(organization.placeId)}</td>
                                <td>{this.findCountry(organization.placeId)}</td>
                                <td><button onClick={()=> {this.setState({toEdit: {id: organization.id, name: organization.name}})}} type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#editModal">Editar</button></td>
                                <td><button className="btn btn-danger btn-sm" onClick={()=> {this.delOrg(organization.id)}}>Borrar</button></td>
                            </tr>))
                            || <tr><td><h3>Sin empresas</h3></td></tr> }                            
                        </tbody>
                    </table>
                </div>
                <EditModal edit={this.editOrg} title={this.state.toEdit.name} field={"Empresa"}/>
            </React.Fragment>
        );
    }
}
 
export default AdminOrganizations;

AdminOrganizations.propTypes = {
    addData: PropTypes.func,
    delData: PropTypes.func,
    countries: PropTypes.array,
    places: PropTypes.array,
    organizations: PropTypes.array,
    edit: PropTypes.func,
    isLoading: PropTypes.bool
};