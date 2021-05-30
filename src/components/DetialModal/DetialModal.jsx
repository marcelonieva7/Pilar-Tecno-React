import PropTypes from 'prop-types';

const DetailModal = ({position, country, place, description, organization}) => {
    return ( 
        <div className="modal fade" id="detailModal" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark">
                <div className="modal-header ">
                    <h5 className="modal-title text-white" id="detailModalLabel">{organization}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span className="text-white" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="card bg-dark">
                    <div className="card-header text-white">
                        {`${place}, ${country}`}
                    </div>
                    <div className="card-body text-white">
                        <h5 className="card-title">{position}</h5>
                        <p className="card-text">{description}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
     );
}
 
export default DetailModal;

DetailModal.propTypes = {
    position: PropTypes.string ,
    country: PropTypes.string ,
    place: PropTypes.string ,
    description: PropTypes.string ,
    organization: PropTypes.string
};