import {action, observable} from "mobx";
import Project from "../../models/Project";
import {firestore, storage} from "../../lib/firebase";
import {generateId} from "../../lib/generateId";

export default class ProjectsState {

    @observable projects: Project[] = [];

    @observable showToast = false;
    @observable loading = false;

    @action getProjects = async () => {
        const response = await firestore.collection('projects').get();
        const data = response.docs;

        const result: Project[] = [];
        for (const raw of data) {
            const project = raw.data() as Project;

            const images: string[] = [];
            for (const storageLink of project.images) {
                images.push(await storage.ref(storageLink).getDownloadURL());
            }

            project.images = images;
            result.push(project);
        }

        this.projects = result;
    };

    @action updateProject = async (project: Project) => {
        await firestore.doc(`projects/${project.id}`).set(project);
    }

    @action setProject = async (project: Project) => {
        const id = generateId(6);
        if (this.projects.some(it => it.id === id)) {
            alert('Lucker');
        } else {
            await firestore.doc(`projects/${id}`).set({ ...project, id: id });
        }
    }
}
