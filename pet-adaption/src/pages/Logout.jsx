import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null)
    navigate('/login')
  }, [setCurrentUser, navigate])

  return (
    <div></div>
  )
}

export default Logout
