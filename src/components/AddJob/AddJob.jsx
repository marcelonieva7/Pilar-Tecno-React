import React from "react"
import { Job } from "../Job/Job";

export class AddJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [
                {
                    position: "Junior Frontend Dev",
                    company: "Ualá",
                    country: "Argentina",
                    city: "La Rioja",
                    id: 1
                }
            ]
        }
    }

    newJob = (e) => {
        e.preventDefault()

        const {position, company, country, city} = e.target
                
        const checkEmpty = (str) => (str.trim() !== "") && (str.trim() !== undefined)

        if (checkEmpty(position.value) && checkEmpty(company.value) && checkEmpty(country.value) && checkEmpty(city.value)) {
            let lastPost = this.state.jobs.slice(-1).pop()

            lastPost === undefined && (lastPost = {id: 0})

            const addNewJob = {
                position: position.value,
                company: company.value,
                country: country.value,
                city: city.value,
                id: lastPost.id + 1
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
        const {jobs} = this.state
        return ( 
            <div className="container mt-5">
            <form className="my-3 d-flex flex-column" onSubmit={this.newJob}>
                <h2>Ingresar puesto</h2>
                <div className="input-group py-4">
                    <input className="form-control mx-2 rounded" placeholder="Posición"  id="position" type="text" required/>
                    <input className="form-control mx-2 rounded" placeholder="Empresa" id="company" type="text" required/>
                    <input className="form-control mx-2 rounded" placeholder="Pais" id="country" type="text" required/>
                    <input className="form-control mx-2 rounded" placeholder="Ciudad" id="city" type="text" required/>
                </div>
                <div className="align-self-end">
                    <button className="btn btn-outline-primary">Agregar</button>
                </div>
            </form>
            <h3 className="mt-5">Posiociones</h3>
            <div className="m-4 p-3 d-flex flex-column align-items-center">{jobs.map(job => (<Job key={job.id} job={job} deleteJob={this.deleteJob}></Job>))}</div>
            </div>
        )
    }
}