import React, {useContext, useState , useEffect} from 'react'
import proyectoContext from '../../context/projects/projectsContext';
import TareaContext from '../../context/tasks/taskContext';

const FomTarea = () => {
    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtener la funcion del context de tareas
    const tareaContext = useContext(TareaContext);
    const { 
        tareaSelecionada, 
        errorTarea , 
        agregarTarea , 
        validarTarea ,
        obtenerTareas,
        actualizarTarea,
        limpiarTareaSelecionada
     } = tareaContext;
 
    // Effect que detecta que una tarea fue selecionada

    useEffect(() => {
        if(tareaSelecionada !== null){
            setSaveTarea(tareaSelecionada);
        }else{
            setSaveTarea({
                nombre:''
            });
        }
    }, [tareaSelecionada])

    //State del formualario 
    const [tarea, setSaveTarea] = useState({
        nombre:''
    })


    //Extraer el nombre del proyecto 
    const { nombre } = tarea;

    //Si no hay ningun proyecto
    if(!proyecto) return null

    // array destructuring para extrar el proyecto actual
    const [proyectoActual] = proyecto;

    //leer los valores del formulario
    const handleChange = e =>{
        setSaveTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        //Validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }


        //Revisar si es edicion o es registro de tarea
        if(tareaSelecionada ===null ){

            // Agregar la nueva ta al sta   re de tares
           // tarea.estado  = false;
            tarea.proyecto = proyectoActual._id;    
            agregarTarea(tarea);

        }else{
            //Actualizar tarea existente
            actualizarTarea(tarea);

            //Elimina tarea selecionada del state
            limpiarTareaSelecionada();
        }

        //Obtener y filtrar las tareas del proyecto actuql 
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        setSaveTarea({
            nombre: ''
        })
    }

    return (  
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primary btn-submit btn-block"
                        value={tareaSelecionada ? "Editar Tarea" : "Agregar Tarea"  }                 
                   />
                </div>
            </form>

            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>: null}

        </div>
        
     );
}
 
export default FomTarea;