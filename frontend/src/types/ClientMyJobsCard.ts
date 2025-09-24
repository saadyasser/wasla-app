export enum Title {
  ActiveContracts = "Active Contracts",
  OpenJobs = "Open Jobs",
  TotalApplications = "Total Applications",
  TotalSpent = "Total Spent",
}

export type ClientMyJobsCard = {
    title: Title,
    number: number
}