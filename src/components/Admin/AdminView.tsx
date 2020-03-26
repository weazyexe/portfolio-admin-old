import * as React from 'react';
import { Component } from 'react';
import { inject, observer } from "mobx-react";
import AuthState from "../../stores/AuthState";
import AdminState from "../../stores/AdminState";
import AdminPages from "../../models/AdminPages";
import ContentView from "./Content/ContentView";
import ProjectsView from "./Projects/ProjectsView";
import AdminHeader from "../Views/AdminHeader";
import {Redirect} from "react-router";
import Loader from "../Views/Loader";
import { auth } from "../../lib/firebase";

interface AdminViewProps {
    authState?: AuthState
    adminState?: AdminState
}

@inject('adminState')
@inject('authState')
@observer
export default class AdminView extends Component<AdminViewProps> {

    constructor(props: AdminViewProps) {
        super(props);
        this.authStateChanged();
    }

    authStateChanged = () => {
        const { authState, adminState } = this.props;

        auth.onAuthStateChanged((user) => {
            if (authState && adminState) {
                authState.isSignedIn = !!user;
                adminState.loading = false;
            }
        })
    };

    onSignOutClick = async () => {
        const { adminState, authState } = this.props;

        if (authState && adminState) {
            adminState.loading = true;
            await authState.signOut();
            adminState.loading = false;
        }
    };

    onPageChangeClick = (page: AdminPages) => {
        const { adminState } = this.props;

        if (adminState) {
            adminState.page = page;
        }
    };

    renderAdminPage = (page: AdminPages): any => {
        switch (page) {
            case AdminPages.CONTENT:
                return <ContentView/>;
            case AdminPages.PROJECTS:
                return <ProjectsView/>;
        }
    };

    render() {
        const { authState, adminState } = this.props;

        if (!authState?.isSignedIn) {
            return <Redirect to='/auth' />;
        }

        if (authState && adminState) {
            return (
                <div>
                    {adminState?.loading
                        ? <Loader/>
                        : <div>
                            <AdminHeader
                                page={adminState?.page}
                                onPageChangeClick={(page) => this.onPageChangeClick(page)}
                                onSignOutClick={() => this.onSignOutClick()}
                            />

                            <div className='m-1'>
                                {this.renderAdminPage(adminState?.page)}
                            </div>
                        </div>
                    }
                </div>
            );
        }

        return <div/>
    }
}

