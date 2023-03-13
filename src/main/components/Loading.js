
const Loading = () => {
    return (
        //spinner-border
        <div className='container'>
            <div className="row position-absolute top-50 start-50 translate-middle">
                <div className="col-4">
                    <div className="spinner-grow" role="status" >
                        <span className="visually-hidden">Loadin...</span>
                    </div>
                </div>
                <div className="col-4">
                    <div className="spinner-grow" role="status" >
                        <span className="visually-hidden">Loadin...</span>
                    </div>
                </div>
                <div className="col-4">
                    <div className="spinner-grow" role="status" >
                        <span className="visually-hidden">Loadin...</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Loading
