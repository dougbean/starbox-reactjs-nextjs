import IngredientRow from "./IngredientRow";

const IngredientTable = ({ ingredients, handleClick }) => {
    const rows = []; 
   
    ingredients.forEach((ingredient) => {   
        //console.log(ingredient);  
      
        rows.push(
          <IngredientRow
              ingredient={ingredient}
              key={ingredient.id}  
              handleClick={handleClick}            
              />
        );
      });
      
      return (
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
      );
  }

  export default IngredientTable