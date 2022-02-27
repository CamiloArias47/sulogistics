import { useEmployee, useGetEmployee } from 'src/context/employeed-context';
import { formatPrice } from 'src/utils';



export default function CardSUbordinates(){

    const { subordinates } = useEmployee() 
    const { getEmployee } = useGetEmployee()

    return(
        <div className="dashboardhome__block dashboardhome--subordinates">
            <div className="card">
                <div className='card_title'>
                    <h4>Subalternos</h4>
                </div>
                <ul  className='card__list card__list--table'>
                    <li className="card__item">
                        <span>Nombre</span>
                        <span>Ventas</span>
                    </li>
                    {   
                        subordinates 
                            ? subordinates.map( sub => {
                                    return <ListDetail 
                                                key={sub.id}      
                                                name={sub.name} 
                                                lastname={sub.lastname} 
                                                lastname2={sub.lastname2}
                                                sales={sub.sales}
                                                id={sub.id}
                                                loadEmployeedData={getEmployee}
                                            />
                                })
                            :''
                    }
                </ul>
            </div>
        </div>
    )
}
 

function ListDetail({name, lastname, lastname2, id, sales, loadEmployeedData}){
    

    const handlerClick = event => {
        event.preventDefault()
        loadEmployeedData(id)
    }
    return(
        <li className="card__item card__item--detail">
            <span>
                <button onClick={handlerClick}>
                    {name} {lastname} {lastname2}
                </button>
            </span>
            <span>{ formatPrice(sales) }</span>
        </li>
    )
}