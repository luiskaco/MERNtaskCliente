import React,{Fragment, useContext} from 'react';
import Tarea from './task';
import proyectoContext from '../../context/projects/projectsContext';
import TareaContext from '../../context/tasks/taskContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {
    // Extraer listado de tareas
    const proyectosContext = useContext(proyectoContext);
    const { proyecto ,elimianrProyecto} = proyectosContext;

     //Obtener la funcion del context de tareas
     const tareaContext = useContext(TareaContext);
     const { tareaproyecto } = tareaContext;


    //Si no hay ningun proyecto
    if(!proyecto) return <h2>Seleciona un proyecto</h2>

    // array destructuring para extrar el proyecto actual
    const [proyectoActual] = proyecto;

    //Eliminar Proyecto
    const onClickEliminar = () => {
        elimianrProyecto(proyectoActual._id);
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
  
                {
                  tareaproyecto.length === 0 
                  ? (<li className="tarea"><p>No hay tareas</p></li>)
                  : 
                  <TransitionGroup>
                   { tareaproyecto.map(tarea =>(
                       <CSSTransition
                             key={tarea.id} // Primer hijo
                            timeout={200}
                            className="tarea"

                            /*NotA: Las clases que estan en el css 
                            son las encargada de crear las animaciones 
                                Se encarga de agregar las clases la libreria
                            */
                      >
                            <Tarea 
                               // key={tarea.id}
                                tarea={tarea}
                            />
                        </CSSTransition>
                    
                    ))}
                  </TransitionGroup>
                }

           
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => onClickEliminar()}
            >Eliminar Proyecto &times;

            </button>

            
        </Fragment>
     );
}
 
export default ListadoTareas;