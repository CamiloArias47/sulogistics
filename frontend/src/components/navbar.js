import {useAuth} from '../context/authcontext'
import { Link } from 'react-router-dom'

export default function NavBar(){

    const auth = useAuth()

    return(
        <nav className='navbar'>
            <ul className='navbarlist'>
                <li className='navbarlist__item'>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className='navbarlist__item navbarlist__item--btnclose'>
                    <button onClick={ () => { auth.signout() }}>
                      Cerrar sesión
                    </button>
                </li>
            </ul>
        </nav>
    )
}