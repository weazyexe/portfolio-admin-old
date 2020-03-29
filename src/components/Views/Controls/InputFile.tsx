import * as React from "react";
import { Component } from "react";
import Button from "./Button";

interface InputFileProps {
    className?: string
    onChange: (files: FileList) => void
}

export default class InputFile extends Component<InputFileProps> {

    inputElement: HTMLInputElement | null = null;

    render() {
        const { className, onChange } = this.props;

        return <div className={className} style={{ display: "inline-block" }}>
            <input
                ref={input => this.inputElement = input}
                multiple
                accept="image/*"
                type="file"
                value=''
                onChange={e => e.target.files && onChange(e.target.files)}/>
            <span />
            <Button
                text='Select files'
                color='secondary'
                onClick={() => this.inputElement?.click()}/>
        </div>;
    }
}
