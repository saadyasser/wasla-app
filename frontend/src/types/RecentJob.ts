export enum status{
    Active = "active", 
    InProgress = "in-progress",
    Completed = "completed"
}

export interface RecentJob{
    "title": string,
    "category": string,
    "price": number,
    "status": status,
    "proposals": number
}