import { observable } from "mobx";
import AdminPages from "../../models/AdminPages";

export default class AdminState {
    @observable page = AdminPages.CONTENT;
}
