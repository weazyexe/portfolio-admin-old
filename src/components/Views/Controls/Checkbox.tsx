import * as React from "react";

interface CheckboxProps {
    title: string
    value: boolean
    className?: string
    onChange: (value: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {
    const { title, value, className, onChange } = props;

    return <React.Fragment>
        <label className={`control control--checkbox ${className}`}>
            {title}
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}/>
            <div className="control__indicator"/>
        </label>
    </React.Fragment>;
};

export default Checkbox;
