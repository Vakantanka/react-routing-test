import React, { Component } from 'react';
import "./bookingform.css";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}
// const countErrors = (errors) => {
//     let count = 0;
//     Object.values(errors).forEach(
//       (val) => val.length > 0 && (count = count+1)
//     );
//     return count;
// }
    
class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: null,
          email: null,
          date: null,
          appt: null,
          time: null,
          seats: null,
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

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {
          case 'name': 
            errors.name = value.length < 3 ? 'Name must be 3 characters long!' : '';
            break;
          case 'email': 
            errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
            break;
          default:
            break;
        }
      
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
          console.info('Valid Form')
        }else{
          console.error('Invalid Form')
        }
        // this.setState({formValid: validateForm(this.state.errors)});
        // this.setState({errorCount: countErrors(this.state.errors)});
    }    
    

    render() {
        const {errors, formValid} = this.state;

        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;  
        
        return (
        <div id="form">
            <h1>Asztalfoglalás</h1>
            <form onSubmit={this.handleSubmit}> 
                <h3>Asztalfoglalás</h3>
                <label htmlFor="name">Név:*</label>
                <input id="name" type="text" name="name" placeholder="teljes név" required onChange={this.handleChange} />
                {errors.fullName.length > 0 && <span className='error'>{errors.fullName}</span>}
                <label htmlFor="email">Email:*</label>
                <input id="email" type="email" name="email" placeholder="Email cím" required onChange={this.handleChange} />
                {/* <label htmlFor="date">Dátum*</label>
                <input id="date" type="date" name="date" defaultValue={today} min={today} required />
                <label htmlFor="appt">Időpont:*</label>
                <input id="appt" type="time" name="appt" min="11:00" max="23:00" required />
                <label htmlFor="time">A foglalás hossza (órában):</label>
                <input id="time" type="number" name="time" defaultValue="1" min="1" max="6" required />
                <label htmlFor="seats">Vendégek száma (max. 20 fő):*</label>
                <input id="seats" type="number" name="seats" min="1" max="20" defaultValue="2" required /> */}
                <button>FOGLALÁS</button>
            </form>
        </div>
        )
    }
}

export default BookingForm
