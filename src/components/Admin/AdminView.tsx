import * as React from 'react';
import { Component } from 'react';
import { inject, observer } from "mobx-react";
import AuthState from "../../stores/AuthState";
import AuthView from "./Auth/AuthView";
import AdminState from "../../stores/AdminState";
import AdminPages from "../../models/AdminPages";
import ContentView from "./Content/ContentView";
import ProjectsView from "./Projects/ProjectsView";
import AdminHeader from "../Views/AdminHeader";

interface AdminViewProps {
    authState?: AuthState
    adminState?: AdminState
}

@inject('adminState')
@inject('authState')
@observer
export default class AdminView extends Component<AdminViewProps> {

    renderAdminPage = (page: AdminPages): any => {
        switch (page) {
            case AdminPages.AUTH:
                return <AuthView/>;
            case AdminPages.CONTENT:
                return <ContentView/>;
            case AdminPages.PROJECTS:
                return <ProjectsView/>;
        }
    };

    render() {
        const { authState, adminState } = this.props;

        if (authState && adminState) {
            return (
                <div>
                    {authState.isSignedIn() ?
                        <div>
                            <AdminHeader page={adminState?.page} />
                            {this.renderAdminPage(adminState?.page)}
                        </div> : <AuthView/>
                    }
                </div>
            );
        }

        return <div/>
    }
}
