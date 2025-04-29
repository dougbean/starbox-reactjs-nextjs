import { useState} from 'react'; 
import { MessageContext } from "./MessageContext";
import DrinkTable from "./DrinkTable";
import ShowMessage from "./ShowMessage";
import loadingStatus from "../helpers/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";
import useDrinks from "../hooks/useDrinks";

const Drinks = () => {
    const [message, setMessage] = useState('');     
    const { drinks, loadingState  } = useDrinks();         

    if (loadingState !== loadingStatus.loaded){
      return <LoadingIndicator loadingState={loadingState} />;
    }
    
    return (
      <MessageContext.Provider value={setMessage}>
        <div>
          <DrinkTable 
              drinks={drinks}                      
            />   
            {message && ( <ShowMessage message={message}/> )}                    
        </div>
      </MessageContext.Provider>  
    );  
  }

  export default Drinks;