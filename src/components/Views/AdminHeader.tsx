import * as React from "react";
import { Component } from "react";
import AdminPages from "../../models/AdminPages";

import '../../styles/views.scss';
import '../../styles/styles.scss';
import Button from "./Controls/Button";
import { inject, observer } from "mobx-react";
import AuthState from "../../stores/components/AuthState";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
    page: AdminPages
    authState?: AuthState
}

@inject('authState')
@observer
export default class AdminHeader extends Component<AdminHeaderProps> {

    onSignOutClick = async () => {
        const { authState } = this.props;

        if (authState) {
            authState.loading = true;
            await authState.signOut();
            authState.loading = false;
        }
    }

    render() {
        const { page } = this.props;

        return (
            <div>
                <div className='admin-header'>
                    <div style={{ display: 'flex' }}>
                        <Link to='/admin/content'>
                            <Button
                                className='m-1 inline'
                                text='Content'
                                color={page === AdminPages.CONTENT ? 'primary' : 'secondary'}
                            />
                        </Link>

                        <Link to='/admin/projects'>
                            <Button
                                className='m-1 inline'
                                text='Projects'
                                color={page === AdminPages.PROJECTS ? 'primary' : 'secondary'}
                            />
                        </Link>

                        <Button
                            className='ml-auto my-1 mr-1 inline'
                            text='Sign out'
                            color='secondary'
                            onClick={() => this.onSignOutClick()}/>
                    </div>
                </div>
            </div>
        );
    }
}
