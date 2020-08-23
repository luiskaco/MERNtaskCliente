import React, {useContext, useEffect} from 'react';

// Importar authContext
import AuthContext from '../../context/autentication/authContext';


const Barra = () => {
      //VALIDACION de AUTENTICACION
          // Extrar la informacion de usuario autenticad
          const authContext = useContext(AuthContext);
          const {usuario, usuarioAutenticado,cerrarSession } = authContext;
          

          useEffect(()=>{
               usuarioAutenticado();

               // eslint-disable-next-line
          },[])
     //END VALIDACION de AUTENTICACION
          //<!--<a href="#!">Cerrar Sesión</a>-->
    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
            
            <nav className="nav-principal">
                 <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() =>cerrarSession()}
                    >
                    Cerrar Sessión
                 </button>
            </nav>
        </header>
     );
}
 
export default Barra;
       