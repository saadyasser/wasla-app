export enum Title {
  ActiveJobs = "Active Jobs",
  FreelancersHired = "Freelancers Hired",
  CompletedProjects = "Completed Projects",
  TotalSpent = "Total Spent",
}

export type ClientDashboardCard = {
    title: Title,
    number: number
}