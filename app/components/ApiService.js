//I can't use useEffect here because this is not a component or a hook. 

//setItem is a callback function.
var fetchDrinkById = (url, setItem) => {   //todo: WHAT ABOUT AN ASYNC FUNCTION?
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Handle the fetched data here
        //console.table(data);       
        setItem(data); //this causes a re-rerender, so fetchTodos should be called in an useAffect hook, at least on initial load.       
      })
      .catch(error => {
        // Handle any errors
      });   
}

const fetchItems = async (url, setItems) => { //I haven't used this yet.
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data);
    setItems(data); // Triggers re-render if used inside a React component
  } catch (error) {
    console.error('Error fetching drinks:', error);
  }
};


const fetchItemById = async (url, setItem) => {//I haven't used this yet.
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data);
    setItem(data); // Triggers re-render if used inside a React component
  } catch (error) {
    console.error('Error fetching drinks:', error);
  }
};

//rename this to createData or something like that.
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
    return response.ok;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error; // rethrow so calling code can handle it
  }
}

//put
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
      console.error('Error updating data:', error); 
      throw error;
  }
}

//delete
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
    console.log('item deleted successfully:', data);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error; //this is needed for the resolve error toastr message.
  }
}

export { fetchDrinkById, fetchItems, fetchItemById, createData, updateData, deleteData };