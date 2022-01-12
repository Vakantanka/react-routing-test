import { useState } from "react";
import "./bookingform.css";

const createActualDatetime = () => {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let hour = today.getHours() + 1;
  let minute = today.getMinutes();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}

const NewForm = () => {

	const todayString = createActualDatetime().slice(0,10);
	const timeString = createActualDatetime().slice(11);

	const [ inputValues, setInputValues ] = useState({
		name: '',
		email: '',
		date: todayString,
		appt: timeString,
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
	});
	
	const [ inputName, setInputName ] = useState("name");
	const [ inputEmail, setInputEmail ] = useState("email");
	const [ inputDate, setInputDate ] = useState("date");
	const [ inputAppt, setInputAppt ] = useState("appt");
	const [ inputTime, setInputTime ] = useState("time");
	const [ inputSeats, setInputSeats ] = useState("seats");

	// console.log(inputValues);
	const errors = inputValues.errors;

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;

		const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
		switch (name) {
			case 'name': 
				errors.name = value.length >= 3 ? '' : 'A név hossza minimum 3 karakter legyen!';
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
				errors.time = value >= 1 && value <= 8 ? '' : 'Érvénytelen időtartam! (minimum 1, maximum 8 óra)';
				break;
			case 'seats': 
				errors.seats = value >= 1 && value <= 20  ? '' : 'Érvénytelen foglalás! (minimum 1, maximum 20 helyet foglalhat)';
				break;
			default:
				break;
		}
	
		setInputValues({errors, [name]: value});
		console.log(inputValues);
	}

	const validateDate = (date) => {
		let answer = false;
		answer = createActualDatetime().slice(0,10) <= date ? true : false;
		return answer;
	}

	const validateAppt = (appt) => {
		let answer = false;
		let todayString = createActualDatetime().slice(0,10);
		let timeString = createActualDatetime().slice(11);
		answer = todayString < this.state.date ? true : false;
		answer = !answer && appt < timeString ? false : true;
		return answer;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputValues);
	}    

	return (
		<>
			<h1>Asztalfoglalás</h1>
			<form onSubmit={handleSubmit}> 

					<label htmlFor="name">Név:*</label>
					<input id="name" type="text" name="name" placeholder="teljes név" value={inputValues.name} required onChange={ (e) => {
							setInputName(e.target.value);
							handleChange(e);
						}
					} />
					{errors.name.length > 0 && <span className='error'>{errors.name}</span>}

					<label htmlFor="email">Email:*</label>
					<input id="email" type="email" name="email" placeholder="Email cím" required onChange={ (e) => {
							setInputEmail(e.target.value) 
							handleChange(e);
						}
					} />
					{errors.email.length > 0 && <span className='error'>{errors.email}</span>}

					<label htmlFor="date">Dátum*</label>
					<input id="date" type="date" name="date" value={inputValues.date} min={inputValues.date} required onChange={ (e) => {
							setInputDate(e.target.value) 
							handleChange(e);
						}
					} />
					{errors.date.length > 0 && <span className='error'>{errors.date}</span>}

					<label htmlFor="appt">Időpont:*</label>
					<input id="appt" type="time" name="appt" value={inputValues.appt} min="11:00" max="23:00" required onChange={ (e) => {
							setInputAppt(e.target.value) 
							handleChange(e);
						}
					} />
					{errors.appt.length > 0 && <span className='error'>{errors.appt}</span>}

					<label htmlFor="time">A foglalás hossza (órában):</label>
					<input id="time" type="number" name="time" value={inputValues.time} min="1" max="8" required onChange={ (e) => {
							setInputTime(e.target.value) 
							handleChange(e);
						}
					} />
					{errors.time.length > 0 && <span className='error'>{errors.time}</span>}

					<label htmlFor="seats">Vendégek száma (max. 20 fő):*</label>
					<input id="seats" type="number" name="seats" min="1" max="20" value={inputValues.seats} required onChange={ (e) => {
							setInputSeats(e.target.value) 
							handleChange(e);
						}
					} />
					{errors.seats.length > 0 && <span className='error'>{errors.seats}</span>}

					<button>FOGLALÁS</button>
			</form>
		</>
	)

}

export default NewForm
