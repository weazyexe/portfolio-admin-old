import Github from "../models/Github";
import axios from "axios";
import firebase from "firebase";

const Timestamp = firebase.firestore.Timestamp;

const URL = "https://api.github.com";

interface RepositoryResponse {
    stargazers_count: number
    language: string
    updated_at: string
    commits_url: string
    branches_url: string
}

export const getRepositoryInfo = async (repository: string): Promise<Github> => {
    const response = await axios.get<RepositoryResponse>(`${URL}/repos/${repository}`);

    const cLen = response.data.commits_url.length;
    const bLen = response.data.branches_url.length;

    // removing {/sha} from url
    const commitsResponse = await axios.get(response.data.commits_url.slice(0, cLen - 6));

    // removing {/branch} from url
    const branchesResponse = await axios.get(response.data.branches_url.slice(0, bLen - 9));

    return {
        stargazers: response.data.stargazers_count,
        language: response.data.language,
        link: repository,
        commits: commitsResponse.data.length,
        branches: branchesResponse.data.length,
        date: new Timestamp(Date.parse(response.data.updated_at) / 1000, 0)
    };
};
