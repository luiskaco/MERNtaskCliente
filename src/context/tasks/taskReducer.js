
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
  
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';


export default  (state , action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareaproyecto:action.payload
                //Api ya hace el filtrado
                // tareaproyecto: state.tareaproyecto.filter(tarea => tarea.proyectoId === action.payload)
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tareaproyecto:[action.payload, ...state.tareaproyecto],
                errorTarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareaproyecto: state.tareaproyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
     
            return {
                ...state,
                tareaproyecto: state.tareaproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSelecionada: action.payload
            }
        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaSelecionada: null
            }
        default:
            return state;
    }
}