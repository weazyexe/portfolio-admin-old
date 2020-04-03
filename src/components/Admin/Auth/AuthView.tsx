import * as React from "react";
import { Component, FormEvent } from "react";
import Input from "../../Views/Controls/Input";
import Button from "../../Views/Controls/Button";
import AuthState from "../../../stores/components/AuthState";
import { inject, observer } from "mobx-react";

import '../../../styles/styles.scss';
import '../../../styles/views.scss';
import Loader from "../../Views/Controls/Loader";
import { Redirect } from "react-router";
import { analytics, logPageView } from "../../../lib/firebase";
import { AUTH_TITLE } from "../../../lib/documentTitles";
import {Link} from "react-router-dom";

interface AuthViewProps {
    authState?: AuthState
}


@inject('authState')
@observer
export default class AuthView extends Component<AuthViewProps> {

    componentDidMount(): void {
        logPageView(AUTH_TITLE, window.location.pathname);
    }

    onEmailChange = (email: string) => {
        const { authState } = this.props;

        if (authState) {
            authState.email = email;
        }
    };

    onPasswordChange = (password: string) => {
        const { authState } = this.props;

        if (authState) {
            authState.password = password;
        }
    };

    onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        const { authState } = this.props;
        e.preventDefault();

        if (authState && authState.email && authState.password) {
            authState.loading = true;
            await authState.signIn();
            if (!authState.isSignedIn) {
                alert('Wrong credentials');
            } else {
                authState.email = '';
                authState.password = '';
                analytics.logEvent('login', { method: 'Firebase Auth' });
            }
            authState.loading = false;
        }
    };

    render() {
        const { authState } = this.props;

        document.title = AUTH_TITLE;

        if (authState?.isSignedIn) {
            return <Redirect to='/admin' />
        }

        if (authState) {
            return(
                <div>
                    {authState?.loading
                        ? <Loader/>
                        : <form onSubmit={(e) => this.onSubmit(e)}>

                            <div className='auth-welcome text-center'>
                                What are you doing here?
                            </div>

                            <div>
                                <Input
                                    className='mx-auto my-1'
                                    value={authState?.email}
                                    hint='you@weazyexe.dev'
                                    onChange={(email) => this.onEmailChange(email)}/>
                            </div>

                            <div>
                                <Input
                                    className='mx-auto my-1'
                                    value={authState?.password}
                                    hint='••••••••'
                                    type='password'
                                    onChange={(password) => this.onPasswordChange(password)}/>
                            </div>

                            <div>
                                <Button className='my-1 mx-auto' text='Sign in' type='submit' />
                            </div>

                            <div>
                                <Link to="/">
                                    <Button className='my-1 mx-auto' text='Leave' type='submit' color='secondary' />
                                </Link>
                            </div>
                        </form>
                    }
                </div>
            );
        }

        return <div/>
    }
}
