"use client";
import { ApiContext } from "../components/ApiContext";
import {fetchItemById} from "../components/ApiService";
import Drinks from "../components/Drinks";

export default function Page() {
  return (   
    <ApiContext.Provider value={fetchItemById}>
      <div>         
          <Drinks />
      </div>
    </ApiContext.Provider>  
  );
}
