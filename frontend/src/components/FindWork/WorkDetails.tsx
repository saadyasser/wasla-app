'use client'
import { ReactNode, useEffect, useRef, useState } from "react";
import { Box, Card, Container, Chip, CircularProgress } from "@mui/material";
import { CardContent } from "@mui/material";
import {Typography} from "@mui/material";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {GridLegacy as Grid} from "@mui/material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Button } from "../Button";
import StarIcon from '@mui/icons-material/Star';
import {Button as MUIButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Client {
  id: number;
  company_name: string | null;
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

interface WorkDetailsProps {
  projects: Project[];
}

const basicInfo = ["created_at_human", "proposals_count", "client"] as const;

export const WorkDetails = ({ projects }: WorkDetailsProps): ReactNode => {
    const router = useRouter();
    const [favoriteStates, setFavoriteStates] = useState<{[key: number]: boolean}>({});
    const [visibleCount, setVisibleCount] = useState<number>(4);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const toggleFavorite = (projectId: number) => {
        setFavoriteStates(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    const formatExperienceLevel = (level: string) => {
        return level.charAt(0).toUpperCase() + level.slice(1) + ' Level';
    };

    const formatBudget = (budget: number) => {
        return `${budget.toLocaleString()}`;
    };

    // IntersectionObserver to load more items on scroll
    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !isLoading && visibleCount < projects.length) {
                setIsLoading(true);
                // Simulate async fetch; here we already have data, so just delay for UX
                const timer = setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + 4, projects.length));
                    setIsLoading(false);
                }, 400);
                return () => clearTimeout(timer);
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, [isLoading, visibleCount, projects.length]);

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <Image src="/empty-state.png" alt="There are no projects." width="323" height="283" className="w-[323px] h-auto" />
                <Link
                    href="/home"
                    type="button"
                    className={`cursor-pointer px-5 flex py-2 border border-transparent font-medium rounded-2xl bg-[#006633] text-white hover:bg-[#006633] hover:text-white focus:outline-none focus:ring-[2px] disabled:opacity-50 leading-[1.2]`}
                    >
                    Search All Projects
                </Link>
            </div>
        );
    }

    return (
        <Container>
            {projects.slice(0, visibleCount).map((project) => 
                <Card key={`project-${project.id}`} sx={{p: 1, mb: 3, boxShadow: 2, borderRadius: 3}}>
                    <CardContent>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography color="#101828" variant="h6"><b>{project.title}</b></Typography>
                            <MUIButton onClick={() => toggleFavorite(project.id)}>
                                {favoriteStates[project.id] ? 
                                    <FavoriteIcon fontSize="small" sx={{color: '#99A1AF'}}/> :
                                    <FavoriteBorderOutlinedIcon fontSize="small" sx={{color: '#99A1AF'}}/>
                                }
                            </MUIButton>
                        </Box>
                        <Box display={'flex'} gap={2} mb={1} flexWrap={'wrap'}>
                            {basicInfo.map((info, index) => {
                                let content;
                                if (info === 'created_at_human') {
                                    content = project.created_at_human;
                                } else if (info === 'proposals_count') {
                                    content = `${project.proposals_count || 0} proposals`;
                                } else if (info === 'client') {
                                    content = (
                                        <Box display={'flex'} gap={.5} alignItems={'center'}>
                                            <RoomOutlinedIcon fontSize="small" sx={{width:'1rem', height: '18px'}}/>
                                            {project.client.company_name || 'Unknown client'}
                                        </Box>
                                    );
                                }

                                return (
                                    <Box key={info} display="flex" alignItems="center" gap={1}>
                                        <Typography
                                            color="#4A5565"
                                            fontSize={'small'}
                                        >
                                            {content}
                                        </Typography>
                                        {index < basicInfo.length - 1 && (
                                            <Typography color="#4A5565">•</Typography>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                        <Typography mb={1}>{project.description}</Typography>
                        <Box display={'flex'} justifyContent={'space-between'} mb={1}>     
                           <Typography>
                               <AttachMoneyOutlinedIcon fontSize="small"/> 
                               {formatBudget(project.budget)}
                           </Typography>
                           <Chip 
                               label={formatExperienceLevel(project.experience_level)} 
                               sx={{color: '#894B00', bgcolor: '#FEF9C2', border: '1px solid #FFF085', fontWeight: 'bold'}}
                           />
                        </Box>
                        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                            {project.skills.length > 0 ? (
                                project.skills.map((skill, skillIndex) =>
                                    <Chip key={`${project.id}-${skill}-${skillIndex}`} label={skill} sx={{bgcolor: '#F5F5F5', fontWeight: 'bold'}}/>
                                )
                            ) : (
                                <Typography fontSize="small" color="#4A5565">No specific skills listed</Typography>
                            )}
                        </Box>
                        <Box sx={{borderTop: '1px solid #E5E7EB', margin: '1rem 0'}}></Box>
                        <Box display={'flex'} justifyContent={'space-between'} gap={{xs: 1, sm: 0}} flexDirection={{xs: 'column', sm: 'row'}}>
                            <Box display={'flex'} gap={2}>
                                <Typography
                                    bgcolor={'#F5F5F5'}
                                    fontSize={'large'}
                                    width={'40px'}
                                    height={'40px'}
                                    borderRadius={5}
                                    sx={{color: 'black'}}
                                    textAlign={'center'}
                                    lineHeight={.6}
                                    padding={2}
                                >
                                    {(project.client.company_name?.[0] || '?')}
                                </Typography>
                                <Grid display={'grid'}>
                                    <Typography>
                                        <b>{project.client.company_name || 'Unknown client'} </b> 
                                        <Chip 
                                            label={<b>Client</b>}
                                            sx={{bgcolor: '#DCFCE7', color: '#016630'}}
                                        />
                                    </Typography>
                                    <Box display={'flex'} gap={1} sx={{lineHeight: 1}} mt={{xs: 0, sm: -1}}>
                                        {project.rating && (
                                            <>
                                                <Box display={'flex'} gap={.4}>
                                                    <StarIcon fontSize="small" sx={{color: '#FCC800', width:'1rem', height: '1rem'}}/>
                                                    <Typography fontSize={'small'} color="#4A5565">{project.rating}</Typography>
                                                </Box>
                                                <Typography fontSize={'small'} color="#4A5565">•</Typography>
                                            </>
                                        )}
                                        <Typography fontSize={'small'} color="#4A5565">
                                            Duration: {project.duration}
                                        </Typography>
                                    </Box> 
                                </Grid>
                            </Box>
                                <Box 
                                    display={'grid'} 
                                    justifyContent={'end'} 
                                    mt={{xs: 1, sm: 0}}
                                >
                                    <Button onClick={() => { router.push(`/home/${project.id}`) }} content="Apply Now" width="8rem" bgColor="#006633" fontColor="white"/>
                                </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}
            {/* Sentinel for infinite scroll */}
            {visibleCount < projects.length && (
                <Box ref={sentinelRef} display="flex" justifyContent="center" alignItems="center" py={2}>
                    {isLoading && <CircularProgress size={28} sx={{ color: '#006633' }} />}
                </Box>
            )}
        </Container>
    )
}