import { useEffect, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";

//remember the scope is specific to the the component that uses the hook.
const useDrinks = () => {
    const [drinks, setDrinks] = useState([]);    
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);  
    
    var url = 'https://localhost:7070/api/Drinks'; //todo: get hte base url from config file.     
    useEffect(() => {   
      setLoadingState(loadingStatus.isLoading);        
      fetch(url) 
      .then(response => response.json())
      .then(data => {
        // Handle the fetched data here        
        setDrinks(data);        
        setLoadingState(loadingStatus.loaded); 
      })
      .catch(error => {
        // Handle any errors
      });   
    }, []); 
    return { drinks, loadingState };   
};

export default useDrinks;