import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'

export const PrivateRoutes = () => {
  // let auth = {'token':true}
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        setError(error)
      } else {
        setData(data)
      }
    }
    fetchData()
  }, [])
if (error) {
  return <div>Error: {error.message}</div>
} else if (!data) {
  return <div>Loading...</div>
} else {
  return <div>Session data: {JSON.stringify(data)}</div>
}
// return (
//     auth.token ? <Outlet/> : <Navigate to='/login'/>
//   )
}



// function PrivateComponent() {


  

  
  
// }