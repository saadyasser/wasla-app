import { NavBar } from "@/components/ClientProfile/NavBar"
import { auth } from "../../../auth"
import { status } from "@/types/RecentJob"

// Types for the client profile API response
export interface ClientProfileProject {
  id: number
  title: string
  description: string
  status: "in-progress" | "completed" | "open"
  budget: number
  duration: string
  deadline: string
  completed_at: string | null
  rating: number | undefined
  experience_level: string
  created_at_human: string
  proposals_count: number | null
  review_comment: string | null
  client: {
    id: number
    company_name: string | null
  }
  skills: string[]
}

export interface ClientProfileData {
  id: number
  company_name: string | null
  company_info: string | null
  user: {
    id: number
    name: string
    email: string
    role: string
    created_at: string
  }
  location: string | null
  website: string | null
  rating: string | null
  projects: ClientProfileProject[]
  projects_stats: {
    total: number
    open: number
    in_progress: number
    completed: number
    canceled: number
  }
}

interface ClientProfileResponse {
  code: number
  message: string
  data: ClientProfileData
}

export default async function ClientProfile() {
  const session = await auth()
  const accessToken = (session as any)?.accessToken as string | undefined

  let data: ClientProfileResponse | null = null
  try {
    const res = await fetch("http://127.0.0.1:6565/api/v1/client/profile", {
      method: "GET",
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      cache: "no-store",
      // next: { revalidate: 0 }, // alternative to cache: 'no-store'
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch client profile: ${res.status}`)
    }
    data = (await res.json()) as ClientProfileResponse
  } catch (e) {
    console.error(e)
  }


  return (
    <>
     <NavBar data={data?.data as ClientProfileData} />
    </>
  )
}