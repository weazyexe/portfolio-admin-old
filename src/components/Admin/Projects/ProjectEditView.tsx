import * as React from 'react';
import { Component } from 'react';
import { queryParse } from "../../../lib/utils";
import Project from "../../../models/Project";
import { inject, observer } from "mobx-react";
import ProjectsState from "../../../stores/components/ProjectsState";
import ProjectFormState from "../../../stores/forms/ProjectFormState";
import AdminHeader from "../../Views/AdminHeader";
import AdminPages from "../../../models/AdminPages";
import ProjectForm from "../../Forms/ProjectForm";
import { Redirect } from "react-router";
import { EDIT_PROJECT_TITLE } from "../../../lib/documentTitles";
import { logPageView } from "../../../lib/firebase";

interface ProjectEditViewProps {
    projectsState?: ProjectsState
    projectFormState?: ProjectFormState
}

interface ProjectEditViewState {
    saved: boolean
}

@inject('projectsState')
@inject('projectFormState')
@observer
export default class ProjectEditView extends Component<ProjectEditViewProps, ProjectEditViewState> {

    state = {
        saved: false
    };

    async componentDidMount() {
        const { projectsState, projectFormState } = this.props;

        if (projectsState && projectFormState) {
            projectFormState.loading = true;
            const params = queryParse(window.location.search);
            const item = await projectsState.getProject(params.pid);

            projectFormState.name = item.name;
            projectFormState.description = item.description;
            projectFormState.color = item.color;
            projectFormState.images = item.images;
            projectFormState.tags = item.tags.map(it => ({ value: it, label: it }));
            projectFormState.sortWeight = Number(item.sortWeight);
            projectFormState.hidden = item.hidden;
            projectFormState.github = item.github?.link!;

            projectFormState.loading = false;
        }

        logPageView(EDIT_PROJECT_TITLE, window.location.pathname);
    }

    eraseForm = () => {
        const { projectFormState } = this.props;

        if (projectFormState) {
            projectFormState.name = '';
            projectFormState.description = '';
            projectFormState.color = '';
            projectFormState.images = [];
            projectFormState.tags = [];
            projectFormState.sortWeight = 0;
            projectFormState.hidden = false;
            projectFormState.github = '';
        }
    }

    onSave = async (data: any) => {
        const { projectsState, projectFormState } = this.props;

        if (projectsState && projectFormState) {
            projectFormState.loading = true;

            const images: string[] = [];
            const params = queryParse(window.location.search);

            for (const img of data.images) {
                // if the image is new added
                if (img.includes("data:image/")) {
                    const link = await projectsState.saveProjectImage(img, params.pid);
                    images.push(link);
                } else {
                    images.push(img);
                }
            }

            const github = await projectsState.getRepositoryState(data.github);

            const project: Project = {
                id: params.pid,
                name: data.name,
                description: data.description,
                images,
                sortWeight: data.sortWeight,
                tags: data.tags.map((it: any) => it.value),
                hidden: data.hidden,
                color: data.color,
                github
            };

            await projectsState.updateProject(project, true);
            projectFormState.loading = false;
            this.eraseForm();

            this.setState({
                saved: true
            });
        }
    };

    render() {
        const { projectFormState } = this.props;
        const { saved } = this.state;
        document.title = EDIT_PROJECT_TITLE;

        if (saved) {
            return <Redirect to='/admin/projects'/>;
        }

        if (projectFormState) {
            return <div>
                <AdminHeader page={AdminPages.PROJECTS}/>
                <div className='m-1'>
                    <ProjectForm mode='edit' onSave={(data) => this.onSave(data)} />
                </div>
            </div>;
        }

        return <div/>;
    }
}
