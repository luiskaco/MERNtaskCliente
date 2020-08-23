import React, {useContext} from 'react'
import proyectoContext from '../../context/projects/projectsContext';
import TareaContext from '../../context/tasks/taskContext';

const Proyecto = ({proyecto}) => {
    // Obtener el state  de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { 
        proyectoActual
    } = proyectosContext;

    //Obtener la funcion del context de tareas
    const tareaContext = useContext(TareaContext);
    const { obtenerTareas } = tareaContext;

    //Funcion para agregar el proyecto actual
    const selecionarProyectos = id =>{
        proyectoActual(id);
        obtenerTareas(id);
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => selecionarProyectos(proyecto._id)}
            >
                    {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;