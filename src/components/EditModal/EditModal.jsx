import PropTypes from 'prop-types';

const EditModal = ({title, edit, field, countries}) => {
    return ( 
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark">
                <div className="modal-header ">
                    <h5 className="modal-title text-white" id="editModalLabel">{`Editar ${field}`}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span className="text-white" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={edit} className="modal-body">
                    <h5 className="text-white ml-2">{title}</h5>
                    <div className="input-group mt-3">
                        <textarea className="form-control mx-2 rounded" placeholder="Nuevo valor" name="description" type="text" required/>
                    </div>
                    {countries && <h5 className="text-white ml-2 mt-3">País</h5>}
                    <div className="input-group mt-3">
                        {countries &&
                        <select className="form-control mx-2 rounded"name="countryId" id="countryId">
                            {(countries.length && (countries.map(country=> <option key={country.id} value={country.id}>{country.name}</option>)))}
                        </select>}
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Guardar</button>
                </form>
                </div>
            </div>
        </div>
     );
}
 
export default EditModal;

EditModal.propTypes = {
    title: PropTypes.string,
    field: PropTypes.string,
    edit: PropTypes.func,
    countries: PropTypes.array
};