import React from 'react';

import { Provider } from 'mobx-react';
import {Redirect, Route, Switch} from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import ProjectsState from '../stores/components/ProjectsState';
import AuthState from '../stores/components/AuthState';
import ContentState from "../stores/components/ContentState";
import ContentFormState from "../stores/forms/ContentFormState";

import MainView from "./Main/MainView";
import AuthView from "./Admin/Auth/AuthView";
import NotFound from "./NotFound";
import ProjectsView from "./Admin/Projects/ProjectsView";
import ProjectEditView from "./Admin/Projects/ProjectEditView";
import ContentView from "./Admin/Content/ContentView";
import ProjectCreateView from "./Admin/Projects/ProjectCreateView";

import '../styles/styles.scss';
import ProjectFormState from "../stores/forms/ProjectFormState";

const projectFormState = new ProjectFormState();
const contentFormState = new ContentFormState();
const contentState = new ContentState();
const projectsState = new ProjectsState();
const authState = new AuthState();

function App() {
  return (
    <div>
      <Provider
          projectsState={projectsState}
          authState={authState}
          contentState={contentState}
          contentFormState={contentFormState}
          projectFormState={projectFormState}>

        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainView} />
            <Route path='/auth' component={AuthView} />
            <Route path='/admin/content' component={ContentView} />
            <Route exact path='/admin/projects' component={ProjectsView} />
            <Route exact path='/admin/projects/create' component={ProjectCreateView} />
            <Route exact path='/admin/projects/edit' component={ProjectEditView} />
            <Redirect from='/admin' to='/admin/content' />
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>

      </Provider>
    </div>
  );
}

export default App;
