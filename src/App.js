import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Table from "./components/Table";
import "./styles/app.scss";


function App() {
  return (
     <Router>
         <Routes>
             <Route path="/" to element = {<Home/>} />
             <Route path="/table" to element = {<Table/>} />
         </Routes>
     </Router>
  );
}

export default App;
