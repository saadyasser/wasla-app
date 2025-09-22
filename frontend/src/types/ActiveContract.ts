import { status } from "./RecentJob";

export interface ActiveContractType {
    "projectTitle": string,
    "status": status.InProgress,
    "client": string,
    "budget": number,
    "dueDate": string,
    "description": string,
    "technologies": string[],
    "progress": number,
    "applicationsReceived": number
}