import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import RegAndLogin from "./views/RegAndLogin";
import ProductsList from "./views/ProductsList";
import {Router} from "@reach/router";
import ProvideAuth from "./components/ProvideAuth";

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <RegAndLogin path="/"/>
          <ProductsList path="/products"/>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
