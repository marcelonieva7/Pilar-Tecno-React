const Job =({job, deleteJob})=> {
    const {position, company, country, city, id} = job    
    return (   
        <div className="d-flex w-75 justify-content-between align-items-center rounded bg-dark my-3 p-4">
            <p className="m-0">{position}</p><p className="m-0">{company}</p><p className="m-0">{country}</p><p className="m-0">{city}</p><button className="btn btn-danger btn-sm" onClick={()=> deleteJob(id)}>Borrar</button>
        </div>    
    )
}

export default Job