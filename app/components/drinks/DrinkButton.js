import {fetchItem} from "../../components/ApiService";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const DrinkButton = ({ drink, setMessage }) => { 
  
  var setOrderMessage = (drinkItem) => {       
    if(drinkItem.name === null)
        {
           var msg = `Your order of ${drink.name} is not available.`
        }else{
           msg = `Your ordered ${drinkItem.name}.`
        }   
   
    setMessage(msg);
  }
  
  const handleClick = () => {
      setMessage('Loading...');           
      const url = `${baseUrl}/Drinks/${drink.id}`;          
      fetchItem(url, setOrderMessage);  	
  } 

  return (
    <button className="btn btn-outline-primary" onClick={handleClick}>
      Order
    </button>
  );
}

export default DrinkButton