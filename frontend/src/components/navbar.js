import {useAuth} from '../context/authcontext'
import { useGetEmployee } from 'src/context/employeed-context';

export default function NavBar(){

    const auth = useAuth()
    const { getEmployee } = useGetEmployee()
    const { id } = auth.user

    return(
        <nav className='navbar'>
            <ul className='navbarlist'>
                <li className='navbarlist__item'>
                    <button onClick={ () => { getEmployee(id) } }>
                        Dashboard
                    </button>
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