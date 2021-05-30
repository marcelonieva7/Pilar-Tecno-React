import React from "react";
import PropTypes from 'prop-types';
import EditModal from "../../components/EditModal/EditModal";
import Loader from "../../components/Loader/Loader"

class AdminCountries extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            toEdit: {
                id: 0,
                name: ""
            }
        }
    }

    addCountry = (e) => {
        e.preventDefault()        
        this.props.addData("countries", e.target.country.value)
    }

    delData = (idToDelete) => {
        this.props.delData(idToDelete, "countries")
    }
    editCountry = (e) => {
        e.preventDefault()
        const field = "name"
        const toEdit = this.state.toEdit
        const type = "countries"

        this.props.edit(e, field, toEdit, type)
    }

    render() {
        const {countries, isLoading} = this.props
        return ( isLoading ? <Loader/> :
            <React.Fragment>
                <form className="form-inline justify-content-center my-4" onSubmit={this.addCountry}>
                    <input className="form-control mx-2 rounded mb-2" name="country" type="text" required placeholder="Ingresar País"/>
                    <button className="btn btn-outline-primary mb-2" type="submit">Agregar</button>
                </form>
                <div className="table-responsive-sm">
                    <table className="table table-striped table-dark table-hover rounded">
                        <thead>
                            <tr>
                            <th scope="col">País</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(countries.length && countries.map(country => <tr key={country.id}>
                                <th scope="row">{country.name}</th>
                                <td><button onClick={()=> {this.setState({toEdit: {id: country.id, name: country.name}})}} type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#editModal">Editar</button></td>
                                <td><button className="btn btn-danger btn-sm" onClick={() =>this.delData(country.id)}>Borrar</button></td>
                            </tr>))
                            || <tr><td><h3>Sin paises</h3></td></tr> }                            
                        </tbody>
                    </table>
                </div>
                <EditModal edit={this.editCountry} title={this.state.toEdit.name} field={"País"}/>
            </React.Fragment>
        )
    }
}

export default AdminCountries;

AdminCountries.propTypes = {
    addData: PropTypes.func,
    delData: PropTypes.func,
    countries: PropTypes.array,
    edit: PropTypes.func,
    isLoading: PropTypes.bool
};