import DrinkRow from "./DrinkRow";

const DrinkTable = ({ drinks }) => {
    const rows = []; 
   
    drinks.forEach((drink) => {      
      rows.push(
        <DrinkRow
          drink={drink}
          key={drink.id}              
          />
      );    
    });
    return (
      <>
        <div className="container"> 
          <div className="row">              
            <div className="col-md-12">
              <h2>Order</h2>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </>
    );
  }

  export default DrinkTable