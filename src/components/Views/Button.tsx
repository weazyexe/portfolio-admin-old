import * as React from 'react';
import { Component } from 'react';

import '../../styles/views.scss';

type ButtonType = 'button' | 'submit' | 'reset' | undefined

interface ButtonProps {
    text: string
    onClick?: () => void
    className?: string
    type?: ButtonType
}

export default class Button extends Component<ButtonProps> {

    render() {
        const { onClick, text, className, type } = this.props;
        return (
            <button
                onClick={onClick ? (e) => onClick() : undefined}
                className={`button ${className}`}
                type={type ? type : 'button'}
            >{text}</button>
        );
    }
}
