import * as React from "react";
import { Component } from "react";
import Loader from "../Views/Controls/Loader";
import NavigationMenu from "../Views/NavigationMenu";
import { ReactComponent as Menu } from "../../assets/ui/menu.svg";
import ProjectsState from "../../stores/components/ProjectsState";
import { inject, observer } from "mobx-react";
import { PROJECTS_TITLE } from "../../lib/documentTitles";
import {logPageView} from "../../lib/firebase";

import "../../styles/navigation.scss";
import ProjectView from "../Views/ProjectView";

interface ProjectsViewProps {
    projectsState?: ProjectsState
}

interface ProjectsViewState {
    navOpened: boolean
}

@inject('projectsState')
@observer
export default class ProjectsView extends Component<ProjectsViewProps, ProjectsViewState> {

    state = {
        navOpened: false
    };

    async componentDidMount() {
        const { projectsState } = this.props;

        if (projectsState) {
            projectsState.loading = true;
            await projectsState.getProjects();
            projectsState.loading = false;
        }
        logPageView(PROJECTS_TITLE, window.location.pathname);
    }

    onNavigationClick() {
        this.setState({
            navOpened: !this.state.navOpened
        })
    }

    render() {
        const { projectsState } = this.props;
        const { navOpened } = this.state;
        document.title = PROJECTS_TITLE;

        if (projectsState) {
            const { projects } = projectsState;

            return <div>
                {projectsState?.loading ? <Loader/> :
                    <React.Fragment>
                        <NavigationMenu opened={navOpened} onClick={() => this.onNavigationClick()} />
                        <div className='main-link-icon menu-nav-button' onClick={() => this.onNavigationClick()}>
                            <Menu />
                        </div>
                        <div>
                            {projects
                                .filter(project => !project.hidden)
                                .sort((a, b) => a.sortWeight > b.sortWeight ? -1 : 1)
                                .map(project => <ProjectView key={project.id} project={project}/>)}
                        </div>
                    </React.Fragment>
                }
            </div>;
        }

        return <div/>;
    }
}
