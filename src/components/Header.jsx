import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import BookingForm from './BookingForm';
import NewForm from './NewForm';
import './header.css';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/booking">Booking form</Link>
                <Link to="/newform">New booking form</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="booking" element={<BookingForm />} />
                <Route path="newform" element={<NewForm />} />
            </Routes>
        </header>
    )
}

export default Header
