import * as React from "react";
import { Component } from "react";

import "../../styles/views.scss";
import removeButton from "../../assets/remove.svg";

interface ProjectAdminImagesProps {
    images: string[]
    onImageDelete: (index: number) => void;
}

export default class ProjectAdminImages extends Component<ProjectAdminImagesProps, any> {

    render() {
        const { images, onImageDelete } = this.props;

        return <div>
            {images.map((img, i) =>
                <div key={i} className="project-admin-image-container">
                    <img src={img} alt={`img${i}`} className="project-admin-image" />
                    <img
                        src={removeButton}
                        alt={`delete${i}`}
                        className="project-admin-image-delete"
                        onClick={() => onImageDelete(i)}/>
                </div>
            )}
        </div>;
    }
}
