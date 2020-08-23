import React , { useReducer } from 'react';

//import {v4 as uuid} from 'uuid';

import proyectoContext from './projectsContext';
import proyectoReducer from './projectsReducer';

import {
        FORMULARIO_PROYECTO , 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTOS,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
    } 
from '../../types';

//Importar axios
import clienteAxios from '../../config/axios';


const ProyectoState = props => {

    /*const proyectos = [
        {id: 1, nombre:'Tienda Virtual'},
        {id: 2, nombre:'Tntranet'},
        {id: 3, nombre:'Diseño de Sitio web'},
     
    ]; */

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null, 
        mensaje:null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //Serie de funciones para el CRUD del proyecto
    const mostrarFormulario = () =>{
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    //OBtener los proyectos
    const obtenerProyecto =  async () =>{
        try {
            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                type:OBTENER_PROYECTOS,
                payload:resultado.data.proyectos
            })

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload:alerta
            })
        }
      
    }

    /**
     * PAquete instalado
     * npm i -D uuid
     * 
    */

    //Agregar nuevo proyectos
    const agregarProyecto = async proyecto => {
     //   proyecto.id = uuid();

        //Proyecto en el state con 
       /* */

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);
           
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: resultado.data
            });


        }  catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload:alerta
            })
        }

        
    }

    //Mostrar mensaje de validaciones de errores
    const mostrarError = ()=>{
        dispatch({
            type: VALIDAR_FORMULARIO,
            
        })
    };


    //Selecionar el proyecto que el usaurio dio clic
    const proyectoActual= proyectoID =>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoID
        });
    }   

    //ELimina un pproyecto
    const elimianrProyecto = async proyectoID => {

        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoID}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoID
            })
        
        
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload:alerta
            })
        }
        
    } 
    
    /* 
    Recomendacon: mantener el estate con un paramotro 
    de nombre y las funcones con dos palabras 
    
    */
    return ( 
        <proyectoContext.Provider
                value={{
                    proyectos: state.proyectos,
                    formulario: state.formulario,
                    errorformulario: state.errorformulario,
                    proyecto: state.proyecto,
                    mensaje: state.mensaje,
                    mostrarFormulario,
                    obtenerProyecto,
                    agregarProyecto,
                    mostrarError,
                    proyectoActual,
                    elimianrProyecto
                   
                }}
            >
            {props.children}
        </proyectoContext.Provider>

     );
}
 
export default ProyectoState;

