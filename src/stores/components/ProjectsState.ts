import { action, observable } from "mobx";
import Project from "../../models/Project";
import { firestore, storage } from "../../lib/firebase";
import { generateId } from "../../lib/utils";
import Github from "../../models/Github";
import { getRepositoryInfo } from "../../lib/github";

export default class ProjectsState {

    @observable projects: Project[] = [];

    @observable showToast = false;
    toastText: string = '';

    @observable loading = false;

    @action getProjects = async () => {
        const response = await firestore.collection('projects').get();
        const data = response.docs;

        const result: Project[] = [];
        for (const raw of data) {
            const project = raw.data() as Project;
            result.push(project);
        }

        this.projects = result;
    };

    getProject = async (id: string): Promise<Project> => {
        if (!this.projects.some(project => project.id === id)) {
            return (await firestore.doc(`projects/${id}`).get()).data() as Project;
        } else {
            return this.projects.find(project => project.id === id)!;
        }
    };

    updateProject = async (project: Project, merge: boolean = false) => {
        await firestore.doc(`projects/${project.id}`).set(project, { merge });
    };

    createProject = async (project: Project, id?: string) => {
        id = id ? id : generateId(6);
        if (this.projects.some(it => it.id === id)) {
            alert('Lucker');
        } else {
            await firestore.doc(`projects/${id}`).set({ ...project, id: id });
        }
    };

    deleteProject = async (project: Project) => {
        await firestore.doc(`projects/${project.id}`).delete();
    };

    saveProjectImage = async (base64: string, projectId: string): Promise<string> => {
        const imageName = generateId(13);
        const extension = base64.startsWith("data:image/jpeg") ? ".jpg" : ".png";

        const ref = storage.ref(`projects/${projectId}/${imageName}${extension}`);
        await ref.putString(base64, "data_url");

        return await ref.getDownloadURL();
    };

    getRepositoryState = async (repository: string) : Promise<Github> => {
        return await getRepositoryInfo(repository);
    }
}
