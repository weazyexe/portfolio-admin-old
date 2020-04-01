import { observable } from "mobx";

type OptionValue = { value: string, label: string }

export default class ProjectFormState {
    @observable name: string = '';
    @observable description: string = '';
    @observable github: string = '';
    @observable images: string[] = [];
    @observable sortWeight: number = 0;
    @observable tags: OptionValue[] = [];
    @observable hidden: boolean = false;
    @observable color: string = '#1a1a1a';

    @observable loading = false;
}
