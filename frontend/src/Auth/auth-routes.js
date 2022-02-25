import{useAuth} from '../context/authcontext'
import {
    useLocation,
    Navigate,
  } from "react-router-dom"

export default function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      // se redirecciona a el login, pero se guarda la ruta a la que queria ingresar
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
  }