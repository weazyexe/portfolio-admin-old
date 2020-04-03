import * as React from "react";
import { Component } from "react";
import Project from "../../models/Project";

import { ReactComponent as ArrowLeft } from "../../assets/ui/arrow_left.svg";
import { ReactComponent as ArrowRight } from "../../assets/ui/arrow_right.svg";
import Octicon, {Code, GitCommit, GitMerge, MarkGithub, Star} from "@primer/octicons-react";
import { lightenDarkenColor } from "../../lib/utils";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ProjectViewProps {
    project: Project
}

interface ProjectViewState {
    image: number
}

export default class ProjectView extends Component<ProjectViewProps, ProjectViewState> {

    state = {
        image: 0
    };

    render() {
        const { project } = this.props;
        const { image } = this.state;

        return <div className="project-container" style={{ background: `${project.color}77` }}>
            <div className="project-content-container">
                <div className="project-title">{project.name}</div>
                <div className="project-description">{project.description}</div>
                <div className="mt-1">
                    {project.tags.map(tag =>
                        <div key={tag} className={`project-admin-tag ${project.hidden && 'strike'}`}>
                            #{tag}
                        </div>
                    )}
                </div>
                <div className="mt-1">
                    <div className="project-github-info" style={{ color: lightenDarkenColor(project.color, -100) }}>
                        {/* eslint-disable-next-line react/jsx-no-target-blank */}
                        <a href={`https://github.com/${project.github?.link}`} target="_blank">
                            <Octicon size={20} icon={MarkGithub} className="mr-1"/>
                            GitHub
                        </a>
                    </div>
                    <div className="project-github-info" style={{ color: lightenDarkenColor(project.color, -100) }}>
                        <Octicon size={20} icon={Code} className="mr-1"/>
                        {project.github?.language}
                    </div>
                    <div className="project-github-info" style={{ color: lightenDarkenColor(project.color, -100) }}>
                        <Octicon size={20} icon={GitCommit} className="mr-1"/>
                        {project.github?.commits} {project.github?.commits === 1 ? 'commit' : 'commits'}
                    </div>
                    <div className="project-github-info" style={{ color: lightenDarkenColor(project.color, -100) }}>
                        <Octicon size={20} icon={GitMerge} className="mr-1"/>
                        {project.github?.branches} {project.github?.branches === 1 ? 'branch' : 'branches'}
                    </div>
                    <div className="project-github-info" style={{ color: lightenDarkenColor(project.color, -100) }}>
                        <Octicon size={20} icon={Star} className="mr-1"/>
                        {project.github?.stargazers} {project.github?.stargazers === 1 ? 'stargazer' : 'stargazers'}
                    </div>
                </div>
            </div>
            {project.images.length > 0 &&
                <div className="project-images-container">
                    <div
                        className="project-arrow"
                        style={{ visibility: image !== 0 ? 'visible' : 'hidden' }}
                        onClick={() => this.setState({ image: image - 1 })}>
                        <ArrowLeft/>
                    </div>
                    <div className="text-center">
                        <LazyLoadImage
                            alt={`img${image}`}
                            effect="blur"
                            src={project.images[image]}
                            className="project-image"/>
                    </div>
                    {/*<img src={project.images[image]} className="project-image lazy" alt={`img${image}`}/>*/}
                    <div
                        className="project-arrow"
                        style={{ visibility: image !== project.images.length - 1 ? 'visible' : 'hidden' }}
                        onClick={() => this.setState({ image: image + 1 })}>
                        <ArrowRight/>
                    </div>
                </div>
            }
        </div>;
    }
}
