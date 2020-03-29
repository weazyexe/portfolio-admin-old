import * as React from 'react';
import { Component } from 'react';

import '../../../styles/views.scss';

interface InputProps {
    value: string | number
    hint?: string
    onChange: (value: string) => void
    className?: string
    type?: 'text' | 'number' | 'password'
    multiline?: boolean;
}

export default class Input extends Component<InputProps> {

    render() {
        const { onChange, value, hint, className, type, multiline } = this.props;
        return (
            <React.Fragment>
                { multiline ?
                    <textarea
                        name={hint}
                        placeholder={hint}
                        defaultValue={value}
                        onChange={(e) => onChange(e.target.value)}
                        className={`input ${className}`}
                    /> :
                    <input
                        name={hint}
                        defaultValue={value}
                        placeholder={hint}
                        onChange={(e) => onChange(e.target.value)}
                        className={`input ${className}`}
                        type={type ? type : 'text'}
                    />
                }
            </React.Fragment>
        );
    }
}
