import {action, observable} from "mobx";
import Content from "../../models/Content";
import {firestore} from "../../lib/firebase";

export default class ContentState {

    @observable content: Content = {
        title: '',
        text: '',
        contacts: {
            vk: '',
            telegram: '',
            twitter: '',
            instagram: '',
            github: ''
        }
    };

    @observable showToast = false;
    @observable loading = false;

    @action getContent = async () => {
        const response = await firestore.doc('/content/all').get();
        this.content = response.data() as Content;
    }

    updateContent = async (item: Content) => {
        await firestore.doc('/content/all').set(item);
    }
}
