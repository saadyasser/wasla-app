import { Card as CardMUI, CardContent, GridLegacy as Grid, Typography } from "@mui/material"
import React from "react"
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { ClientDashboardCard, Title } from "@/types/ClientDashboardCard";
import { DashboardAdditionlaInfo } from "@/types/DashboardAdditionlaInfo";

export const Card = ({title, number}: ClientDashboardCard) => {
    let additionalInfo: DashboardAdditionlaInfo
    switch(title){
        case Title.ActiveJobs:
            additionalInfo = {
                Icon: WorkOutlineIcon,
                bgColor: '#E8F5E8',
                iconColor: '#006633'
            }
        break
        case Title.FreelancersHired:
            additionalInfo = {
                Icon: GroupOutlinedIcon,
                bgColor: '#EFF6FF',
                iconColor: '#155DFC'
            }
        break
        case Title.CompletedProjects:
            additionalInfo = {
                Icon: StarBorderOutlinedIcon,
                bgColor: '#F0FDF4',
                iconColor: '#00A63E'
            }
        break
        default:
            additionalInfo = {
                Icon: AttachMoneyOutlinedIcon,
                bgColor: '#FEFCE8',
                iconColor: '#D08700'
            }
    }
    const Icon = additionalInfo.Icon
    return(
        <CardMUI sx={{borderRadius: '14px'}}>
            <CardContent sx={{mt: 1, ml: 1}}>
                <Grid container>
                    <Grid item xs={2} display={'grid'}
                        bgcolor={additionalInfo.bgColor} 
                        alignContent={'center'}
                        justifyContent={'center'}
                        sx={{width: '42px', height: '42px', borderRadius: '14.5px'}}
                    >
                       <Icon sx={{color: additionalInfo.iconColor}}/>
                    </Grid>
                    <Grid item ml={2}>
                       <Typography fontSize={'small'}>{title}</Typography>
                       <Typography color="#101828" fontSize={'large'} fontWeight={'bold'}>
                            {title === 'Total Spent' && "$"}
                            {number.toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </CardMUI>
    )
}