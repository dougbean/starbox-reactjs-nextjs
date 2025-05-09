"use client";
import { useState } from 'react'; 
import useIngredients from "../hooks/useIngredients";
import loadingStatus from "../helpers/loadingStatus";
import LoadingIndicator from "../components/LoadingIndicator";
import IngredientTable from "../components/ingredients/IngredientTable";
import {deleteData, updateData} from "../components/ApiService";
import Utils from "../helpers/Utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() { 
  const [formData, setFormData] = useState({
    amount: 25 //default value  
  });   
 
  const { ingredients, loadingState } = useIngredients();     
   
  let sortedList =  [...ingredients];
  Utils.sortListByName(sortedList);    

  if (loadingState !== loadingStatus.loaded){
    return <LoadingIndicator loadingState={loadingState} />;
  }
   
  const handleClick = (id) => {
    const url = `${baseUrl}/Ingredients/${id}`;
    deleteData(url).then(
      function(value) {        
        toast.success('Item deleted successfully!');
      },
      function(error) {                   
        let message = "Error occurred deleting item. You may be trying to delete an Ingredient that is used by a drink."
        toast.error(message);   
      }
    );             
  } 

  const handleChange = (e) => {   
     const { name, value } = e.target;
   
     setFormData(prevState => ({
       ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();   
    const url = `${baseUrl}/Ingredients/update-amounts?amount=${formData.amount}`; 
    
    updateData(url, {}).then(
      function(value) {       
        toast.success('Amounts updated successfully!');
      },
      function(error) {    
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
          ingredients={sortedList}    
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
