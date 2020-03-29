import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export default interface Github {
    link: string
    branches: number
    commits: number
    stargazers: number
    language: string
    date: Timestamp
}
