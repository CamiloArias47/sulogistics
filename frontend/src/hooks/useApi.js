import {useState, useEffect} from 'react'

export const useApi = ({route, method = 'GET', body = {}, headers = {} }) => {
  const [loading, setLoading] = useState(false)
	const [data, setData] = useState() 
    
  body = JSON.stringify(body)

  const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body
  }

  if(method === 'GET') delete options.body
	
	useEffect(() => {
	  setLoading(true)
	  fetch(route, options)
	    .then(data => data.json())
	    .then(json => {
	      setData(json)
	      setLoading(false)
	    })
	 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

    return {loading, data}
}