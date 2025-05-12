
export default class Utils {
   
    static checkIngredientSelections = (selectedIngredients) => {
        let areSelectionsValid = true;
        
        selectedIngredients.forEach(function (item) {        
          //'Select and ingredient' is an empty string on the Add Drink page and zero on the Edit Drink page.      
          if (item.id === '' || item.id === 0) {              
            areSelectionsValid = false;           
          }
        });
        return areSelectionsValid;
      }

      //# marks the function as private
      static #getDuplicatedIngredients = (selectedIngredients) => {
        const seen = new Set();
        const duplicates = new Set();             

        selectedIngredients.forEach(function(item) {            
            if (seen.has(item.id)) {              
              duplicates.add(item.id);
            } else {
              seen.add(item.id);        
            }     
          })

          return [...duplicates]; 
       } 

      static checkIngredientsForDuplicates = (selectedIngredients) => {
          let hasDuplicates = false;
          let dupes = Utils.#getDuplicatedIngredients(selectedIngredients);
          console.log(dupes);
      
          const isEmpty = dupes.length === 0; // true
          if (!isEmpty) {
            hasDuplicates = true;
          } 
          return hasDuplicates;
      }
      
      static sortListByName = (listToSort) => {       
        listToSort.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {      
            return -1;  // a comes before b
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {        
            return 1;   // b comes before a
          } else {        
            return 0;   // a and b are equal
          }
        });
        return listToSort;
      }

      static isSubmissionValid = (selectedIngredients) => {  
          
        if(selectedIngredients.length === 0){       
          //setMessage('one ingredient is required.');
          return {isValid: false, message: 'one ingredient is required.'};          
        }      
          
        let areSelectionsValid = Utils.checkIngredientSelections(selectedIngredients);
          
        if(!areSelectionsValid){
        //setMessage('Ingredient selection is not valid.');        
          return {isValid: false, message: 'Ingredient selection is not valid.'};    
        }
          
        const hasDuplicates = Utils.checkIngredientsForDuplicates(selectedIngredients);
        if(hasDuplicates){     
        //setMessage('You have a duplicate ingredient selection. Please change one.');  
          return {isValid: false, message: 'You have a duplicate ingredient selection. Please change one.'};    
        }  
        return {isValid: true, message: ''};    
     };        
  }