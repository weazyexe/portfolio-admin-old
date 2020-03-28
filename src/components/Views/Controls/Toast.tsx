import {Component, default as React} from "react";

interface ToastProps {
    text: string
}

interface ToastState {
    visible: boolean
}

export default class Toast extends Component<ToastProps, ToastState> {

    state = {
        visible: true
    };

    componentDidMount(): void {
        setTimeout(() => {
            this.setState({
                visible: false
            })
        }, 3000);
    }

    render() {
        const { text } = this.props;
        const { visible } = this.state;
        return visible ? <div className='toast'>
            {text}
        </div> : <React.Fragment/>;
    }
}
