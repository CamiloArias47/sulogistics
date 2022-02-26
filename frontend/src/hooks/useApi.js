import {useState, useEffect} from 'react'

export const useApi = ({route, method = 'GET', body = {} }) => {
    const [loading, setLoading] = useState(false)
	const [data, setData] = useState() 
    
    body = JSON.stringify(body)

    const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body
    }
	
	useEffect(() => {
	  setLoading(true)
	  fetch(route, options)
	    .then(data => data.json())
	    .then(json => {
	      setData(json)
	      setLoading(false)
	    })
	 
	}, [])

    return {loading, data}
}