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
     {/*  <table className="table table-striped">      
        <tbody>
        <tr>
          <td>{message}</td>      
        </tr>
        </tbody>
      </table> */}
      </>
    );
  }

export default ShowMessage  