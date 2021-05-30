import { Link } from 'react-router-dom'

export const NavBar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <Link to={"/"} className="navbar-brand">Jobs List</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse flex-lg-{grow|shrink}-0" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link to={"/admin/countries"} className="nav-link">Paises</Link>
            </li>
            <li className="nav-item">
                <Link to={"/admin/cities"} className="nav-link">Ciudades</Link>
            </li>
            <li className="nav-item">
                <Link to={"/admin/companies"} className="nav-link">Empresas</Link>
            </li>
            </ul>
        </div>
    </nav>
)