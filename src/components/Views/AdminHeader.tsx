import * as React from "react";
import { Component } from "react";
import AdminPages from "../../models/AdminPages";

import '../../styles/views.scss';
import '../../styles/styles.scss';

interface AdminHeaderProps {
    page: AdminPages
}

export default class AdminHeader extends Component<AdminHeaderProps> {

    render() {
        const { page } = this.props;

        return (
            <div>
                <div className='mx-auto admin-header'>
                    <div className={`admin-header-element ${page === AdminPages.CONTENT ? 'chosen' : ''}`}>Content</div>
                    <div className={`admin-header-element ${page === AdminPages.PROJECTS ? 'chosen' : ''}`}>Projects</div>
                </div>
            </div>
        );
    }
}
