import * as React from 'react';
import {Component, FormEvent} from 'react';
import {inject, observer} from "mobx-react";
import Content from "../../models/Content";
import ContentFormState from "../../stores/forms/ContentFormState";
import Input from "../Views/Controls/Input";
import Button from "../Views/Controls/Button";


interface ContentFormProps {
    onSave: (content: Content) => void
    item: Content
    contentFormState?: ContentFormState
}

@inject('contentFormState')
@observer
export default class ContentForm extends Component<ContentFormProps> {

    componentDidMount() {
        const { contentFormState, item } = this.props;

        console.log('mount');
        if (contentFormState) {
            contentFormState.title = item.title;
            contentFormState.text = item.text;
            contentFormState.vk = item.contacts.vk;
            contentFormState.github = item.contacts.github;
            contentFormState.instagram = item.contacts.instagram;
            contentFormState.telegram = item.contacts.telegram;
            contentFormState.twitter = item.contacts.twitter;
        }
    }

    onInputChange(value: string, field: string) {
        const { contentFormState } = this.props;

        if (contentFormState) {
            (contentFormState as any)[field] = value;
        }
    }

    onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        const { onSave, contentFormState } = this.props;
        e.preventDefault();

        if (contentFormState) {
            console.log('submit');
            console.log(contentFormState.title);
            console.log(contentFormState.text);
            const data: Content = {
                title: contentFormState.title,
                text: contentFormState.text,
                contacts: {
                    twitter: contentFormState.twitter,
                    vk: contentFormState.vk,
                    telegram: contentFormState.telegram,
                    instagram: contentFormState.instagram,
                    github: contentFormState.github
                }
            };

            onSave(data);
        }
    };

    render() {
        const { contentFormState } = this.props;

        console.log('render');
        console.log(contentFormState?.title);
        console.log(contentFormState?.text);
        if (contentFormState) {
            return <div>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <div className='form-title'>Content</div>
                    <Input
                        value={contentFormState?.title}
                        hint='Title'
                        onChange={(e) => this.onInputChange(e, 'title')}
                        className='my-1' />

                    <Input
                        value={contentFormState?.text}
                        hint='Text'
                        onChange={(e) => this.onInputChange(e, 'text')}
                        multiline
                        className='mt-1 mb-2' />


                    <div className='form-title'>Contacts</div>
                    <div>
                        <Input
                            value={contentFormState?.telegram}
                            hint='Telegram'
                            onChange={(e) => this.onInputChange(e, 'telegram')}
                            className='my-1 mr-1 inline' />

                        <Input
                            value={contentFormState?.twitter}
                            hint='Twitter'
                            onChange={(e) => this.onInputChange(e, 'twitter')}
                            className='my-1 mr-1 inline' />

                        <Input
                            value={contentFormState?.instagram}
                            hint='Instagram'
                            onChange={(e) => this.onInputChange(e, 'instagram')}
                            className='my-1 mr-1 inline' />
                    </div>

                    <div>
                        <Input
                            value={contentFormState?.github}
                            hint='GitHub'
                            onChange={(e) => this.onInputChange(e, 'github')}
                            className='my-1 mr-1 inline' />

                        <Input
                            value={contentFormState?.vk}
                            hint='VK'
                            onChange={(e) => this.onInputChange(e, 'vk')}
                            className='my-1 mr-1 inline' />
                    </div>

                    <Button
                        className='mt-2'
                        text='Save'
                        color='primary'
                        type='submit'
                    />
                </form>
            </div>;
        }

        return <div />;
    }
}
