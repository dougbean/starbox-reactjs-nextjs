'use client'
//import { useState} from 'react'; 
import loadingStatus from "../../helpers/loadingStatus";
import LoadingIndicator from "../../components/LoadingIndicator";
import useDrinks from "../../hooks/useDrinks";
import Link from "next/link";

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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Beverage Name</th>
            <th>Recipe</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

const DrinkRow = ({ drink}) => { 
    var recipes = [];
    var count = 0;
    //console.log(drink);
    
    drink.ingredients.forEach((ingredient) => {    
       count++  
       //console.table(ingredient);
       let measure = (ingredient.quantity === 1) ? " unit " : " units ";
       const text = ingredient.quantity + measure + ingredient.name;
       //console.log(text)      
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
        <td><Link href={`/drinks/${drink.id}`}>Edit</Link></td>           
    </tr>
  );
}

const Recipe = ({ text }) => { 
    return (
      <span>{text}<br/></span>	 
    );
  }

  export default DrinksRecipe;

  