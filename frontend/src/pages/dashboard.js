import { useAuth } from 'src/context/authcontext'
import CardId from 'src/components/card-id'
import CardSUbordinates from 'src/components/card-dubordinates'
import { useGetEmployee } from 'src/context/employeed-context';

import '../styles/Card.css';
import { useEffect } from 'react';
export default function Dashboard(){
    const auth = useAuth()
    const { getEmployee } = useGetEmployee()
    const { id } = auth.user

    //cargar el usuario que inicio sesion
    useEffect( () => {
        getEmployee(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
            <div className="dashboardhome">
                <div className="dashboardhome__block dashboardhome--title">
                    <h1>
                    <img src="/img/icons/id-doc-32px.svg" alt="id de usuario"/>
                        Perfil de usuario
                    </h1>
                </div>

                <CardId />
                <CardSUbordinates/>
            </div>
    )
}