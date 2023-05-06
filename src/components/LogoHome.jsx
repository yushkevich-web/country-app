import { useNavigate } from 'react-router-dom'

export function LogoHome({children}) {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/')
  }
  
  return <h2 style={{cursor: 'pointer'}} onClick={handleNavigate}> {children} </h2>
}
