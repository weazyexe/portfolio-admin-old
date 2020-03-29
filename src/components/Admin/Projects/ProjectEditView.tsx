import * as React from 'react';
import { Component } from 'react';
import { queryParse } from "../../../lib/utils";
import Project from "../../../models/Project";
import {inject, observer} from "mobx-react";
import ProjectsState from "../../../stores/components/ProjectsState";
import ProjectFormState from "../../../stores/forms/ProjectFormState";
import AdminHeader from "../../Views/AdminHeader";
import AdminPages from "../../../models/AdminPages";
import ProjectForm from "../../Forms/ProjectForm";

interface ProjectEditViewProps {
    projectsState?: ProjectsState
    projectFormState: ProjectFormState
}

@inject('projectsState')
@inject('projectFormState')
@observer
export default class ProjectEditView extends Component<ProjectEditViewProps> {

    async componentDidMount() {
        const { projectsState, projectFormState } = this.props;

        if (projectsState && projectFormState) {
            projectFormState.loading = true;
            const params = queryParse(window.location.pathname);
            projectFormState.item = await projectsState.getProject(params.pid);
            projectFormState.loading = false;
            this.forceUpdate();
        }
    }

    onSave = async (data: any) => {
        const { projectsState, projectFormState } = this.props;

        if (projectsState && projectFormState) {
            projectFormState.loading = true;

            const images: string[] = [];

            for (const img of data.images) {
                // if the image is new added
                if (img.includes("data:image/")) {
                    const link = await projectsState.saveProjectImage(img, data.id);
                    images.push(link);
                } else {
                    images.push(img);
                }
            }

            // const github = await projectsState.getRepositoryState(data.github);

            const project: Project = {
                id: data.id,
                name: data.name,
                description: data.description,
                images: images,
                sortWeight: data.sortWeight,
                tags: data.tags.map((it: any) => it.value),
                hidden: data.hidden,
                color: data.color
            };

            await projectsState.updateProject(project, true);
            projectFormState.loading = false;
        }
    };

    render() {
        const { projectFormState } = this.props;
        document.title = "edit project - weazyexe.dev";

        if (projectFormState) {
            return <div>
                <AdminHeader page={AdminPages.PROJECTS}/>
                <div className='m-1'>
                    <ProjectForm mode='edit' item={projectFormState.item} onSave={(data) => this.onSave(data)} />
                </div>
            </div>;
        }

        return <div/>;
    }
}
