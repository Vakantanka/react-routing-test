import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import About from './components/About';
import BookingForm from './components/BookingForm';
import Button from './components/Button';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="booking" element={<BookingForm />} />
      </Routes>
    </div>    
    // <div className="App">
    //   <Header />
    //   <About />
    //   <Menu />
    //   <Button />
    //   <BookingForm />
    //   <Home />
    // </div>
  );
}

export default App;
