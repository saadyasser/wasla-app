export interface FreelancerProfile {
    id: number;
    user: {
      id: number;
      name: string;
      email: string;
      role: 'freelancer' | 'client' | string; // extend if needed
      created_at: string; // e.g., "Member since 2025"
    };
    title: string;
    bio: string;
    hourly_rate: string;
    profile_image_url: string;
    phone_number: string;
    website: string;
    location: string;
    available: boolean;
    is_complete: boolean;
    total_earnings: number;
    completed_projects_count: number;
    reviews_count: number;
    average_rating: number;
    skills: Skill[];
    portfolios: Portfolio[];
    projects: Project[];
    social_links: SocialLink[];
    certifications: Certification[];
    educations: Education[];
  }
  
  export interface Skill {
    id: number;
    name: string;
  }
  
  export interface Portfolio {
    id: number;
    title: string;
    url: string;
    description: string;
  }
  
  export interface Project {
    id: number;
    title: string;
    description: string;
    status: 'Client'| 'Budget' | 'Duration' | 'Completed';
    budget: number;
    duration: string;
    deadline: string; // could be Date if parsed
    completed_at: string | null;
    rating: string; // if it's always numeric, change to number
    review_comment: string;
    client: Client; // replace with actual client structure
    skills: string[];
  }
  
  export interface Client {
    id: number;
    name: string;
    email: string;
    // add other fields if needed
  }
  
  export interface SocialLink {
    id: number;
    platform_name: string;
    url: string;
  }
  
  export interface Certification {
    id: number;
    certification_name: string;
    certification_url: string;
  }
  
  export interface Education {
    id: number;
    university: string;
    degree: string;
    field: string;
    from: string;
    to: string;
  }
  