import {action, observable} from "mobx";
import {auth} from "../lib/firebase";

export default class AuthState {

    @observable email = '';
    @observable password = '';

    @action signIn = async () => {
        await auth.signInWithEmailAndPassword(this.email, this.password);
    }

    isSignedIn = () : boolean => !!auth.currentUser
}
