import { useContext } from 'react'; //todo: remove, I think.   
import { ApiContext } from "./ApiContext"; //todo: remove, I think.   
import {fetchItemById, updateData} from "../components/ApiService";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const DrinkButton = ({ drink, setMessage }) => {
  // const fetchDrinkById = useContext(ApiContext); //todo: remove 
  //const fetchItemById = useContext(ApiContext); //todo: remove, I think. 
  
  var setMyMessage = (drinkItem) => {    
    //console.log(drinkItem)
    if(drinkItem.name === null)
        {
           var msg = `Your order of ${drink.name} is not available.`
        }else{
           msg = `Your ordered ${drinkItem.name}.`
        }   
   
    setMessage(msg);
  }

  //A hook can't be used in the event handler, not direcctly anyway.
  function handleClick() {
      setMessage('Loading...');      
      //var url = `https://localhost:7070/api/Drinks/${drink.id}`;   
      const url = `${baseUrl}/Drinks/${drink.id}`;      
      //fetchDrinkById(url, setMyMessage); //todo: remove     
      fetchItemById(url, setMyMessage);  	
  } 

  return (
    <button className="btn btn-outline-primary" onClick={handleClick}>
      Order
    </button>
  );
}

export default DrinkButton