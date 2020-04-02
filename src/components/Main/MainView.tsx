import * as React from 'react';
import { Component } from 'react';
import { inject, observer } from "mobx-react";
import ProjectsState from "../../stores/components/ProjectsState";
import Loader from "../Views/Controls/Loader";
import ContentState from "../../stores/components/ContentState";

import '../../styles/views.scss';
import ContactsView from "../Views/ContactsView";
import { PORTFOLIO_TITLE } from "../../lib/documentTitles";
import { logPageView } from "../../lib/firebase";

interface MainViewProps {
    projectsState?: ProjectsState
    contentState?: ContentState
}

@inject('projectsState')
@inject('contentState')
@observer
export default class MainView extends Component<MainViewProps> {

    async componentDidMount() {
        const { projectsState, contentState } = this.props;

        if (projectsState && contentState) {
            contentState.loading = true;
            projectsState.loading = true;

            await contentState.getContent();
            contentState.loading = false;

            projectsState.getProjects().then(() => {
                projectsState.loading = false;
            });
        }

        logPageView(PORTFOLIO_TITLE, window.location.pathname);
    }

    render() {
        const { projectsState, contentState } = this.props;
        document.title = PORTFOLIO_TITLE;

        if (projectsState && contentState) {
            const { content } = contentState;

            return <div className='main-container'>
                {contentState?.loading ? <Loader/> :
                    <div>
                        <div className='main-title' dangerouslySetInnerHTML={{ __html: content.title }}/>
                        <div className='main-text' dangerouslySetInnerHTML={{ __html: content.text }}/>

                        <ContactsView contacts={content.contacts} className="mt-1 mb-5" />
                    </div>
                }
                {projectsState?.loading && contentState?.loading ? <div/> :
                    projectsState?.loading && !contentState?.loading ? <Loader/> :
                        <div>

                        </div>
                }
            </div>;
        }

        return <div/>;
    }
}
