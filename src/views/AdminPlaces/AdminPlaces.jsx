import React from "react";
import PropTypes from 'prop-types';
import EditModal from "../../components/EditModal/EditModal";
import Loader from "../../components/Loader/Loader";

class AdminPlaces extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            toEdit: {
                id: 0,
                countrieId: 0,
                name: ""
            }
        }
    }

    addPlace = (e) => {
        e.preventDefault()
        this.props.addData("places", e.target.place.value, e.target.countryId.value)
    }

    dalPlace = (id) => {
        this.props.delData(id, "places")
    }

    editPlace = (e) => {
        e.preventDefault()
        const field = "name"
        const toEdit = this.state.toEdit
        const type = "places"

        this.props.edit(e, field, toEdit, type)
    }

    findCountry = (countrieId) => {
        // eslint-disable-next-line eqeqeq
        const country = this.props.countries.find(country=> country.id == countrieId)
        return country.name
    }

    render() {
        const {places, countries, isLoading} = this.props
        const {addPlace, dalPlace, editPlace} = this
        return ( 
            isLoading ? <Loader/> :
            <React.Fragment>
                <form className="form-inline justify-content-center my-4" onSubmit={addPlace}>
                    <select className="form-control mx-2 rounded mb-2" defaultValue={""} name="countryId">
                        <option value="" disabled >Seleccionar País</option>
                        {(countries.length && (countries.map(country=> <option key={country.id} value={country.id}>{country.name}</option>)))}
                    </select>
                    <input className="form-control mx-2 rounded mb-2" id="place" name="place" type="text" required placeholder="Ingresar Ciudad"/>
                    <button className="btn btn-outline-primary mb-2" type="submit">Agregar</button>
                </form>
                <div className="table-responsive-sm">
                    <table className="table table-striped table-dark table-hover rounded">
                        <thead>
                            <tr>
                            <th scope="col">Ciudad</th>
                            <th scope="col">País</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(places.length && places.map(place => <tr key={place.id}>
                                <th scope="row">{place.name}</th>
                                <td>{this.findCountry(place.countrieId)}</td>
                                <td><button onClick={()=> {this.setState({toEdit: {id: place.id, name: place.name, countrieId: place.countrieId}})}} type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#editModal">Editar</button></td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => dalPlace(place.id)}>Borrar</button></td>
                            </tr>))
                            || <tr><td><h3>Sin ciudades</h3></td></tr> }                            
                        </tbody>
                    </table>
                </div>
                <EditModal edit={editPlace} title={this.state.toEdit.name} field={"Ciudad"} countries={countries}/>
            </React.Fragment>
        )
    }
}
export default AdminPlaces;

AdminPlaces.propTypes = {
    addData: PropTypes.func,
    delData: PropTypes.func,
    countries: PropTypes.array,
    places: PropTypes.array,
    edit: PropTypes.func,
    isLoading: PropTypes.bool
};