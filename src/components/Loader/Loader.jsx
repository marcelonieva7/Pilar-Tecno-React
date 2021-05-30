const Loader = () => {
    return ( 
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-light" style={{width: '8rem', height: '8rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
     );
}
 
export default Loader;