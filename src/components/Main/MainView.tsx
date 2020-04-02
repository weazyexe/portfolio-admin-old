import * as React from "react";
import { Component } from "react";
import { inject, observer } from "mobx-react";
import Loader from "../Views/Controls/Loader";
import ContentState from "../../stores/components/ContentState";

import ContactsView from "../Views/ContactsView";
import { MAIN_TITLE } from "../../lib/documentTitles";
import { logPageView } from "../../lib/firebase";
import NavigationMenu from "../Views/NavigationMenu";

import { ReactComponent as Menu } from "../../assets/ui/menu.svg";
import "../../styles/views.scss";
import "../../styles/navigation.scss"

interface MainViewProps {
    contentState?: ContentState
}

interface MainViewState {
    navOpened: boolean
}

@inject('contentState')
@observer
export default class MainView extends Component<MainViewProps, MainViewState> {

    state = {
        navOpened: false
    }

    async componentDidMount() {
        const { contentState } = this.props;

        if (contentState) {
            contentState.loading = true;
            await contentState.getContent();
            contentState.loading = false;
        }

        logPageView(MAIN_TITLE, window.location.pathname);
    }

    onNavigationClick() {
        this.setState({
            navOpened: !this.state.navOpened
        })
    }

    render() {
        const { contentState } = this.props;
        const { navOpened } = this.state;
        document.title = MAIN_TITLE;

        if (contentState) {
            const { content } = contentState;

            return <div className='main-container'>
                {contentState?.loading ? <Loader/> :
                    <React.Fragment>
                        <NavigationMenu opened={navOpened} onClick={() => this.onNavigationClick()} />
                        <div className='main-link-icon menu-nav-button' onClick={() => this.onNavigationClick()}>
                            <Menu />
                        </div>
                        <div className={navOpened ? 'opened-main' : 'closed-main'}>
                            <div className='main-title' dangerouslySetInnerHTML={{ __html: content.title }}/>
                            <div className='main-text' dangerouslySetInnerHTML={{ __html: content.text }}/>

                            <ContactsView contacts={content.contacts} className="mt-1 mb-5" />
                        </div>
                    </React.Fragment>
                }
            </div>;
        }

        return <div/>;
    }
}
