import * as React from 'react';
import { Component } from 'react';
import { inject, observer } from "mobx-react";
import ContentState from "../../../stores/components/ContentState";
import Loader from "../../Views/Controls/Loader";
import ContentForm from "../../Forms/ContentForm";
import Content from "../../../models/Content";
import Toast from "../../Views/Controls/Toast";
import AdminHeader from "../../Views/AdminHeader";
import AdminPages from "../../../models/AdminPages";
import AuthState from "../../../stores/components/AuthState";
import { auth, logPageView } from "../../../lib/firebase";
import { Redirect } from "react-router-dom";
import { CONTENT_TITLE } from "../../../lib/documentTitles";

interface ContentViewProps {
    contentState?: ContentState
    authState?: AuthState
}

@inject('contentState')
@inject('authState')
@observer
export default class ContentView extends Component<ContentViewProps> {

    constructor(props: ContentViewProps) {
        super(props);
        this.authStateChanged();
    }

    async componentDidMount() {
        const { contentState } = this.props;

        if (contentState) {
            contentState.loading = true;
            await contentState.getContent();
            contentState.loading = false;
        }

        logPageView(CONTENT_TITLE, window.location.pathname);
    }

    showToast() {
        const { contentState } = this.props;

        if (contentState) {
            contentState.showToast = true;
            setTimeout(() => {
                contentState.showToast = false;
            }, 3000);
        }
    };

    authStateChanged = () => {
        const { authState } = this.props;

        auth.onAuthStateChanged((user) => {
            if (authState) {
                authState.isSignedIn = !!user;
                authState.loading = false;
            }
        })
    };

    onContentSave = async (item: Content) => {
        const { contentState } = this.props;

        if (contentState) {
            contentState.loading = true;
            await contentState.updateContent(item);
            contentState.content = item;
            contentState.loading = false;
            this.showToast();
        }
    };

    render() {
        const { authState, contentState } = this.props;

        document.title = CONTENT_TITLE;

        if (!authState?.isSignedIn) {
            return <Redirect to='/auth' />;
        }

        if (contentState && authState) {
            return authState.loading ? <Loader/>
                : <div>
                    <AdminHeader page={AdminPages.CONTENT}/>

                    <div className='m-1'>
                        {
                            contentState?.loading ? <Loader/> :
                                <div>
                                    {contentState?.showToast && <Toast text='Changes saved' />}
                                    <ContentForm
                                        item={contentState?.content}
                                        onSave={(item) => this.onContentSave(item)} />
                                </div>
                        }
                    </div>
                </div>;
        }

        return <div/>;
    }
}
