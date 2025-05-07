import IngredientRow from "./IngredientRow";

const IngredientTable = ({ ingredients, handleClick }) => {
    const rows = []; 
   
    ingredients.forEach((ingredient) => {                
        rows.push(
          <IngredientRow
              ingredient={ingredient}
              key={ingredient.id}  
              handleClick={handleClick}            
              />
        );
      });
      
      return (
        <>
         <div className="container">  
            <div className="row">              
              <div className="col-md-12">
                <h2>Ingredients</h2>
              </div>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>UnitCost</th>
                    <th>Amount</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
          </div>
        </>
      );
  }

  export default IngredientTable