import axios from "axios";
import PropTypes from 'prop-types';
import React from "react";
import $ from "jquery";
import checkEmpty from "../../utils/checkEmpty/checkEmpty";
import AdminJobs from "../AdminJobs/AdminJobs";
import AdminCountries from "../AdminCountries/AdminCountries";
import AdminPlaces from "../AdminPlaces/AdminPlaces";
import AdminOrganizations from "../AdminOrganizations/AdminOrganizations";

class AdminContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            places: [],
            organizations: [],
            jobs: [],
            isLoading: true
        }
    }

    componentDidMount() {
        axios.get(`https://api-fake-pilar-tecno.herokuapp.com/db`)
            .then(resp => {
                const getData = resp.data;                
                this.setState(getData)
                this.setState({isLoading: false})
            })
            .catch(err => {
                alert(`Ocurrio un error ${err}`)
            })
    }

    addData = async (type, ...values) => {
        try {
            const dicc = {
                "places": "countrie",
                "organizations": "place",
                "jobs": "organization"
            }

            const id = `${dicc[type]}Id`

            if (checkEmpty(...values)) {
                this.setState({isLoading: true})
                const dataToAdd = type === "countries" ? {"name": values[0]} : ( type === "jobs" ? {"position": values[0], [id]: Number(values[1]), "description": values[2]} :{"name": values[0], [id]: Number(values[1])})
                
                const resp = await axios.post(`https://api-fake-pilar-tecno.herokuapp.com/${type}`, dataToAdd)
                
                const newData = [...this.state[type], resp.data]
                this.setState({[type]: newData})
                this.setState({isLoading: false})
            }
            else {
                alert("Completa todos los campos")
            }
        }
        catch(err) {
            alert(`Ocurrio un error ${err}`)
        } 

    }

    delData = async (idToDelete, type) => {
        try {
            this.setState({isLoading: true})
            const id = Number(idToDelete)
            await axios.delete(`https://api-fake-pilar-tecno.herokuapp.com/${type}/${id}`)
            const newData = this.state[type].filter(filt => filt.id !== id)
            this.setState({[type]: newData})
            this.setState({isLoading: false})
        }
        catch(err) {
            alert(`Ocurrio un error ${err}`)
        }
    }

    edit = async (e, field, toEdit, type) => {
        try {
            e.preventDefault()
            const {value} = e.target.description
            const {id} = toEdit
            const body = type === "places" ? {[field]: value, "countrieId": e.target.countryId.value} : {[field]: value}
            const dataToUpdate = this.state[type]        

            if (checkEmpty(value)) {
                const resp = await axios.patch(`https://api-fake-pilar-tecno.herokuapp.com/${type}/${id}`, body)
                
                const indexToUpdate = dataToUpdate.findIndex(job=> job.id === id)
                dataToUpdate[indexToUpdate] = resp.data
                this.setState({[type]: dataToUpdate})

                $("#editModal").modal('hide')
            }
            else {
                alert("Completa todos los campos")
            }
        }
        catch(err) {
            alert(`Ocurrio un error ${err}`)
        }
    }
    
    render() {
        const {countries, places, organizations, jobs, isLoading} = this.state
        const {path} = this.props.match

        const dicc = {
            "/": <AdminJobs countries={countries} places={places} organizations={organizations} jobs={jobs} addData={this.addData} delData={this.delData} edit={this.edit} isLoading={isLoading}/>,
            "/countries": <AdminCountries countries={countries} addData={this.addData} delData={this.delData} edit={this.edit} isLoading={isLoading}/>,
            "/places": <AdminPlaces countries={countries} places={places} addData={this.addData} delData={this.delData} edit={this.edit} isLoading={isLoading}/>,
            "/organizations": <AdminOrganizations countries={countries} places={places} organizations={organizations} addData={this.addData} delData={this.delData} edit={this.edit} isLoading={isLoading}/>
        }
        return  dicc[path]
    }
}
 
export default AdminContainer;

AdminContainer.propTypes = {
    path: PropTypes.object
};