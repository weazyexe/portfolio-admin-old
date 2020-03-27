import * as React from 'react';
import { Component } from 'react';
import { inject, observer } from "mobx-react";
import ContentState from "../../../stores/components/ContentState";
import AdminState from "../../../stores/components/AdminState";
import Loader from "../../Views/Loader";
import ContentForm from "../../Forms/ContentForm";
import Content from "../../../models/Content";
import Toast from "../../Views/Toast";

interface ContentViewProps {
    contentState?: ContentState
    adminState?: AdminState
}

@inject('contentState')
@inject('adminState')
@observer
export default class ContentView extends Component<ContentViewProps> {

    async componentDidMount() {
        const { contentState } = this.props;

        if (contentState) {
            contentState.loading = true;
            await contentState.getContent();
            contentState.loading = false;
        }
    }

    onContentSave = async (item: Content) => {
        const { contentState } = this.props;

        if (contentState) {
            contentState.showToast = false;
            contentState.loading = true;
            await contentState.updateContent(item);
            contentState.loading = false;
            contentState.showToast = true;
        }
    }

    render() {
        const { contentState } = this.props;

        document.title = 'content - weazyexe.dev';

        if (contentState) {
            return <div>
                {
                    contentState?.loading ? <Loader/> :
                        <div>
                            {contentState?.showToast && <Toast text='Changes saved' />}
                            <ContentForm
                                item={contentState?.content}
                                onSave={(item) => this.onContentSave(item)} />
                        </div>
                }
            </div>;
        }

        return <div/>;
    }
}
