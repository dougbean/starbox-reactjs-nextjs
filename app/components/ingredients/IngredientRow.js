import Link from 'next/link'

//todo: pass the ingredient, not just the id to the edit page, to avoid a trip to the database.
const IngredientRow = ({ ingredient, handleClick }) => {
    return (
    <tr key={ingredient.id}>
        <td>{ingredient.name}</td>
        <td>{ingredient.unitCost}</td>
        <td>{ingredient.amount}</td> 
        {/* <td><Link href={`/ingredients/${ingredient.id}`}>Edit</Link></td>         */}
        <td>
        <Link 
                href={{
                    pathname: `/ingredients/${ingredient.id}`,
                    query: { data: JSON.stringify(ingredient) }
                }}
            >
                Edit
            </Link>             
        </td>
        <td>
        <Link 
                href={{
                    pathname: `/ingredients/edit`,
                    query: { data: btoa(JSON.stringify(ingredient)) }
                }}
            >
              New Edit Page
            </Link>             
        </td>
        <td>
          <button className="btn btn-outline-primary" onClick={() => handleClick(ingredient.id)}>
            Delete
          </button>
          </td>     
      </tr> 
    );
  }

  export default IngredientRow