import { Dayjs } from "dayjs";

export interface PostNewJob{
    "title": string,
    "description": string,
    "budget": string,
    "deadline": Dayjs | null,
    "experience_level": "Intermediate" | "Expert",
    "skills": number[]
}