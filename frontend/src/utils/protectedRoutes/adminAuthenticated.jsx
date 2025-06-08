import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminAuthenticated = ({children}) => {
  const token= localStorage.getItem('adminToken')
    if(token){
    return<Navigate to={'/admin/dashboard'}/>
  }
return children
}

export default AdminAuthenticated
