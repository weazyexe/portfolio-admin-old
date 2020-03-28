import * as React from 'react';
import { Component } from 'react';

import '../../../styles/views.scss';

type ButtonType = 'button' | 'submit' | 'reset' | undefined
type ButtonColor = 'primary' | 'secondary'

interface ButtonProps {
    text: string
    onClick?: () => void
    className?: string
    type?: ButtonType
    color?: ButtonColor
}

export default class Button extends Component<ButtonProps> {

    render() {
        const { onClick, text, className, type, color } = this.props;
        return (
            <button
                onClick={onClick ? (e) => onClick() : undefined}
                className={`button ${color === 'secondary' ? 'secondary' : ''} ${className}`}
                type={type ? type : 'button'}
            >{text}</button>
        );
    }
}
