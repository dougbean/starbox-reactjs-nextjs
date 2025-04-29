"use client";
// import { ApiContext } from "./components/ApiContext";
// import {fetchItemById} from "./components/ApiService";
import Drinks from "./components/Drinks";

//I probably don't need the context provider for the api service. 
// export default function Page() {  
//   return (   
//     <ApiContext.Provider value={fetchItemById}> 
//       <div>         
//           <Drinks />
//       </div>
//     </ApiContext.Provider>  
//   );
// }

export default function Page() {  
  return (   
      <div>         
          <Drinks />
      </div>   
  );
}
