import * as React from "react";

import "../../styles/views.scss";
import removeButton from "../../assets/ui/remove.svg";

interface ProjectAdminImagesProps {
    images: string[]
    onImageDelete: (index: number) => void;
}

const ProjectAdminImages = (props: ProjectAdminImagesProps) => {
    const { images, onImageDelete } = props;

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
};

export default ProjectAdminImages;
