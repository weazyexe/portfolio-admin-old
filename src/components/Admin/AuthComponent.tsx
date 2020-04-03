import * as React from "react";
import { Component } from "react";
import { inject } from "mobx-react";
import AuthState from "../../stores/components/AuthState";
import {auth} from "../../lib/firebase";
import {Redirect} from "react-router-dom";

interface AuthComponentProps {
    authState?: AuthState
}

@inject("authState")
export default class AuthComponent<P, S> extends Component<P & AuthComponentProps, S>{

    constructor(props: P) {
        super(props);
        console.log(1);
        this.authStateChanged();
    }

    authStateChanged = () => {
        const { authState } = this.props;

        auth.onAuthStateChanged((user) => {
            if (authState) {
                authState.isSignedIn = !!user;
                authState.loading = false;
            }
        })
    };

    render() {
        const { authState } = this.props;

        if (!authState?.isSignedIn) {
            return <Redirect to='/auth' />;
        }
    }
}
