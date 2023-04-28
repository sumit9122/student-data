import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Protected = (props) => {
  const { children } = props
  const navigate = useNavigate()

  let isLoggedIn = window.localStorage.getItem("isLogedIn");
  let token = window.localStorage.getItem("token");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default Protected