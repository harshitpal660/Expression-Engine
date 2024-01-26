import logo from './logo.svg';
import './App.css';
import ExpressionForm from './Components/ExpressionForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Screen1 } from './Pages/Screen1';
import { ErrorPage } from './Pages/ErrorPage';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Screen1/>}/>
          <Route path='/form' element={<ExpressionForm/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      {/* <ExpressionForm/> */}

    </div>
  );
}

export default App;
