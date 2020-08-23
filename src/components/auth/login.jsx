import React, {useState, useContext, useEffect} from 'react'

import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/autentication/authContext';

const Login = (props) => {
    // Extraer los  valors del context 
    const alertaContext = useContext(AlertaContext);
    const {alerta , mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje ,autenticado , iniciarSession } = authContext;

    //En caso de que el password o usuario no exista
    useEffect(()=>{
         if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);



    //ESta par iniciar session
    const [usuario, setSaveUsuario] = useState({
        email:'',
        password:''
    });

    const {email, password} = usuario;

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
        if(email.trim()=== '' || password.trim=== ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return ;
        }
        // Pasar al acciion
        iniciarSession({email,password});
    }

    return ( 
        <div className="form-usuario">
             { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
            <div className="contenedor-form sombra-dark">
                <h2>Iniciar Sessión</h2>
                <form 
                    onSubmit={onSudmit}
                
                >
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
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sessión" />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'}  className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;