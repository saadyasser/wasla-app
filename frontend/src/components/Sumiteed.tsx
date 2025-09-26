import { ActiveContract } from "./ClientProfile/MyJobs/ActiveContract"
import { ClientProfileProject } from "@/app/client-profile/page"
import { status } from "@/types/RecentJob"
import { Container } from "@mui/material"

const temp: ClientProfileProject[] = [{
  id: 1,
  title: "Build a Responsive Portfolio Website",
  description: "I need a responsive portfolio website with a modern design, built using React and Tailwind CSS. The website should include a home page, about section, projects section, and contact form.",
  status: status.Completed,
  budget: 1200,
  duration: "4 weeks",
  deadline: "2025-10-30",
  completed_at: null,
  rating: undefined,
  experience_level: "Intermediate",
  created_at_human: "3 days ago",
  proposals_count: 8,
  review_comment: null,
  client: {
    id: 101,
    company_name: "TechVision Solutions"
  },
  skills: ["React", "JavaScript", "UI/UX Design", "Figma"]
},
{
  id: 2,
  title: "E-commerce Website for Handmade Products",
  description: "Looking for a developer to build an e-commerce platform for handmade products. It should have product listing, cart, checkout, and admin dashboard to manage products and orders. Preferred stack: MERN.",
  status: status.Completed,
  budget: 2500,
  duration: "6 weeks",
  deadline: "2025-11-15",
  completed_at: null,
  rating: 5,
  experience_level: "Expert",
  created_at_human: "1 week ago",
  proposals_count: 12,
  review_comment: "Great communication so far!",
  client: {
    id: 202,
    company_name: "CraftHub Marketplace"
  },
  skills: ["MongoDB", "Express", "React", "Node.js", "Stripe API"]
}]


export const Sumiteed = ()=>{
    return(
        <Container sx={{borderRadius: '3rem', mb: 3, display: 'grid', gap: 4}}>
            {temp.map(contract => 
                <ActiveContract key={`${contract.id}-completed`} contract={contract}/>
            )}
        </Container>
    )
}