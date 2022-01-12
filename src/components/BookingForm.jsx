import React, { Component } from 'react';
import "./bookingform.css";
    
class BookingForm extends Component {
    constructor(props) {
        super(props);
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;
        this.state = {
          name: '',
          email: '',
          date: today,
          appt: "11:00",
          time: 1,
          seats: 2,
          errors: {
            name: '',
            email: '',
            date: '',
            appt: '',
            time: '',
            seats: ''
          }
        };
    }

    validateDate(date) {
      let answer = false;
      const today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      let todayString = year + "-" + month + "-" + day;
      answer = todayString <= date ? true : false;
      return answer;
    }

    validateAppt(appt) {
      let answer = false;
      const today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();
      let hour = today.getHours() + 1;
      let minutes = today.getMinutes();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      if (hour < 10) hour = "0" + hour;
      if (minutes < 10) minutes = "0" + minutes;
      let todayString = year + "-" + month + "-" + day;
      let timeString = hour + ":" + minutes;
      answer = todayString < this.state.date ? true : false;
      answer = !answer && appt < timeString ? false : true;
      return answer;
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
        switch (name) {
          case 'name': 
            errors.name = value.length > 3 ? '' : 'A név hossza minimum 3 karakter legyen!';
            break;
          case 'email': 
            errors.email = regex.test(value) ? '' : 'Érvénytelen email cím!';
            break;
          case 'date': 
            errors.date = this.validateDate(value) ? '' : 'Hibás dátum formátum, vagy érvénytelen dátum (csak az aktuális nap, vagy az utáni dátumra lehetséges foglalni)!';
            break;
          case 'appt': 
            errors.appt = this.validateAppt(value) ? '' : 'Érvénytelen foglalási idő! (A foglalásnak minimum az aktuális időpont utáni egy órával kell kezdődnie.)';
            break;
          case 'time': 
            errors.time = value > 1 && value < 8 ? '' : 'Érvénytelen időtartam! (minimum 1, maximum 8 óra)';
            break;
          case 'seats': 
            errors.seats = value > 1 && value < 20  ? '' : 'Érvénytelen foglalás! (minimum 1, maximum 20 helyet foglalhat)';
            break;
          default:
            break;
        }
      
        this.setState({errors, [name]: value})
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }    
    
    render() {

      const errors = this.state.errors;
        
        return (
          <>
          <h1>Asztalfoglalás</h1>
          <form onSubmit={this.handleSubmit}> 
              <label htmlFor="name">Név:*</label>
              <input id="name" type="text" name="name" placeholder="teljes név" required onChange={this.handleChange} />
              {errors.name.length > 0 && <span className='error'>{errors.name}</span>}
              <label htmlFor="email">Email:*</label>
              <input id="email" type="email" name="email" placeholder="Email cím" required onChange={this.handleChange} />
              {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
              <label htmlFor="date">Dátum*</label>
              <input id="date" type="date" name="date" value={this.state.date} min={this.state.date} required onChange={this.handleChange} />
              {errors.date.length > 0 && <span className='error'>{errors.date}</span>}
              <label htmlFor="appt">Időpont:*</label>
              <input id="appt" type="time" name="appt" value={this.state.appt} min="11:00" max="23:00" required onChange={this.handleChange} />
              {errors.appt.length > 0 && <span className='error'>{errors.appt}</span>}
              <label htmlFor="time">A foglalás hossza (órában):</label>
              <input id="time" type="number" name="time" value={this.state.time} min="1" max="8" required onChange={this.handleChange} />
              {errors.time.length > 0 && <span className='error'>{errors.time}</span>}
              <label htmlFor="seats">Vendégek száma (max. 20 fő):*</label>
              <input id="seats" type="number" name="seats" min="1" max="20" value={this.state.seats} required onChange={this.handleChange} />
              {errors.seats.length > 0 && <span className='error'>{errors.seats}</span>}
              <button>FOGLALÁS</button>
          </form>
          </>
        )
    }
}

export default BookingForm
