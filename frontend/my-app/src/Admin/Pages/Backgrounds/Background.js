import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import sign_out from './images/sign_out.png'
import './Background.css'

const Background = () => {
    return (
        <div class = "background">
            <div className = "upper">
                <img src = {logo} alt = "Logo" ></img>
                <h2>Hunger Hub</h2>
                <div className='sign_out'>
                    <h2>Sign Out</h2>
                    <img src={sign_out} alt="sign out"/>
                </div>
            </div>
            <div className = "lower">
                <Link to="/">
                    <h3>Home</h3>
                </Link>
                <Link to="/resturants">
                    <h3>Resturants</h3>
                </Link>
                <Link to="/drivers">
                <h3>Drivers</h3>
                </Link>
                <Link to="/customers">
                    <h3>Customers</h3>
                </Link>
                <Link to="/report">
                    <h3>Reports</h3>
                </Link>
            </div>
        </div>
    );
}
export default Background