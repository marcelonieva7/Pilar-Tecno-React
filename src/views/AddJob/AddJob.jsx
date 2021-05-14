import React from "react"
import Job from "../../components/Job/Job";
import JobsForm from "../../components/JobsForm/JobsForm";

export class AddJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            citiesOptions: [],
            companiesOptions: []
        }
    }
    
    newJob = (e) => {
        this.props.newJob(e)
    }

    deleteJob = (key) => {
        this.props.deleteJob(key)
    }

    changeCoutry = (e) => {
        const {cities} = this.props.data;
        const {target:selectCountry} = e;
        const filterCities = cities.filter(city => city.country === selectCountry.value)
        this.setState({citiesOptions: filterCities})
        this.setState({companiesOptions: []})
    }

    changeCity = (e) => {
        const {companies} = this.props.data;
        const {target:selectCity} = e;
        const filterCompanies = companies.filter(company => company.city === selectCity.value)
        this.setState({companiesOptions: filterCompanies})        
    }

    render() {
        const {jobs, countries} = this.props.data
        const {citiesOptions, companiesOptions} = this.state
        return ( 
            <React.Fragment>
                <JobsForm countries={countries} citiesOptions={citiesOptions} companiesOptions={companiesOptions} changeCity={this.changeCity} changeCoutry={this.changeCoutry} newJob={this.newJob}/>
                <h3 className="mt-5">Posiociones</h3>
                <div className="m-4 p-3 d-flex flex-column align-items-center">{jobs.map(job => (<Job key={job.id} job={job} deleteJob={this.deleteJob}></Job>))}</div>
            </React.Fragment>
        )
    }
}