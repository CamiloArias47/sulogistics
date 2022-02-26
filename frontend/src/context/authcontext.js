import * as React from "react";

let AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
  
  const api = process.env.REACT_APP_API_URL || 'localhost:8000'
  const loginRoute = `${api}/login`

  let localUser = null
  if( localStorage.getItem('token') ){
    localUser = JSON.parse( localStorage.getItem('user') )
  }

  let [user, setUser] = React.useState(localUser);
  
  /**
   * realiza una peticion post a la api de login
   * si es exitoso el login se guarda el token 
   * en el loclaStorage
   */
  let signin = ({password, username}) => {

    const options = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({username,password})
  }

    return fetch(loginRoute,options)
            .then( data => data.json() )
            .then( data => {
                if(data.msg) throw new Error(data.msg)
                return data
            })
            .then( data => {
                localStorage.setItem('token',data.token)
                localStorage.setItem('user', JSON.stringify(data.user) )
                return data
            })
            .then( data => {
              setUser(data.user)
            })
  };


  let signout = () => {
    const token = localStorage.getItem('token')
    const logoutRoute = `${api}/logout?token=${token}`

    return fetch(logoutRoute)
            .then( resp => resp.json() )
            .then(data => {
              if(data.msg === 'loged out'){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setUser(null)
              }
            })
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(AuthContext);
}