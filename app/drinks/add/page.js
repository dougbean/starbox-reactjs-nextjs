"use client";
import React, { useState }  from 'react';
import {createData} from "../../components/ApiService";
import { ToastContainer, toast } from 'react-toastify';
import useIngredients from "../../hooks/useIngredients";
import loadingStatus from "../../helpers/loadingStatus";
import LoadingIndicator from "../../components/LoadingIndicator";
import ShowMessage from "../../components/ShowMessage";
import Utils from "../../helpers/Utils";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const AddDrink = () => {  
    const [formData, setFormData] = useState({id: 0, name: '', price: 0, ingredients: []});
    const [message, setMessage] = useState(''); //validation message  
    const { ingredients, loadingState } = useIngredients();     
       
    if (loadingState !== loadingStatus.loaded){
        return <LoadingIndicator loadingState={loadingState} />;
    }

    const handleChange = (e) => {   
      const { name, value } = e.target;     
  
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));      
    };  

    const addControlPair = () => {  
        setMessage('');     
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
        ingredients[index].id = Number(event.target.value); 
        updatedFormData.ingredients = ingredients; 
        setFormData(updatedFormData);
    };
        
    const handleTextChange = (index, event) => {    
        const updatedFormData = {...formData};
        const { ingredients } = updatedFormData;
        ingredients[index].quantity = event.target.value; //set the drop down property
        updatedFormData.ingredients = ingredients; 
        setFormData(updatedFormData);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();   
      
        //validation//     
        const { ingredients: selectedIngredients } = formData;  

        const {isValid, message} = Utils.isSubmissionValid(selectedIngredients);        
        console.log(isValid, message)      
        if(!isValid){
            setMessage(message);
           return;
        }
        //validation//
              
        const url = `${baseUrl}/Drinks`;
        createData(url, formData).then(
        function(value) {            
            toast.success('Item created successfully!');
            //reset form
            setFormData({id: 0, name: '', price: 0, ingredients: []});
        },
        function(error) {                    
            toast.error("error occurred creating ingredient.");   
        }
      );  
    };
       
    // const isSubmissionValid = (selectedIngredients) => {  

    //     if(selectedIngredients.length === 0){       
    //       setMessage('one ingredient is required.');
    //       return false;          
    //     }      

    //     let areSelectionsValid = Utils.checkIngredientSelections(selectedIngredients);

    //     if(!areSelectionsValid){
    //       setMessage('Ingredient selection is not valid.');        
    //       return false;
    //     }

    //     const hasDuplicates = Utils.checkIngredientsForDuplicates(selectedIngredients);
    //     if(hasDuplicates){     
    //       setMessage('You have a duplicate ingredient selection. Please change one.');  
    //       return false;
    //     }  
    //     return true;    
    // };        

    // const isSubmissionValid = (selectedIngredients) => {  

    //     if(selectedIngredients.length === 0){       
    //       //setMessage('one ingredient is required.');
    //       return {isValid: false, message: 'one ingredient is required.'};          
    //     }      

    //     let areSelectionsValid = Utils.checkIngredientSelections(selectedIngredients);

    //     if(!areSelectionsValid){
    //       //setMessage('Ingredient selection is not valid.');        
    //       return {isValid: false, message: 'Ingredient selection is not valid.'};    
    //     }

    //     const hasDuplicates = Utils.checkIngredientsForDuplicates(selectedIngredients);
    //     if(hasDuplicates){     
    //       //setMessage('You have a duplicate ingredient selection. Please change one.');  
    //       return {isValid: false, message: 'You have a duplicate ingredient selection. Please change one.'};    
    //     }  
    //     return {isValid: true, message: ''};    
    // };        

    return (    
       <>  
        <div className="container">  
          <form id="drinkForm" onSubmit={handleSubmit} className="container mt-4">
          <h2 className="mb-4">Add Drink</h2>

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
                  <option value="">Select an Ingredient</option>
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
                  value={control.text}
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

export default AddDrink;



