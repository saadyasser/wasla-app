import { WorkDetails } from "@/components/FindWork/WorkDetails";
import { auth } from "../../../auth";
import { SessionWithToken } from "../freelancer-profile/page";
import SearchBar from "@/components/FindWork/search-bar";

interface Client {
  name: string;
  location: string | null;
  rating: number | null;
}

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  budget: number;
  duration: string;
  deadline: string;
  completed_at: string | null;
  rating: number | null;
  experience_level: string;
  created_at_human: string;
  proposals_count: number | null;
  review_comment: string | null;
  client: Client;
  skills: string[];
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    data: Project[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
    };
  };
}

interface FindWorkPageProps {
  searchParams?: {
    search?: string;
  };
}


async function fetchProjects(searchQuery?: string, token?: string): Promise<Project[]> {
  try {
    const url = new URL('http://127.0.0.1:6565/api/v1/projects');
    if (searchQuery) {
      url.searchParams.append('search', searchQuery);
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
      // Add cache options if needed
      // cache: 'no-store', // for dynamic data
      // next: { revalidate: 60 }, // revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    
    if (result.code === 200) {
      return result.data.data;
    } else {
      throw new Error(result.message || 'Failed to fetch projects');
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    // You might want to throw the error or return empty array based on your needs
    return [];
  }
}

export default async function FindWorkPage({ searchParams }: FindWorkPageProps) {
  const session = await auth();
  const searchQuery =  searchParams?.search;
  
  const accessToken = (session as SessionWithToken | null)?.accessToken;

  
  // Fetch projects data
  const projects = await fetchProjects(searchQuery, accessToken);

 

  return (
    <div className="mt-[30px] 2xl:mt-[50px]">
      <SearchBar 
        defaultValue={searchQuery}
        placeholder="Search for jobs, talent, or skills..."
      />
      <WorkDetails projects={projects} />
    </div>
  );
}