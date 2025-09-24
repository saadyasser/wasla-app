export enum Status {
  Open = "open",
  Closed = "closed"
}

export interface PostedJobType {
  title: string;
  status: Status;
  budget: number;
  postedDate: string;
  numberOfHired?: number;
  applicationsReceived: number;
  description: string;
  skills: string[];
  responsesReceived?: number;
  completedDate?: string;
}
