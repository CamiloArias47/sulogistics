import { useAuth } from 'src/context/authcontext'
import { useApi } from 'src/hooks/useApi'
import CardId from 'src/components/card-id'
import CardSUbordinates from 'src/components/card-dubordinates'
import { useEmployee } from 'src/context/employeed-context';

import '../styles/Card.css';
import { useEffect } from 'react';
export default function Dashboard(){
    const auth = useAuth()
    const { setUser, setTotalSales, setDataBoss, setSubordinates } = useEmployee()
    const {token, user} = auth
    const {id} = user

    const routeApi = process.env.REACT_APP_API_URL
    const route = `${routeApi}/api/users/subordinates/${id}/`
    const headers = {Authorization: 'Token '+token}

    //tine una propiedad loading para poner un loader
    const { data} = useApi({route, headers })

    useEffect( () => {
        if( data ){
           setUser(data.user)  
           setTotalSales(data.subtes_tsales)
           setDataBoss(data.boss)
           setSubordinates(data.subordinates)
        } 
    },[data, setUser, setTotalSales, setDataBoss, setSubordinates])


    const loadEmployeedData = (id) => {
        const employedRoute = `${routeApi}/api/users/subordinates/${id}/`
        const options = {
            method:'GET',
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            }
        }
        fetch(employedRoute,options)
            .then(resp => resp.json() )
            .then(data => {
                setUser(data.user)  
                setTotalSales(data.subtes_tsales)
                setDataBoss(data.boss)
                setSubordinates(data.subordinates)
            })
        
    }

    return(
            <div className="dashboardhome">
                <div className="dashboardhome__block dashboardhome--title">
                    <h1>
                    <img src="/img/icons/id-doc-32px.svg" alt="id de usuario"/>
                        Perfil de usuario
                    </h1>
                </div>

                <CardId loadEmployeedData={loadEmployeedData}/>
                <CardSUbordinates loadEmployeedData={loadEmployeedData}/>
            </div>
    )
}