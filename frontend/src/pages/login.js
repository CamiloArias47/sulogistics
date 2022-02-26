import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {useAuth} from '../context/authcontext'
import { Spinner } from "../icons/index";


export default function Login(){
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let from = location.state?.from?.pathname || "/dashboard";

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect( () => {
        if(auth.user) 
            navigate('/dashboard') 
    },[auth])

    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)

        auth.signin({username: mail,password})
                .then( () => { setLoading(false) })
                .catch(err => {
                    setError(true)
                    setErrorMsg(err.message)
                    setLoading(false)
                })
    }

    const handlerChange = event => {
        const {value, name} = event.target
        if(name === 'mail') setMail(value)
        if(name === 'password') setPassword(value)
        if(error) setError(false)
    }


    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="form">
                <h1>Iniciar sesión</h1>

                <label htmlFor="mail" className="form__label">Email</label>
                <input 
                    name="mail" 
                    className="form__input" 
                    type="email" 
                    id="mail"
                    value={mail}
                    onChange={handlerChange}
                    placeholder="example@sulogistics.com"
                    required
                />

                <label htmlFor="password" className="form__label">Contraseña</label>
                <input 
                    name="password" 
                    type="password" 
                    id="password"
                    className="form__input"
                    placeholder="*******"
                    value={password}
                    onChange={handlerChange}
                    required
                />

                <button type="submit" className="form__button" disabled={loading}>
                    { 
                        loading 
                            ? <Spinner width={24} height={24}/>
                            : 'Ingresar'
                    }
                </button>

                { 
                    error 
                        ? <div className="error">{errorMsg}</div>
                        : ''
                }
            </form>
        </div>
    );
}