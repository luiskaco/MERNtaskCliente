import React, {useContext, useEffect} from 'react'
import Proyecto from './projectOnly';
import proyectoContext from '../../context/projects/projectsContext';
import AlertaContext from '../../context/alerts/alertContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoProyectos = () => {
    // Extraer proyecto del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyecto } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //Obtener proyecto cuando carga el componente
    useEffect(() => {
        obtenerProyecto();
        
        //Si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        // eslint-disable-next-line 
    }, [mensaje])

    //Si proyecto tiene contenido
    if(proyectos.length === 0) return <p>No hay proyecto, comienza creando uno</p>;

    return ( 
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>): null}

            <TransitionGroup>
                {proyectos.map(proyecto =>(
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        className="proyecto"
                    >   
                        <Proyecto
                            //key={proyecto.id}
                            proyecto={proyecto} 
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;