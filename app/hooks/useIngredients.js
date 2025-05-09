import { useEffect, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//scope is specific to the the component that uses the hook.
const useIngredients = () => {
    const [ingredients, setIngredients] = useState([]);    
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);  
        
    const url = `${baseUrl}/Ingredients`;
    useEffect(() => {   
      setLoadingState(loadingStatus.isLoading);        
      fetch(url) 
      .then(response => response.json())
      .then(data => {              
         setIngredients(data);        
         setLoadingState(loadingStatus.loaded); 
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });   
    }, []); 
    return { ingredients, loadingState };   
};

export default useIngredients;