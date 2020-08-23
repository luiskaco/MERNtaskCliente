import React, {useReducer} from 'react';
import TareaContext from './taskContext';
import TareaReducer from './taskReducer';
//import {v4 as uuid} from 'uuid';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
  
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareaproyecto:[],
        errorTarea:false,
        tareaSelecionada: null
    }                                                                                                                                                                                                                                                                            

    // Crear el dispath y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Crear las funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto =>{
        try {
            
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            
             /*
                Nota importante: cuando desde la vista se envia un valor como params, 
                en el back debe recibirse como req.query u no com req.body
             */

            dispatch({
                type:TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
       
    }
    //Agregar una tarea al proyecto selecionado
    const agregarTarea = async tarea =>{
       // tarea.id = uuid();
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type:AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
       
    }

    //valida y muestra un error en caso de que sea necesairo
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por Id
     const eliminarTarea = async (id, proyecto) =>{
         console.log(`${id}   ${proyecto}`);
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});

            dispatch({
                type: ELIMINAR_TAREA,
                payload:id
            })

        } catch (error) {
            console.log(error);
        }
 
     }

       //Edita o modifica una tarea
    const actualizarTarea = async tarea => {
        try {

            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            console.log(error);
        }
       
    }

     // Extrae una tarea para edición
     const guardarTareaActual = tarea =>{
         dispatch({
             type:TAREA_ACTUAL,
             payload: tarea
         })
     }

   

     //Elimina la tarea selecionada
     const limpiarTareaSelecionada = () =>{
         dispatch({
             type: LIMPIAR_TAREA
         })
     }

    return (
        <TareaContext.Provider
            value={{
                tareaproyecto: state.tareaproyecto,
                errorTarea: state.errorTarea,
                tareaSelecionada: state.tareaSelecionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTareaSelecionada
                
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;