import * as React from 'react';

import '../../../styles/views.scss';

interface InputProps {
    value: string | number
    hint?: string
    onChange: (value: string) => void
    className?: string
    type?: 'text' | 'number' | 'password'
    multiline?: boolean;
}

const Input = (props: InputProps) => {
    const { onChange, value, hint, className, type, multiline } = props;
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
};

export default Input;
