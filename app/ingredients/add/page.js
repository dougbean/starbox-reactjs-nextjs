
"use client";
import React, { useState } from 'react';
import {createData} from "../../components/ApiService";
import { ToastContainer, toast } from 'react-toastify';

const IngredientForm = () => {
    //use state for the form//
    const [formData, setFormData] = useState({
      id: 0,
      name: '',
      unitCost: 0,
      amount: 0
    });

    const handleChange = (e) => {
      console.log(e.target)
      const { name, value } = e.target;
      console.log(name, value)

      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  //use state for the form//

  const handleSubmit = (event) => {
    event.preventDefault();   
    console.log('Form submitted:', formData);
    // Call the API to add the ingredient
    const url = 'https://localhost:7070/api/Ingredients'; // todo: get base url from config
    createData(url, formData).then(
      function(value) {
        console.log(value);
        toast.success('Item created successfully!');
        //reset form
        setFormData({     
          name: '',
          unitCost: 0,
          amount: 0
        });
      },
      function(error) {        
        console.log(error);   
        toast.error("error occurred creating ingredient.");   
      }
    );  
  };

  return (
    <>
    <form id="ingredientForm"  onSubmit={handleSubmit} className="container mt-4">
    <h2 className="mb-4">Add Ingredient</h2>  
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" id="name" name="name"
         value={formData.name}
         onChange={handleChange}
        required className="form-control" />
      </div>   
      <div className="col-md-6">
        <label htmlFor="unitCost" className="form-label">Unit Cost:</label>
        <input type="number" min="0" step="any" id="unitCost" name="unitCost"
         value={formData.unitCost}
         onChange={handleChange}
        required className="form-control" />
      </div>  
      <div className="col-md-6">
        <label htmlFor="amount" className="form-label">Amount (Inventory):</label>
        <input type="number" step="1"  min="0" id="amount" name="amount" 
          value={formData.amount}
          onChange={handleChange}
        required className="form-control" />
      </div>  
     <br/>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
   <ToastContainer />
  </>
  );
};

export default IngredientForm;