import * as React from 'react';
import { Component } from 'react';
import ProjectForm from "../../Forms/ProjectForm";
import { inject, observer } from "mobx-react";
import ProjectsState from "../../../stores/components/ProjectsState";
import AdminPages from "../../../models/AdminPages";
import AdminHeader from "../../Views/AdminHeader";

interface ProjectCreateViewProps {
    projectsState?: ProjectsState;
}

@inject('projectsState')
@observer
export default class ProjectCreateView extends Component<ProjectCreateViewProps> {

    onSave = (data: any) => {
        const { projectsState } = this.props;

        if (projectsState) {

        }
    };

    render() {
        console.log(1);
        return <div>
            <AdminHeader page={AdminPages.PROJECTS}/>
            <div className='m-1'>
                <ProjectForm mode='create' onSave={(data) => this.onSave(data)} />
            </div>
        </div>;
    }
}
