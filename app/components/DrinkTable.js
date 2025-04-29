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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  export default DrinkTable