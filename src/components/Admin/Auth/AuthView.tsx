import * as React from "react";
import { Component } from "react";
import Input from "../../Views/Input";
import Button from "../../Views/Button";
import AuthState from "../../../stores/AuthState";
import { inject, observer } from "mobx-react";
import { FormEvent } from "react";
import AdminState from "../../../stores/AdminState";
import AdminPages from "../../../models/AdminPages";

import '../../../styles/styles.scss';
import '../../../styles/admin.scss';

interface AuthViewProps {
    authState?: AuthState
    adminState?: AdminState
}

@inject('adminState')
@inject('authState')
@observer
export default class AuthView extends Component<AuthViewProps> {

    onEmailChange = (email: string) => {
        const { authState } = this.props;

        if (authState) {
            authState.email = email;
        }
    }

    onPasswordChange = (password: string) => {
        const { authState } = this.props;

        if (authState) {
            authState.password = password;
        }
    }

    onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        const { authState, adminState } = this.props;
        e.preventDefault();

        if (authState && authState.email && authState.password && adminState) {
            await authState.signIn();
            if (authState.isSignedIn()) {
                adminState.page = AdminPages.CONTENT;
            } else {
                alert('Wrong credentials');
            }
        }
    }

    render() {
        const { authState } = this.props;

        if (authState) {
            return(
                <div>
                    <form onSubmit={(e) => this.onSubmit(e)}>

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
                            <Button className='my-1 mx-auto' text='Leave' type='submit' color='secondary' />
                        </div>
                    </form>
                </div>
            );
        }

        return <div/>
    }
}
