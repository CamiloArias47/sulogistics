import {useAuth} from '../context/authcontext'
import NavBar from "./navbar"

export default function Header(){

    const auth = useAuth()
    let name = (auth.user) ? auth.user.name : ''
    let lastname = (auth.user) ? auth.user.lastname : ''
    let email = (auth.user) ? auth.user.email : ''

    return(
        <header className="header">
            <div className="header__top">
                <div className="header__userinfo">
                    <h1>{name} {lastname}</h1>
                    <span>mail: {email}</span>
                    <span>rol: Ejecutivo de ventas</span>
                </div>
                <div className='header__verified'>
                    <img src="/img/icons/verified.svg" alt="Verificado"/>
                    <span>Verificado</span>
                </div>
            </div>
            <div className="header__bottom">
                <NavBar />
            </div>
        </header>
    )
}