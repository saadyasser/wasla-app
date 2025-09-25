import { Title } from "./Title"
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import { Chip, Typography, Card, CardContent, Box } from "@mui/material"
import LanguageIcon from '@mui/icons-material/Language'
import { GridLegacy as Grid } from "@mui/material"
import { Project } from "@/types/profile";
import { Button } from "@/components/Button"
import StarIcon from '@mui/icons-material/Star';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Link from "next/link"

function formatMinutes(minutes: number) {
    const minutesInDay = 24 * 60;         // 1440
    const minutesInWeek = 7 * minutesInDay;  // 10080
    const minutesInMonth = 30 * minutesInDay; // 43200 (approx)
  
    if (minutes >= minutesInMonth) {
      return `${(minutes / minutesInMonth).toFixed(2)} months`;
    } else if (minutes >= minutesInWeek) {
      return `${(minutes / minutesInWeek).toFixed(2)} weeks`;
    } else if (minutes >= minutesInDay) {
      return `${(minutes / minutesInDay).toFixed(2)} days`;
    } else {
      return `${minutes} minutes`;
    }
  }





export const Projects = ({projects} : {projects: Project[]}) => {
  console.log(projects, 'allllllllprojects')
    return(
        <>
            <Title Icon={WorkOutlineOutlinedIcon} text="Recent Projects"/>
            {projects.map((project, index) =>
                <Card key={`project-${index}`} sx={{mb: 5}}>
                    <CardContent>
                        <Box display={'flex'} justifyContent={'space-between'} sx={{flexDirection: {xs: 'column', sm: 'row'}}}>
                            <Box display={'grid'} gap={2}>
                                <Box display={'flex'} gap={2}>
                                    <Typography fontSize={'large'}><b>{project.title}</b></Typography>
                                    <Chip sx={{bgcolor: '#F0FDF4', color: '#006633', fontWeight: 'bold', border: '1px solid #90e4a9ff'}} label={project.status}/>
                                </Box>
                                <Typography sx={{color: '#4A5565'}}>{project.description}</Typography>
                               
                                <div className="flex flex-wrap gap-8 text-sm text-gray-700">
      {/* Client */}
      <div>
        <p className="text-gray-500">Client</p>
        <p className="font-medium">{project.client.name}</p>
      </div>

      {/* Budget */}
      <div>
        <p className="text-gray-500">Budget</p>
        <p className="font-medium text-[#006633]">${project.budget}</p>
      </div>

      {/* Duration */}
      <div>
        <p className="text-gray-500">Duration</p>
        <p className="font-medium">{project.duration}</p>
      </div>

      {/* Completed */}
      <div>
        <p className="text-gray-500">Completed</p>
        <p className="font-medium">{project.completed_at}</p>
      </div>
    </div>
                                <Box display={'flex'} gap={1}>
                                    {project.skills.map((skill,index) =>
                                        <Chip key={`${index}-techonology`} label={skill}/>
                                    )}
                                </Box>
                                <Box display={'flex'} gap={1}>
                                    <Box>
                                        {new Array(Number(project.rating)).fill(0).map((x, index) =>
                                            <StarIcon key={`start-${index}`} fontSize="small" sx={{color: '#FCC800'}}/>
                                        )}
                                    </Box>
                                    {Number(project.rating).toFixed(1)}
                                </Box>
                            </Box>
                            <Link href={`/home/${project.id}`}><Button variant="text" fontColor="#006633" content='Browse' startIcon={<LanguageIcon/>}/></Link>
                        </Box>
                    </CardContent>
                </Card>
            )}

        </>
    )
}