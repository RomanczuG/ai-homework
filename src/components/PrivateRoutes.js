// import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const PrivateRoutes = () => {
  // let auth = {'token':true}
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  // naviage to login page if not logged in
  const navigate = useNavigate()
  // function to log out
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setError(error)
    }
    else
    {
      navigate('/')
    }

      
  }

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
} else if (!data || !data['session']) {
  navigate('/login')
  return <div>Loading...</div>
} else {
  // return <><div>Session data: {JSON.stringify(data)}</div> <button onClick={handleLogout}> logout</button> </>
  return <><Outlet/>  </>
}
// return (
//     auth.token ?  : <Navigate to='/login'/>
//   )
}



// function PrivateComponent() {


  

  
  
// }