import * as React from "react";
import { Component } from "react";
import Project from "../../models/Project";

import '../../styles/views.scss';

interface ProjectAdminViewProps {
    project: Project
    onDeleteClick: () => void
    onEditClick: () => void
    onHideClick: () => void
    className?: string
}

export default class ProjectAdminView extends Component<ProjectAdminViewProps> {

    render() {
        const { project, onDeleteClick, onEditClick, className } = this.props;

        return <div
            className={`project-admin inline p-1 ${className}`}
            style={{ background: project.color }}
            onClick={() => onEditClick()}>

            <div className='project-admin-top mb-2'>
                <div className='project-admin-title'>
                    {project.name}
                </div>
                <div className='project-admin-id'>
                    {project.id}
                </div>
            </div>
            <div className='project-admin-description mb-1'>
                {project.description}
            </div>
            <div>
                {project.tags.map(tag => <div key={tag} className='project-admin-tag'>#{tag}</div>)}
            </div>
        </div>
    }
}
