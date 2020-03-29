import * as React from 'react';
import { Component } from 'react';
import ProjectForm from "../../Forms/ProjectForm";
import { inject, observer } from "mobx-react";
import ProjectsState from "../../../stores/components/ProjectsState";
import AdminPages from "../../../models/AdminPages";
import AdminHeader from "../../Views/AdminHeader";
import { generateId } from "../../../lib/utils";
import Project from "../../../models/Project";
import ProjectFormState from "../../../stores/forms/ProjectFormState";

interface ProjectCreateViewProps {
    projectsState?: ProjectsState
    projectFormState?: ProjectFormState
}

@inject('projectFormState')
@inject('projectsState')
@observer
export default class ProjectCreateView extends Component<ProjectCreateViewProps> {

    onSave = async (data: any) => {
        const { projectsState, projectFormState } = this.props;

        if (projectsState && projectFormState) {
            projectFormState.loading = true;

            const images: string[] = [];
            const projectId = generateId(6);

            for (const img of data.images) {
                const link = await projectsState.saveProjectImage(img, projectId);
                images.push(link);
            }

            const github = await projectsState.getRepositoryState(data.github);

            const project: Project = {
                id: projectId,
                name: data.name,
                description: data.description,
                github: github,
                images: images,
                sortWeight: data.sortWeight,
                tags: data.tags.map((it: any) => it.value),
                hidden: data.hidden,
                color: data.color
            };

            await projectsState.createProject(project, projectId);
            projectFormState.loading = false;
        }
    };

    render() {
        document.title = "create project - weazyexe.dev";
        return <div>
            <AdminHeader page={AdminPages.PROJECTS}/>
            <div className='m-1'>
                <ProjectForm mode='create' onSave={(data) => this.onSave(data)} />
            </div>
        </div>;
    }
}
