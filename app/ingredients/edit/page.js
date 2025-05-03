"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import {updateData} from "../../components/ApiService"; 
import {useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const handleSubmit = (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);
    // Call the API to add the ingredient
    const url = `https://localhost:7070/api/Ingredients/${data.id}`; // todo: get base url from config
    console.log(url)
    console.log(JSON.stringify(data))
    updateData(url, data).then(
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

const IngredientForm = () => {        
    const searchParams = useSearchParams()
    const ingredientData = JSON.parse(atob(searchParams.get('data'))); // decode the base64 string
    console.log(ingredientData); 
       
    const [formData, setFormData] = useState(ingredientData);

    const handleChange = (e) => {   
      const { name, value } = e.target;
      console.log(name, value)
  
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));      
    };
   
    return (    
      <>
      <form id="ingredientForm"  onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">Edit Ingredient</h2>

      <div className="col-md-6">         
          <input type="text" id="id" name="id"  
          value={formData.id}         
          hidden
          readOnly
          onChange={handleChange} 
          required className="form-control" />
        </div>
    
      {/* <div className="row mb-3"> */}
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" id="name" name="name"  
          value={formData.name} 
          onChange={handleChange} 
          required className="form-control" />
        </div>
      {/* </div> */}
         
        <div className="col-md-6">
          <label htmlFor="unitCost" className="form-label">Unit Cost:</label>
          <input type="number"  min="0" step="any" id="unitCost" name="unitCost" 
          value={formData.unitCost} 
          onChange={handleChange} 
          required className="form-control" />
        </div>
    
        <div className="col-md-6">
          <label htmlFor="amount" className="form-label">Amount (Inventory):</label>
          <input type="number" min="0" id="amount" name="amount" 
          value={formData.amount} 
          onChange={handleChange} 
          required className="form-control" />
        </div>
        <br/>
        <div className="col-md-6">
          <button type="submit" className="btn btn-primary">Submit</button>       
        </div>
    </form>
    <ToastContainer />
    </>
  );
};

export default IngredientForm;

