import * as React from "react";
import {Component} from "react";

interface CheckboxProps {
    title: string
    value: boolean
    className?: string
    onChange: (value: boolean) => void
}

export default class Checkbox extends Component<CheckboxProps> {

    render() {
        const { title, value, className, onChange } = this.props;

        return <React.Fragment>
            <label className={`control control--checkbox ${className}`}>
                {title}
                <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}/>
                <div className="control__indicator"/>
            </label>
            {/*<input
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                className={`checkbox ${className}`}
                type='checkbox'/>
            <label>{title}</label>*/}
        </React.Fragment>;
    }
}
