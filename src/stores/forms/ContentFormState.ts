import {observable} from "mobx";

export default class ContentFormState {
    @observable title: string = '';
    @observable text: string = '';

    @observable vk = '';
    @observable telegram = '';
    @observable instagram = '';
    @observable github = '';
    @observable twitter = '';
}
