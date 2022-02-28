import React, { useCallback, useMemo } from 'react'
import { useAuth } from 'src/context/authcontext'

const EmployeedContext = React.createContext(null);
const routeApi = process.env.REACT_APP_API_URL

const initialState = {
    name: '',
    lastname: '',
    lastname2: '',
    national_id: '',
    birthday: '',
    gender: '',
    start_date: '',
    employee_id: '',
    position: '',
    boss: '',
    zone: '',
    city: '',
    department: '',
    sales: '',
    email: '',
    picture: '',
    phone: '',
    totalSales : 0,
    dataBoss : {},
    subordinates: [],
}

//reducer para manejar la información de empleados a mostras
function employeddReducer(state, action){
    switch(action.type){
        case 'set_user' : {
            return {
                ...state,
                name: action.user.name,
                lastname: action.user.lastname,
                lastname2: action.user.lastname2,
                national_id: action.user.national_id,
                birthday: action.user.birthday,
                gender: action.user.gender,
                start_date: action.user.start_date,
                employee_id: action.user.employee_id,
                position: action.user.position,
                boss: action.user.boss,
                zone: action.user.zone,
                city: action.user.city,
                department: action.user.department,
                sales: action.user.sales,
                email: action.user.email,
                picture: action.user.picture,
                phone: action.user.phone,
            }
        }

        case 'set_toal_sales' : {
            return {
                ...state,
                totalSales: action.tsales
            }
        }

        case 'set_data_boos' : {
            return {
                ...state,
                dataBoss: action.boss
            }
        }

        case 'set_subordinates' : {
            return {
                ...state,
                subordinates: action.subordinates
            }
        }
        default: {
            return{
                ...state
            }
        }
    }
}

export default function EmployeedProvider({ children }) {
    const [state, dispatch] = React.useReducer(employeddReducer, initialState)

    const setUser = useCallback(
        (user) => { dispatch({ type: 'set_user', user }) },
        [dispatch]
    )

    const setTotalSales = useCallback(
        (tsales) => { dispatch({ type: 'set_toal_sales', tsales}) },
        [dispatch]
    )

    const setDataBoss = useCallback(
        (boss) => { dispatch({ type: 'set_data_boos', boss}) },
        [dispatch]
    )
    
    const setSubordinates = useCallback(
        (subordinates) => { dispatch({ type: 'set_subordinates', subordinates}) },
        [dispatch]
    )
    

    const value = useMemo(
        () => ({
            ...state,
            setUser,
            setTotalSales,
            setDataBoss,
            setSubordinates
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state]
    )
    
    return <EmployeedContext.Provider value={value}>{children}</EmployeedContext.Provider>;
}

export const useEmployee = () => {
    return React.useContext(EmployeedContext);
}

export const useGetEmployee = () => {
        const auth = useAuth()
        const { setUser, setTotalSales, setDataBoss, setSubordinates } = useEmployee()

        function getEmployee(id){
            const {token, user, setSubordinatesId} = auth
            const employedRoute = `${routeApi}/api/users/subordinates/${id}/`
            const headers = {Authorization: 'Token '+token}
    
            const options = {
                method:'GET',
                headers: {
                  'Content-Type': 'application/json',
                  ...headers,
                }
            }
            return fetch(employedRoute,options)
                    .then( resp => resp.json() )
                    .then( data => {
                        setUser(data.user)  
                        setTotalSales(data.subtes_tsales)
                        setDataBoss(data.boss)
                        setSubordinates(data.subordinates)
                        if(user.id === id){
                            setSubordinatesId(data.subordinates_ids)
                        }
                    })
        }

        return {
           getEmployee 
        }
}