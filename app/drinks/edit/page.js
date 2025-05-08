"use client";
import React from 'react';
import {updateData} from "../../components/ApiService";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useIngredients from "../../hooks/useIngredients";
import loadingStatus from "../../helpers/loadingStatus";
import LoadingIndicator from "../../components/LoadingIndicator";
import { ToastContainer, toast } from 'react-toastify';
import ShowMessage from "../../components/ShowMessage";
import Utils from "../../helpers/Utils";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const DrinkForm = () => {      

    const searchParams = useSearchParams()
    const drinkData = JSON.parse(atob(searchParams.get('data'))); // decode the base64 string   
      
    const [formData, setFormData] = useState(drinkData);
    const [message, setMessage] = useState(''); 

    const { ingredients, loadingState  } = useIngredients();     

    if (loadingState !== loadingStatus.loaded){
        return <LoadingIndicator loadingState={loadingState} />;
    }

    const handleChange = (e) => {   
      const { name, value } = e.target;
      console.log(name, value)
  
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));

      console.log(formData); 
    };  

    const addControlPair = () => {       
      setMessage('')
      const updatedFormData = {...formData};      
      const { ingredients } = updatedFormData; 
      var updatedIngredients = [...ingredients, { id: "", quantity: "", name: "" }]
      updatedFormData.ingredients = updatedIngredients;
      setFormData(updatedFormData);   
    };    

    const removeControlPair = (index) => {   
      const updatedFormData = {...formData};
      const { ingredients } = updatedFormData;
      ingredients.splice(index,1);
      updatedFormData.ingredients = ingredients; 
      setFormData(updatedFormData);
    };
  
    const handleDropdownChange = (index, event) => {
      setMessage('')
      const updatedFormData = {...formData};
      const { ingredients } = updatedFormData;
      ingredients[index].id = event.target.value; 
      updatedFormData.ingredients = ingredients; 
      setFormData(updatedFormData);
    };
  
    const handleTextChange = (index, event) => {    
      const updatedFormData = {...formData};
      const { ingredients } = updatedFormData;
      ingredients[index].quantity = event.target.value; //setting the drop down property
      updatedFormData.ingredients = ingredients; //what about mutability here?
      setFormData(updatedFormData);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
       
        //validation//          
        const { ingredients: selectedIngredients } = formData;       
            
        if(selectedIngredients.length === 0){       
            setMessage('one ingredient is required.');
            return;
        }
      
        let areSelectionsValid = Utils.checkIngredientSelections(selectedIngredients);
      
        if(!areSelectionsValid){
            setMessage('Ingredient selection is not valid.');        
            return;
        }
      
        const hasDuplicates = Utils.checkIngredientsForDuplicates(selectedIngredients);
        if(hasDuplicates){     
            setMessage('You have a duplicate ingredient selection. Please change one.');  
            return;
        }            
        //validation//       
       
        const url = `${baseUrl}/Drinks/${formData.id}`;    
        updateData(url, formData).then(
            function(value) {
            console.log(value);
            toast.success('Item updated successfully!');
            },
            function(error) {        
            console.log(error);   
            toast.error("error occurred updating ingredient.");   
            }
        );    
    };   
 
    return (    
       <>  
        <div className="container"> 
              <form id="drinkForm" onSubmit={handleSubmit} className="container mt-4">
              <h2 className="mb-4">Edit Drink</h2>
      
              <div className="row mb-3">
                  <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                  />
                  </div>
                  <div className="col-md-6 d-flex align-items-end">
                  <button type="button" onClick={addControlPair} className="btn btn-secondary">
                      Add Ingredient
                  </button>
                  </div>
              </div>
      
              {formData.ingredients.map((control, index) => (
                  <div className="row mb-2" key={index}>
                  <div className="col-md-5">
                      <select
                      className="form-select"
                      value={control.id}
                      onChange={(e) => handleDropdownChange(index, e)}
                      >
                      <option value="">Select an ingredient</option>
                      {ingredients.map((option, i) => (
                          <option key={i} value={option.id}>
                          {option.name}
                          </option>
                      ))}
                      </select>
                  </div>
                  <div className="col-md-4">
                      <input
                      type="number"
                      className="form-control"
                      value={control.quantity}
                      onChange={(e) => handleTextChange(index, e)}
                      placeholder="Enter a quantity"
                      required
                      min="0"
                      />
                  </div>
                  <div className="col-md-3">
                      <button
                      type="button"
                      onClick={() => removeControlPair(index)}
                      className="btn btn-danger"
                      >
                      Remove
                      </button>
                  </div>
                  </div>
              ))}
      
              <div className="row mt-3">
                  <div className="col-md-6">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
              </div>
              {message && ( <ShowMessage message={message}/> )}     
              </form>             
               <ToastContainer />
        </div>
    </>
  );
};

export default DrinkForm;

