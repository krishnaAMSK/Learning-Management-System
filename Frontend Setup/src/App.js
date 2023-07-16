import './CSS_Files/App.css';
import { BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
import Home from './Components/Home';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
