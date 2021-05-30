import React from "react";
import PropTypes from 'prop-types';
import JobsForm from "../../components/JobsForm/JobsForm.jsx";
import EditModal from "../../components/EditModal/EditModal.jsx";
import DetailModal from "../../components/DetialModal/DetialModal.jsx";
import Loader from "../../components/Loader/Loader.jsx";

class AdminJobs extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            placesOptions: [],
            organizationsOptions: [] ,
            toEdit: {
                id: 0,
                position: ""
            },
            details: {
                position: "",
                description: "",
                country: "",
                place: "",
                organization: ""
            }
        }
    }

    newJob = (e) => {
        e.preventDefault()
        const {position, organizationId, description} = e.target
        this.props.addData("jobs", position.value, organizationId.value, description.value)
    }

    deleteJob = (id) => {
        this.props.delData(id, "jobs")
    }

    changeData = (e, subType, wipe) => {
        const dictionary = {
            "places": "countrieId",
            "organizations": "placeId"
        }

        const subTypeId = dictionary[subType]
        const subTypeOptions = `${subType}Options`

        const data = this.props[subType]
        const {value} = e.target
        // eslint-disable-next-line eqeqeq
        const filterData = data.filter(dat => dat[subTypeId] == Number(value))

        this.setState({[subTypeOptions]: filterData})
        wipe && this.setState({organizationsOptions: []})
    }

    showDetail = (description, position, organizationId) => {
        const {organizations, places, countries} = this.props
        // eslint-disable-next-line eqeqeq
        const findOrg = organizations.find(org=> org.id == organizationId) || {name: "Organización no encontrada"}
        // eslint-disable-next-line eqeqeq
        const findPlace = places.find(place=> place.id == findOrg.placeId) || {name: "Ciudad no encontrada"}
        // eslint-disable-next-line eqeqeq
        const findCountry = countries.find(country=> country.id == findPlace.countrieId)  || {name: "País no encontrado"}
        this.setState({details: {position: position, description: description, organization: findOrg.name, country: findCountry.name, place: findPlace.name}})
    }    

    edit = (e) => {
        const field = "description"
        const toEdit = this.state.toEdit
        const type = "jobs"

        this.props.edit(e, field, toEdit, type)
    }
    
    render() {
        const {jobs, countries, isLoading} = this.props
        const {placesOptions, organizationsOptions} = this.state
        const {country, place, organization, position, description} = this.state.details
        return ( isLoading ? <Loader/> :
            <React.Fragment>
                <JobsForm countries={countries} placesOptions={placesOptions} organizationsOptions={organizationsOptions} changeData={this.changeData} newJob={this.newJob}/>
                <div className="table-responsive-sm">
                    <table className="table table-striped table-dark table-hover rounded">
                        <thead>
                            <tr>
                            <th scope="col">Posición</th>
                            <th className="text-center" scope="col">Descripción</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(jobs.length && jobs.map(job => <tr key={job.id}>
                                <th scope="row" >{job.position}</th>
                                <td className="text-center"><button onClick={()=> {this.showDetail(job.description, job.position, job.organizationId)}} type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#detailModal">...</button></td>
                                <td><button onClick={()=> {this.setState({toEdit: {id: job.id, position: job.position}})}} type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#editModal">Editar</button></td>
                                <td><button className="btn btn-danger btn-sm" onClick={()=> {this.deleteJob(job.id)}}>Borrar</button></td>
                            </tr>))
                            || <tr><td><h3>Sin trabajos</h3></td></tr> }                            
                        </tbody>
                    </table>
                </div>
                <EditModal edit={this.edit} title={this.state.toEdit.position} field={"Posición"}/>
                <DetailModal country={country} place={place} organization={organization} position={position} description={description} />
            </React.Fragment>
        )
    }
}
 
export default AdminJobs;

AdminJobs.propTypes = {
    addData: PropTypes.func,
    delData: PropTypes.func,
    countries: PropTypes.array,
    jobs: PropTypes.array,
    places: PropTypes.array,
    organizations: PropTypes.array,
    edit: PropTypes.func,
    isLoading: PropTypes.bool
};