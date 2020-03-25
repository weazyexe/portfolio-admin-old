import * as React from 'react';
import { Component } from 'react';

import '../../styles/views.scss';

interface InputProps {
    value: string
    hint?: string
    onChange: (value: string) => void
    className?: string
    type?: string
}

export default class Input extends Component<InputProps> {

    render() {
        const { onChange, value, hint, className, type } = this.props;
        return (
            <div>
                <input
                    name={hint}
                    defaultValue={value}
                    placeholder={hint}
                    onChange={(e) => onChange(e.target.value)}
                    className={`input ${className}`}
                    type={type ? type : 'text'}
                />
            </div>

        );
    }
}
