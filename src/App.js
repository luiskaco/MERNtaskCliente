import React from 'react';
import Login from './components/auth/login';
import NuevaCuenta from './components/auth/new-acount';
import Proyectos from './components/projects/projects';

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Logica
import ProyectoState from './context/projects/projectState';
import TareaState from './context/tasks/taskState';
import AlertaState from './context/alerts/alertState';
import AuthState from './context/autentication/authState';

// Importar el Higher-Order Components para validar rutas
import RutaPrivada from './components/path/pathPrivate';

// -importar toek
import tokenAuth from './config/tokenAuth';

// Revisar si tenemos un token
const token= localStorage.getItem('token');
if(token){
  tokenAuth(token);
}


function App() {

//  console.log(process.env.REACT_APP_API_URL);

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                  <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
