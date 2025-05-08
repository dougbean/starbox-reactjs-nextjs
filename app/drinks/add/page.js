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
    const { ingredients, loadingState  } = useIngredients();  
    
    const [message, setMessage] = useState(''); //I need a validation message  
    
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
      
      //add validation//     
      const { ingredients: selectedIngredients } = formData; 
      console.log('log selected ingredients...')
      console.log(selectedIngredients); 
      
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
      
      //add validation//
        // Call the API to add the drink
        //const url = 'https://localhost:7070/api/Drinks'; // todo: get base url from config
        const url = `${baseUrl}/Drinks`;
        createData(url, formData).then(
        function(value) {
            console.log(value);
            toast.success('Item created successfully!');
            //reset form
            setFormData({id: 0, name: '', price: 0, ingredients: []});
        },
        function(error) {        
            console.log(error);   
            toast.error("error occurred creating ingredient.");   
        }
      );  
    };

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



