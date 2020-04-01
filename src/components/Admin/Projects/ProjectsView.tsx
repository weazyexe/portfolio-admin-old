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
import Toast from "../../Views/Controls/Toast";

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

    onProjectDelete = async (project: Project) => {
        const { projectsState } = this.props;
        // eslint-disable-next-line no-restricted-globals
        if (projectsState && confirm(`Are you sure for delete ${project.name}?`)) {
            await projectsState.deleteProject(project);
            projectsState.projects = projectsState.projects.filter(it => it.id !== project.id);
            alert('Ok, you did it');
        }
    };

    onProjectHide = async (project: Project) => {
        const { projectsState } = this.props;

        // eslint-disable-next-line no-restricted-globals
        if (projectsState && confirm(`Ok, rly wanna ${project.hidden ? 'show' : 'hide'} ${project.name}?`)) {
            await projectsState.updateProject({ ...project, hidden: !project.hidden });
            projectsState.projects = projectsState.projects.map(it => {
                if (it.id === project.id) {
                    return { ...project, hidden: !project.hidden };
                } else {
                    return it;
                }
            });

            alert('Ok, you did it');
        }
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

                                {projectsState?.showToast && <Toast text='Projects list updated' />}

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
