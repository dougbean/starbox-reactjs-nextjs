"use client";
import { useState } from 'react'; 
import useIngredients from "../hooks/useIngredients";
import loadingStatus from "../helpers/loadingStatus";
import LoadingIndicator from "../components/LoadingIndicator";
import IngredientTable from "../components/ingredients/IngredientTable";
import {deleteData, updateData} from "../components/ApiService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() { 
  const [formData, setFormData] = useState({
    amount: 25 //default value for the amount    
  });
 
  const { ingredients, loadingState  } = useIngredients();     

  if (loadingState !== loadingStatus.loaded){
    return <LoadingIndicator loadingState={loadingState} />;
  }

 
  //todo: add message for error that may occur when tring to delete ingredient that has constraint - used by a drink.
  const handleClick = (id) => {
    console.log('executing handleClick...')
    console.log(id)
    //var url = `https://localhost:7070/api/Ingredients/${id}`;   
    const url = `${baseUrl}/Ingredients/${id}`;
    deleteData(url).then(
      function(value) {
        //console.log(value);     
        toast.success('Item deleted successfully!');
      },
      function(error) {        
        //console.log(error);   
        let message = "Error occurred deleting item. You may be trying to delete an Ingredient that is used by a drink."
        toast.error(message);   
      }
    );             
  } 

  const handleChange = (e) => {
    // console.log(e.target)
     const { name, value } = e.target;
    // console.log(name, value)

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
      
    //todo: get baseUrl from config file.
    //const url = `https://localhost:7070/api/Ingredients/update-amounts?amount=${formData.amount}`; 
    const url = `${baseUrl}/Ingredients/update-amounts?amount=${formData.amount}`; 
    //console.log(url)    
    updateData(url, {}).then(
      function(value) {
        //console.log(value);
        toast.success('Amounts updated successfully!');
      },
      function(error) {        
        //console.log(error);   
        toast.error("error occurred updating amounts.");   
      }
    ); 
  };

  const handleReloadButtonClick = () => {
    location.reload();    
  } 

  return  (
    <>  
    <div >     
         <IngredientTable 
          ingredients={ingredients}    
          handleClick={handleClick}                  
        />  
    </div>
    <div className="container">     
      <form onSubmit={handleSubmit}>
          <div className="row mb-3">
              <div className="col-md-4">
                  <label htmlFor="amount" className="form-label">specify amount for ingredients restock</label>
              </div>
              <div className="col-md-8">
                  <input type="number" id="amount" name="amount"
                   value={formData.amount}
                   onChange={handleChange}                 
                   className="form-control" />
              </div>
          </div>        
          <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <button type="submit" className="btn btn-primary me-2">Restock</button>
                <button type="submit" className="btn btn-secondary" onClick={handleReloadButtonClick}>Reload Page</button>
              </div>
            </div>
      </form>
  </div>
   <ToastContainer />
    </> 
  )
}
