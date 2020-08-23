import React, {useContext, useEffect} from 'react'
import Sidebar from '../layout/sidebar';
import Barra from '../layout/bar';
import FomTarea from '../task/taskForm';
import ListadoTareas from '../task/taskListing';

// Importar authContext
import AuthContext from '../../context/autentication/authContext';


const Proyectos = () => {
    //VALIDACION de AUTENTICACION
          // Extrar la informacion de usuario autenticad
          const authContext = useContext(AuthContext);
          const { usuarioAutenticado } = authContext;
          
          useEffect(()=>{
               usuarioAutenticado();
               // eslint-disable-next-line
          },[])
     //END VALIDACION de AUTENTICACION

     return ( 
       <div className="contenedor-app">
                
                <Sidebar />

           <div className="seccion-principal">
                <Barra />
                    
                <main>
                   <FomTarea />
                   <div className="contenedor-tareas">
                        <ListadoTareas />
                   </div>
                </main>
           </div>
       </div>
     );
}
 
export default Proyectos;