import * as React from 'react';

import '../../../styles/controls/loader.scss';

const Loader = () => {
    return (
        <div className="spinner">
            <div className="cube1"/>
            <div className="cube2"/>
        </div>);
};

export default Loader;
