
import { useContext  } from 'react';
import { MessageContext } from "../MessageContext";
import DrinkButton from "./DrinkButton";

const DrinkRow = ({ drink }) => {
    const setMessage = useContext(MessageContext); 
  
    return (
      <tr>
        <td>{drink.name}</td>
        <td>{drink.price}</td>      
              <td><DrinkButton
                drink={drink}
                setMessage={setMessage} 
                />
        </td>         
      </tr>
    );
  }

  export default DrinkRow