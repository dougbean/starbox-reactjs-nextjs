import Link from 'next/link'

const IngredientRow = ({ ingredient, handleClick }) => {
    return (
    <tr key={ingredient.id}>
        <td>{ingredient.name}</td>
        <td>{ingredient.unitCost}</td>
        <td>{ingredient.amount}</td> 
        <td><Link href={`/ingredients/${ingredient.id}`}>Edit</Link></td>        
        <td>
          <button className="btn btn-outline-primary" onClick={() => handleClick(ingredient.id)}>
            Delete
          </button>
          </td>     
      </tr> 
    );
  }

  export default IngredientRow