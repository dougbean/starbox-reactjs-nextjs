'use client'
import loadingStatus from "../../helpers/loadingStatus";
import LoadingIndicator from "../../components/LoadingIndicator";
import {deleteData} from "../../components/ApiService";
import useDrinks from "../../hooks/useDrinks";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';

const DrinksRecipe = () => {
   
    const { drinks, loadingState  } = useDrinks();     

    if (loadingState !== loadingStatus.loaded){
      return <LoadingIndicator loadingState={loadingState} />;
    }

    return (
        <div>     
          <DrinkTable 
              drinks={drinks}                 
                 />
        </div>
      );  
  }  

   //click event for delete//
   const handleClick = (id) => {    
    var url = `https://localhost:7070/api/Drinks/${id}`;   
    deleteData(url).then(
      function(value) {
        //console.log(value);
        toast.success('Item deleted successfully!');
      },
      function(error) {        
        //console.log(error);   
        toast.error("error occurred deleting item.");   
      }
    );             
  } 
  //click event for delete//

  const handleReloadButtonClick = () => {
    location.reload();    
  } 

  const DrinkTable = ({ drinks }) => {
    const rows = [];    
    drinks.forEach((drink) => {      
      rows.push(
        <DrinkRow       
          key={drink.id}
          drink={drink}          
        />
      );    
    });
    return (
      <>
       <div className="container"> 
           <div className="row">              
              <div className="col-md-12">
                <h2>Drinks</h2>
              </div>
            </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Beverage Name</th>
              <th>Recipe</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <div className="row">
          <div className="col-md-9"></div>
            <div className="col-md-3">              
                <button type="submit" className="btn btn-secondary" onClick={handleReloadButtonClick}>Reload Page</button>
              </div>
        </div>
        <ToastContainer />
      </div>
      </>
    );
  }

const DrinkRow = ({ drink}) => { 
    var recipes = [];
    var count = 0;   
    
    drink.ingredients.forEach((ingredient) => {    
       count++        
       let measure = (ingredient.quantity === 1) ? " unit " : " units ";
       const text = ingredient.quantity + measure + ingredient.name;
    
       recipes.push(
        <Recipe
            key={count}
            text={text}
            />
         )         
      });
  return (
    <tr>
      <td>{drink.name}</td>     
        <td>
          <div>{recipes}</div>
        </td>       
        <td>
          <Link 
            href={{
                pathname: `/drinks/edit`,
                query: { data: btoa(JSON.stringify(drink)) }
            }}
          >
            Edit
          </Link>             
        </td>
        <td>
          <button className="btn btn-outline-primary" onClick={() => handleClick(drink.id)}>
            Delete
          </button>
        </td>         
    </tr>
  );
}

const Recipe = ({ text }) => { 
    return (
      <span>{text}<br/></span>	 
    );
  }

  export default DrinksRecipe;

  