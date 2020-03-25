import React from 'react';

import { Provider } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import ProjectsState from '../stores/ProjectsState';
import AuthState from '../stores/AuthState';
import AdminState from '../stores/AdminState';

import MainView from "./Main/MainView";
import AuthView from "./Admin/Auth/AuthView";
import AdminView from "./Admin/AdminView";
import NotFound from "./NotFound";
import ProjectsView from "./Admin/Projects/ProjectsView";
import ProjectAddEditView from "./Admin/Projects/ProjectAddEditView";

import '../styles/styles.scss';

const projectsState = new ProjectsState();
const authState = new AuthState();
const adminState = new AdminState();

function App() {
  return (
    <div>
      <Provider
          projectsState={projectsState}
          authState={authState}
          adminState={adminState}>

        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainView} />
            <Route path='/auth' component={AuthView} />
            <Route path='/admin' component={AdminView} />
            <Route path='/projects' component={ProjectsView} />
            <Route path='/projects/create' component={ProjectAddEditView} />
            <Route path='/projects/edit?pid=:id' component={ProjectAddEditView} />
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>

      </Provider>
    </div>
  );
}

export default App;
