
import Link from "next/link";

const Header = () => {    
    return (     
      <header className="container">
        <div className="row align-items-center mb-3">
          <div className="col-md-5">
              <h1>Welcome to Starbox!</h1>
          </div>
          <div className="col-md-7 text-md-end">
            <nav>
              <Link href="/drinks" className="me-3">Order Drink</Link>       
              <Link href="/drinks/recipe" className="me-3">Drinks</Link>
              <Link href="/drinks/add" className="me-3">Add Drink</Link>
              <Link href="/ingredients" className="me-3">Ingredients</Link>
              <Link href="/ingredients/add" className="me-3">Add Ingredient</Link>
            </nav>
          </div>
        </div>
      </header>      
      );
};
  
export default Header;