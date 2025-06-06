import { Navigate } from "react-router-dom"

const Authenticated = ({children}) => {
  const token= localStorage.getItem('userToken')
    if(token){
    return<Navigate to={'/'}/>
  }
return children
}

export default Authenticated