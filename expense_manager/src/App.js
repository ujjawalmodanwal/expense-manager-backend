import './App.css';
import Welcome from './Components/LoginPage/Welcome';
import Home from './Components/MainPage/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/LoginPage/Login';
import Register from './Components/LoginPage/Register';
import Profile from './Components/MainPage/Profile';

function App() {
	
  	return (
    	<div className="App">
			<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"></meta>
			<BrowserRouter>
				<Routes>
          			<Route path="/" element = {<Welcome/>} />
					<Route path="/Login" element = {<Login/>} />
					<Route path="/Register" element = {<Register/>} />
					<Route path="/Home" element = {<Home/>} />
					<Route path="/Profile" element = {<Profile/>} />
        		</Routes>
      		</BrowserRouter>
    	</div>
  	);
}

export default App;
