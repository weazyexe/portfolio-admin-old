import * as React from "react";
import { Component } from "react";
import AdminPages from "../../models/AdminPages";

import '../../styles/views.scss';
import '../../styles/styles.scss';
import Button from "./Button";

interface AdminHeaderProps {
    page: AdminPages
    onSignOutClick: () => any;
    onPageChangeClick: (page: AdminPages) => any;
}

export default class AdminHeader extends Component<AdminHeaderProps> {

    render() {
        const { page, onSignOutClick, onPageChangeClick } = this.props;

        return (
            <div>
                <div className='admin-header'>
                    <div style={{ display: 'flex' }}>
                        <Button
                            className='m-1 inline'
                            text='Content'
                            color={page === AdminPages.CONTENT ? 'primary' : 'secondary'}
                            onClick={() => onPageChangeClick(AdminPages.CONTENT) }
                        />

                        <Button
                            className='m-1 inline'
                            text='Projects'
                            color={page === AdminPages.PROJECTS ? 'primary' : 'secondary'}
                            onClick={() => onPageChangeClick(AdminPages.PROJECTS) }
                        />

                        <Button
                            className='ml-auto my-1 mr-1 inline'
                            text='Sign out'
                            color='secondary'
                            onClick={() => onSignOutClick()}/>
                    </div>
                </div>
            </div>
        );
    }
}
