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

                    <Checkbox
                        className='mt-1'
                        title='Hidden'
                        value={projectFormState?.hidden}
                        onChange={(e) => this.onInputChange(e, 'hidden')} />

                    <Button
                        className='mt-2'
                        text={mode === 'create' ? 'Create' : 'Save'}
                        color='primary'
                        type='submit'
                    />
                </form>
            </div>;
        }

        return <div />;
    }
}
