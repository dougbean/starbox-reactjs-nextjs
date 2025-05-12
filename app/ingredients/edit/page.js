"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import {updateData} from "../../components/ApiService"; 
import {useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const IngredientForm = () => {        
    const searchParams = useSearchParams()
    const ingredientData = JSON.parse(atob(searchParams.get('data'))); // decode the base64 string   
       
    const [formData, setFormData] = useState(ingredientData);

    const handleChange = (e) => {   
      const { name, value } = e.target;      
  
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));      
    };
   
    const handleSubmit = (event) => {
        event.preventDefault();       
        // Call the API to edit the ingredient     
        const url = `${baseUrl}/Ingredients/${formData.id}`;    
        updateData(url, formData).then(
          function(value) {
            toast.success('Item updated successfully!');
          },
          function(error) { 
            toast.error("error occurred updating ingredient.");   
          }
        );    
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
     
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" id="name" name="name"  
          value={formData.name} 
          onChange={handleChange} 
          required className="form-control" />
        </div>      
         
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

