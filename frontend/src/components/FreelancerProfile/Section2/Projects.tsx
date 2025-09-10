import { Title } from "./Title"
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import { Chip, Typography, Card, CardContent, Box } from "@mui/material"
import LanguageIcon from '@mui/icons-material/Language'
import { GridLegacy as Grid } from "@mui/material"
import { Project } from "@/types/Project";
import { Button } from "@/components/Button"
import StarIcon from '@mui/icons-material/Star';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

//temporary data
const projects: Project[] = [
    {
        title: 'Palestinian E-commerce Platform',
        status: 'Completed',
        description: 'Comprehensive e-commerce platform showcasing Palestinian products with integrated payment solutions and international shipping.',
        Client: 'Palestinian Heritage Company',
        Budget: 3500,
        Duration: 6,
        Completed: new Date(2024, 1, 15),
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
        stars: 5
    },
    {
        title: 'Palestinian E-commerce Platform',
        status: 'Completed',
        description: 'Comprehensive e-commerce platform showcasing Palestinian products with integrated payment solutions and international shipping.',
        Client: 'Palestinian Heritage Company',
        Budget: 3500,
        Duration: 6,
        Completed: new Date(2024, 1, 5),
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
        stars: 5
    },
    {
        title: 'Palestinian E-commerce Platform',
        status: 'Completed',
        description: 'Comprehensive e-commerce platform showcasing Palestinian products with integrated payment solutions and international shipping.',
        Client: 'Palestinian Heritage Company',
        Budget: 3500,
        Duration: 6,
        Completed: new Date(2024, 1, 5),
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
        stars: 5
    }
]

const columns: (keyof Project)[] = ['Client', 'Budget', 'Duration', 'Completed']

export const Projects = () => {
    return(
        <>
            <Title Icon={WorkOutlineOutlinedIcon} text="Recent Projects"/>
            {projects.map((project, index) =>
                <Card key={`project-${index}`} sx={{mb: 5}}>
                    <CardContent>
                        <Box display={'flex'} justifyContent={'space-between'} >
                            <Box display={'grid'} gap={2}>
                                <Box display={'flex'} gap={2}>
                                    <Typography fontSize={'large'}><b>{project.title}</b></Typography>
                                    <Chip variant="filled" color="success" label={project.status}/>
                                </Box>
                                <Typography sx={{color: '#4A5565'}}>{project.description}</Typography>
                                <Grid container spacing={2}>
                                    {columns.map(column =>
                                        <Grid key={`${column}-column`} item xs={3}>
                                            <Typography color="textDisabled">{column}</Typography>
                                            {column === 'Completed' ? project[column].toDateString() : 
                                            column === 'Client' ? <b>{project[column]}</b> : 
                                            column === 'Budget' ? <Typography color="success"><b>${project[column]}</b></Typography> :                    
                                            `${project[column]} weeks`}
                                        </Grid>
                                    )}
                                </Grid>
                                <Box display={'flex'} gap={1}>
                                    {project.technologies.map(tec =>
                                        <Chip key={`${tec}-techonology`} label={tec}/>
                                    )}
                                </Box>
                                <Box display={'flex'} gap={1}>
                                    <Box>
                                        {new Array(project.stars).fill(0).map((x, index) =>
                                            <StarIcon key={`start-${index}`} fontSize="small" sx={{color: '#fff700ff'}}/>
                                        )}
                                    </Box>
                                    {project.stars.toFixed(1)}
                                </Box>
                            </Box>
                            <Box><Button variant="outlined" color="success" content='Link' startIcon={<LanguageIcon/>}/></Box>
                        </Box>
                    </CardContent>
                </Card>
            )}
            <Box justifySelf={'center'}>
                <Button color="success" variant="outlined" content="View All Projects" endIcon={<ArrowRightAltIcon />}/>
            </Box>
        </>
    )
}