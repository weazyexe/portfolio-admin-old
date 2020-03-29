import * as React from 'react';
import {Component} from 'react';
import {inject, observer} from "mobx-react";
import ProjectsState from "../../../stores/components/ProjectsState";
import Loader from "../../Views/Controls/Loader";
import ProjectAdminView from "../../Views/ProjectAdminView";
import Project from "../../../models/Project";

import add from '../../../assets/add.svg';
import {Redirect} from "react-router";
import AdminHeader from "../../Views/AdminHeader";
import AuthState from "../../../stores/components/AuthState";
import AdminPages from "../../../models/AdminPages";
import {auth} from "../../../lib/firebase";
import {Link} from "react-router-dom";

interface ProjectsViewProps {
    projectsState?: ProjectsState
    authState?: AuthState
}

@inject('projectsState')
@inject('authState')
@observer
export default class ProjectsView extends Component<ProjectsViewProps> {

    constructor(props: ProjectsViewProps) {
        super(props);
        this.authStateChanged();
    }

    async componentDidMount() {
        const { projectsState } = this.props;

        if (projectsState) {
            projectsState.loading = true;
            await projectsState.getProjects();
            projectsState.loading = false;
        }
    }

    authStateChanged = () => {
        const { authState } = this.props;

        auth.onAuthStateChanged((user) => {
            if (authState) {
                authState.isSignedIn = !!user;
                authState.loading = false;
            }
        })
    };

    onProjectCreate = async (project: Project) => {

    };

    onProjectDelete = async (project: Project) => {

    };

    onProjectEdit = async (project: Project) => {

    };

    onProjectHide = async (project: Project) => {

    };

    render() {
        const { projectsState, authState } = this.props;
        document.title = 'projects - weazyexe.dev';

        if (!authState?.isSignedIn) {
            return <Redirect to='/auth' />;
        }

        return <div>
            {authState?.loading
                ? <Loader/>
                : <div>
                    <AdminHeader page={AdminPages.PROJECTS}/>

                    <div className='m-1'>
                        { projectsState?.loading ? <Loader /> :
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <Link to='/admin/projects/create'>
                                    <div
                                        className='project-admin p-1'
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                        <img src={add} alt='Add button' style={{ width: '8em' }} />
                                    </div>
                                </Link>
                                {
                                    projectsState?.projects.map(project =>
                                        <ProjectAdminView
                                            key={project.id}
                                            project={project}
                                            onDeleteClick={() => this.onProjectDelete(project)}
                                            onHideClick={() => this.onProjectHide(project)} />)
                                }
                            </div>
                        }
                    </div>
                </div>
            }
        </div>;
    }
}
