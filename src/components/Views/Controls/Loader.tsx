import * as React from 'react';
import { Component } from 'react';

import '../../../styles/views/loader.scss';


export default class Loader extends Component {

    render() {
        return (
            <div className="spinner">
                <div className="cube1"/>
                <div className="cube2"/>
            </div>
        );
    }
}
