
export default class Utils {
   
    static checkIngredientSelections = (selectedIngredients) => {
        let areSelectionsValid = true;
        
        selectedIngredients.forEach(function (item) {
          if (item.id === '') {            
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
  }