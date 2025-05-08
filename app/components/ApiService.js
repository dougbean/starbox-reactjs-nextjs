
const fetchItem = async (url, setItem) => {
  try {
    const response = await fetch(url);
    const data = await response.json();    
    setItem(data); // Triggers re-render if used inside a React component
  } catch (error) {
    console.error('Error fetching drinks:', error);
  }
};

const createData = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Add other headers here if needed
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;    
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error; 
  }
}

const updateData = async (url = '', data = {}) => {
  try {     
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {    
      console.error('Error in PUT request:', error); 
      throw error;
  }
}

const deleteData = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',        
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete item: ${response.status}`);
    }

    const data = await response.text(); // Use response.text() if no JSON body is returned  
  } catch (error) {
    console.error('Error in DELETE request:', error);
    throw error; 
  }
}

export { fetchItem, createData, updateData, deleteData };