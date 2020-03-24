import {action, observable} from "mobx";
import {auth} from "../lib/firebase";

export default class AuthState {

    @observable email = '';
    @observable password = '';

    @observable loading = false;

    @action signIn = async () => {
        this.loading = true;
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.loading = false;
    }
}
