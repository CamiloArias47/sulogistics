import { useAuth } from 'src/context/authcontext';
import { useEmployee, useGetEmployee} from 'src/context/employeed-context';
import { formatPrice, formatDate, formatNum } from 'src/utils'

export default function CardId(){
    const { getEmployee } = useGetEmployee()
    const { name,
            lastname,
            lastname2,
            employee_id,
            picture,
            sales,
            position,
            totalSales,
            zone,
            city,
            department,
            phone,
            email,
            national_id,
            birthday,
            start_date,
            boss,
            dataBoss
    } = useEmployee() 

    const { user } = useAuth()

    const loadMyProfile = event => {
        event.preventDefault()
        getEmployee(user.id)
    }

    return(
        <div className="dashboardhome__block dashboardhome--userinfo">
            <div className="card card--personalid">
                <span className='card__pill'>activo</span>
                <div className='card_title'>
                    <img src="/img/icons/id-card.svg" alt="card icon" width="45" height="32" className='card__icon'/>
                    <div className='card__unameid'>
                        <span className='card__uname'>{name} {lastname} {lastname2}</span>
                        <span className='card__eid'># {employee_id}</span>
                    </div>
                </div>
                
                <div className='card__content'>
                    <div className='card__uinfo'>
                        <ul className='card__list'>
                            <li>{position}</li>
                            <li>{zone} : {city}-{department}</li>
                        </ul>

                        <ul className='card__list'>
                            <li><span>Teléfono: </span>{phone}</li>
                            <li><span>Email: </span>{email}</li>
                        </ul>

                        <ul className='card__list'>
                            <li><span>Cumpleaños: </span>{ formatDate(birthday) }</li>
                            <li><span>Cédula: </span>{formatNum(national_id)}</li>
                        </ul>

                        <ul className='card__list'>
                            <li><span>Ingreso: </span>{ formatDate(start_date) }</li>
                            <li>
                                <span>Jefe: </span>
                                {
                                  (boss === user.employee_id)
                                    ? <button onClick={loadMyProfile}>
                                        {dataBoss.name} {dataBoss.lastname} {dataBoss.lastname2}
                                      </button>
                                    : <span>{dataBoss.name} {dataBoss.lastname} {dataBoss.lastname2}</span> 
                                }
                            </li>
                        </ul>

                    </div>
                    <div className='card__upicture'>
                        <img src={`/img/avatars/${picture}`} alt="User Avatar" />
                        <span className='card__sales'>
                             <img src='/img/icons/co.svg' alt="cop" width="22" height="22"/>
                             { 
                              position === 'Ejecutivo Comercial'
                                ? formatPrice(sales)
                                : formatPrice(totalSales)
                             }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}