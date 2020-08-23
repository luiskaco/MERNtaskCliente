import React, {useContext} from 'react'
import proyectoContext from '../../context/projects/projectsContext';
import TareaContext from '../../context/tasks/taskContext';

const Tarea = ({tarea}) => {

    const {nombre} = tarea;

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtener la funcion del context de tareas
    const tareaContext = useContext(TareaContext);
    const { 
         eliminarTarea , 
         obtenerTareas ,
         actualizarTarea ,
         guardarTareaActual
        } = tareaContext;


    //Extraer el proyecto
    //[0][1] proyecto[0].id
    const [proyectoActual] = proyecto;

    /*funcion que se ejecuta cuanedo el usuario presiona el
     btn de elminar trea
    */
    const eliminarTareaBtn = id =>{
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    // Funcion que modifica el estado  de las tareas
    const cambiarEstado = tarea => {
      
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }

        actualizarTarea(tarea);
    }


    //Agrega una tarea actual cuando el usaurio desea editarla
    const selecionarTarea = tarea => {
        guardarTareaActual(tarea);
    }


    return ( 
        
        <li className="tarea sombra">
            <p>{nombre}</p>
        
        <div className="estado">
            {tarea.estado  
            ? 
                (
                    <button
                        type="button"
                        className="completo"
                        onClick={() =>cambiarEstado(tarea)}
                    >Completo
                    </button>
                ) 
            :
                (
                    <button
                        type="button"
                        className="incompleto"
                        onClick={() =>cambiarEstado(tarea)}
                    >Incompleto
                    </button>
                )
            }
        </div>
        <div className="acciones">
            <buttton
                type="button"
                className="btn btn-primario"
                onClick={()=>selecionarTarea(tarea)}
                >
                
                Editar
            </buttton>
            <button
                type="button"
                className="btn btn-secundario"
                onClick={()=>eliminarTareaBtn(tarea._id)}
            >
                Eliminar
            </button>
        </div>
        </li>
     );
    
}
 
export default Tarea;