
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
              duplicates.add(item.id.toString());
            } else {
              seen.add(item.id.toString());        
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
  }