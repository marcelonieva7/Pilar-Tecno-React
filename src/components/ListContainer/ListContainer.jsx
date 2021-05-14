import React from "react";
import {AddJob} from '../../views/AddJob/AddJob.jsx'
import AdminCities from "../../views/AdminCities/AdminCities";
import AdminCompanies from "../../views/AdminCompanies/AdminCompanies";
import AdminCountry from "../../views/AdminCountry/AdminCountry"
import checkEmpty from "../../utils/checkEmpty/checkEmpty";
import { Redirect } from "react-router-dom";

class ListContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            countries: [],
            cities: [],
            companies: [],
            jobs: []
        }
    }
    componentDidMount() {
        const localData = JSON.parse(localStorage.getItem('data'))
        localData && this.setState(localData)
    }
    componentDidUpdate(prevProps, prevState) {
        this.state !== prevState && localStorage.setItem("data", JSON.stringify(this.state))
    }

    addCountry = (e) => {
        e.preventDefault()
        const {0:country} = e.target
        if (checkEmpty(country.value)) {
            const newCountries = [...this.state.countries, country.value]
            this.setState({countries: newCountries})
        }
        else {
            alert("Completa todos los campos")
        }
    }

    delCountry = (countryToDelete) => {
        const filterCountries = this.state.countries.filter(country => country !== countryToDelete)
        this.setState({countries: filterCountries})
        
    }

    addCity = (e) => {
        e.preventDefault()
        const {0:country, 1:city} = e.target
        if (checkEmpty(country.value, city.value)) {
            const newcity = {country: country.value, city: city.value}
            const newCities = [...this.state.cities, newcity]
            this.setState({cities: newCities})
        }
        else {
            alert("Completa todos los campos")
        }
    }

    delCity = (cityToDelete) => {
        const filterCities = this.state.cities.filter(city => city.city !== cityToDelete)
        this.setState({cities: filterCities})
    }

    addCompanies = (e) => {
        e.preventDefault()
        const {0:country, 1:city, 2:company} = e.target
        if (checkEmpty(country.value, city.value, company.value)) {
            const newCompany = {country: country.value, city: city.value, company: company.value}
            const newCompanies = [...this.state.companies, newCompany]
            this.setState({companies: newCompanies})
        }
        else {
            alert("Completa todos los campos")
        }
    }

    delCompany = (companyToDelete) => {
        const filterCompanies = this.state.companies.filter(company => company.company !== companyToDelete)
        this.setState({companies: filterCompanies})
    }

    newJob = (e) => {
        e.preventDefault()

        const {position, company, country, city} = e.target

        if (checkEmpty(position.value) && checkEmpty(company.value) && checkEmpty(country.value) && checkEmpty(city.value)) {
            let lastJob = this.state.jobs.slice(-1).pop()

            lastJob === undefined && (lastJob = {id: 0})

            const addNewJob = {
                position: position.value,
                company: company.value,
                country: country.value,
                city: city.value,
                id: lastJob.id + 1
            }

            const allJobs = [...this.state.jobs, addNewJob]

            this.setState({jobs: allJobs})
        }
        else {
            alert("Completa todos los campos")
        }
    }
    deleteJob = (key) => {
        let allJobs = this.state.jobs.filter(job => job.id !== key)
        this.setState({jobs: allJobs})
    }
    
    render() { 
        const {id} = this.props.match.params;
        const {path} = this.props.match;
        if (path === "/") {
            return <AddJob data={this.state} newJob={this.newJob} deleteJob={this.deleteJob}/>
        }
        else if (id === "countries") {
            return (
                <AdminCountry countries={this.state.countries} addCountry={this.addCountry} delCountry={this.delCountry}/>
            );
        }
        else if (id === "cities") {
            return (
                <AdminCities countries={this.state.countries} cities={this.state.cities} addCity={this.addCity} delCity={this.delCity}/>
            )
        }
        else if (id === "companies") {
            return <AdminCompanies countries={this.state.countries} cities={this.state.cities} companies={this.state.companies} addCompanies={this.addCompanies} delCompany={this.delCompany}/>
        }
        else {
            return <Redirect to={"/"}/>
        }
    }
}
 
export default ListContainer;