import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './components/Home/home';
import Fileupload from './components/Fileupload/Fileupload';
import Mail from './components/mail/mail';
function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/csvUpload" element={<Fileupload/>}></Route>
      <Route path="/mail/:id" element={<Mail/>}></Route>
    </Routes>
    
  );
}

export default App;
