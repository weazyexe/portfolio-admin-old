import Github from './Github';

export default interface Project {
    id?: string
    name: string
    description: string
    github: Github
    images: string[]
    sortWeight: number
    tags: string[]
}
