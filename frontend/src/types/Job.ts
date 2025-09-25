interface Client {
  name: string;
  verified: boolean;
  rating: number;
  amount_spent: string;
}

export interface Job {
  id: number,
  title: string;
  posted_time: string;
  proposals: number;
  location: string;
  description: string;
  budget: string;
  required_skills: string[];
  level: string;
  client: Client;
  time: string;
  requirenments: string[]
}