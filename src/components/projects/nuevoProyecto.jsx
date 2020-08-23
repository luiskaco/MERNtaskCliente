import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/projects/projectsContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { 
        formulario, 
        errorformulario,
        mostrarFormulario, 
        agregarProyecto,
        mostrarError
    } = proyectosContext;

    //Estate para proyectos
    const [proyecto, setSaveGuardar] =  useState({
        nombre:''
    });
    //Extreaer Nombre del proyecto
    const {nombre} = proyecto;

    //Lee los contenidos del input
    const onChangeProyecto= e =>{
        setSaveGuardar({
            ...proyecto,
            [e.target.name]:e.target.value
        });
    }

    //Cuando el usuario enviaun proyecto
    const onSubmitProyecto = e =>{
        e.preventDefault();

        //Validar
        if(nombre === ''){
            mostrarError(true);
            return;
        }
        mostrarError(false);

        //Agregar al stete
        agregarProyecto(proyecto);

        //REinciiar el form
        setSaveGuardar({
            nombre:''
        });
    }

    return ( 
        <Fragment>

            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={()=>mostrarFormulario()}

                >Nuevo Proyecto
            </button>


            {   formulario 
                ?
                    (
                        <form 
                            className="formulario-nuevo proyecto"
                            onSubmit={onSubmitProyecto}
                            >
                            <input 
                                type="text"
                                className="input-text"
                                placeholdr="Nombre Proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProyecto}
                            />
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto" 
                                />
                        </form>
                     )
               : null
            }

            {errorformulario ? 
            <p className="mensaje error">
                El Nombre del Proyecto
            </p> : null }
            

        </Fragment>

     );
}
 
export default NuevoProyecto;