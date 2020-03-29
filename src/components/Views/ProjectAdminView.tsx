import * as React from "react";
import { Component } from "react";
import Project from "../../models/Project";

import '../../styles/views.scss';

import deleteButton from '../../assets/delete.svg';
import editButton from '../../assets/edit.svg';
import visibilityButton from '../../assets/visibility.svg';
import visibilityOffButton from '../../assets/visibility_off.svg';
import {Link} from "react-router-dom";

interface ProjectAdminViewProps {
    project: Project
    onDeleteClick: () => void
    onHideClick: () => void
    className?: string
}

export default class ProjectAdminView extends Component<ProjectAdminViewProps> {

    render() {
        const { project, onDeleteClick, className } = this.props;

        return <div
            className={`project-admin inline p-1 ${className}`}
            style={{ background: project.color }}>

            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
                <div className='project-admin-buttons' style={{ marginRight: '0.5em' }}>
                    <Link to={`/admin/projects/edit?pid=${project.id}`} className='project-admin-icon'>
                        <img src={editButton} alt='Edit' className='project-admin-icon' />
                    </Link>
                    <a className='project-admin-icon'>
                        <img src={project.hidden ? visibilityButton : visibilityOffButton} alt='Show or hide' className='project-admin-icon' />
                    </a>
                    <a className='project-admin-icon'>
                        <img src={deleteButton} alt='Delete' className='project-admin-icon' />
                    </a>
                </div>
            </div>
        </div>
    }
}
