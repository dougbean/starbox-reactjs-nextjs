function ShowMessage({message}) { 
    return (
      <>
         <div className="container">         
          <div className="row">              
              <div className="col-md-12">              
                    <h3>{message}</h3>   
              </div>
            </div>
        </div>             
      </>
    );
  }

export default ShowMessage  