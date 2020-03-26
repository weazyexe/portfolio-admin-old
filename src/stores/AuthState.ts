import {action, observable} from "mobx";
import {auth} from "../lib/firebase";

export default class AuthState {

    @observable email = '';
    @observable password = '';
    @observable isSignedIn = true;

    @action signIn = async () => {
        await auth.signInWithEmailAndPassword(this.email, this.password);
    };

    @action signOut = async () => {
        await auth.signOut();
    };
}
