import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/autentication/authContext';

const NuevaCuenta = (props) => {
     // Extraer los  valors del context 
    const alertaContext = useContext(AlertaContext);
    const {alerta , mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje ,autenticado , registrarUsuario } = authContext;

    /* 
        En caso de que el usuario  
       se haya autenticado o registrado o 
       sea un registro duplicado
         
    */
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    /*Nota: Como se usa react router-dom se tiene accesos al prop.historiy por eso se puede pasar props en la funcion */



    //ESta par iniciar session
     const [usuario, setSaveUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''

    });

    const {nombre ,email, password, confirmar} = usuario;

    const onChange = e =>{
        setSaveUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        });
    }

    //Cuando el usuario queire iniciar session
    const onSudmit = e =>{
        e.preventDefault();

        //Validar que no haya campos vacios
        if(nombre.trim() === '' || 
        email.trim() === '' ||
        password.trim() === '' ||
        confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return ;
        } 

        // Password minimo de 6 caracteres
        if(password.length<6){
            mostrarAlerta('El password mínimo es de 6 caracteres', 'alerta-error');
            return ;
        }
        //Password sean iguales
        if(password !== confirmar){
            mostrarAlerta('Los password no son iguales','alerta-error');
            return ;
        }
        // Pasar al acciion
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
            <div className="contenedor-form sombra-dark">
                <h2>Nuevo Usuario</h2>
                <form 
                    onSubmit={onSudmit}
                >   
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Registrar" />
                    </div>
                </form>
                <Link to={'/'}  className="enlace-cuenta">
                    Volver a Iniciar sessión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;