import * as React from 'react';
import { Component } from 'react';
import Input from "../Views/Controls/Input";
import Button from "../Views/Controls/Button";
import { inject, observer } from "mobx-react";
import ProjectFormState from "../../stores/forms/ProjectFormState";
import { FormEvent } from "react";
import Creatable from 'react-select/creatable';
import defaultTags from "../../lib/defaultTags";
import Checkbox from "../Views/Controls/Checkbox";
import InputFile from "../Views/Controls/InputFile";
import ProjectAdminImages from "../Views/ProjectAdminImages";
import CirclePicker from "react-color/lib/components/circle/Circle";
import defaultColors from "../../lib/defaultColors";
import Loader from "../Views/Controls/Loader";

interface ProjectFormProps {
    mode: 'create' | 'edit'
    projectFormState?: ProjectFormState
    onSave: (data: any) => void
}

@inject('projectFormState')
@observer
export default class ProjectForm extends Component<ProjectFormProps> {

    onInputChange(value: any, field: string) {
        const { projectFormState } = this.props;

        if (projectFormState) {
            (projectFormState as any)[field] = value;
        }
    }

    onAddFiles(files: FileList) {
        const { projectFormState } = this.props;

        // image converts to base64 for preview
        if (projectFormState && files && files[0]) {
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    projectFormState.images = [...projectFormState.images, e.target?.result as string];
                };

                reader.readAsDataURL(files[i]);
            }
        }
    }

    onDeleteImage(i: number) {
        const { projectFormState } = this.props;

        if (projectFormState) {
            const len = projectFormState.images.length;
            projectFormState.images =
                [...projectFormState.images.slice(0, i), ...projectFormState.images.slice(i + 1, len)];
        }
    }

    onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        const { onSave, projectFormState } = this.props;
        e.preventDefault();

        if (projectFormState) {
            const data = {
                name: projectFormState.name,
                description: projectFormState.description,
                github: projectFormState.github,
                images: projectFormState.images,
                sortWeight: projectFormState.sortWeight,
                tags: projectFormState.tags,
                hidden: projectFormState.hidden,
                color: projectFormState.color
            };

            onSave(data);
        }
    };

    render() {
        const { projectFormState, mode } = this.props;

        if (projectFormState) {
            return <div>
                { projectFormState?.loading ? <Loader/> :
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <div className='form-title'>{mode === 'create' ? 'New project' : 'Edit project'}</div>
                        <Input
                            value={projectFormState?.name}
                            hint='Title'
                            onChange={(e) => this.onInputChange(e, 'name')}
                            className='my-1' />

                        <Input
                            value={projectFormState?.description}
                            hint='Description'
                            onChange={(e) => this.onInputChange(e, 'description')}
                            className='my-1'
                            multiline />

                        <Checkbox
                            className='mt-1 inline'
                            title='Hidden project'
                            value={projectFormState?.hidden}
                            onChange={(e) => this.onInputChange(e, 'hidden')} />

                        <div>
                            <div className='mt-1 p-1' style={{ background: "#999", display: "inline-block" }}>
                                <CirclePicker
                                    colors={defaultColors}
                                    color={projectFormState?.color}
                                    onChange={(c) => this.onInputChange(c.hex, 'color')}/>
                            </div>
                        </div>

                        <div>
                            <Input
                                value={projectFormState?.github}
                                hint='GitHub'
                                onChange={(e) => this.onInputChange(e, 'github')}
                                className='my-1 mr-1 inline' />

                            <Input
                                value={projectFormState?.sortWeight}
                                hint='Sort weight'
                                onChange={(e) => this.onInputChange(e, 'sortWeight')}
                                className='my-1 mr-1 inline'
                                type='number' />

                            <Creatable
                                classNamePrefix='react-select'
                                value={projectFormState?.tags}
                                options={defaultTags}
                                isMulti
                                onChange={(v) => {
                                    projectFormState.tags = v as any;
                                }}/>
                        </div>

                        <InputFile
                            className="my-1"
                            onChange={(files) => this.onAddFiles(files)} />

                        <ProjectAdminImages
                            images={projectFormState?.images}
                            onImageDelete={(i) => this.onDeleteImage(i)}/>

                        <Button
                            className='mt-2'
                            text={mode === 'create' ? 'Create' : 'Save'}
                            color='primary'
                            type='submit'
                        />
                    </form>
                }
            </div>;
        }

        return <div />;
    }
}
