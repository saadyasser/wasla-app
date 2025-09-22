import { Card as CardMUI, CardContent, Grid, Typography, Box } from "@mui/material"
import { ClientMyJobsCard, Title } from "@/types/ClientMyJobsCard"
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { MyJobsAdditionalInfo } from "@/types/MyJobsAdditionalInfo";

export const Card = ({title, number}: ClientMyJobsCard) => {
    let additionalInfo: MyJobsAdditionalInfo
        switch(title){
            case Title.ActiveContracts:
                additionalInfo = {
                    Icon: WorkOutlineIcon,
                    bgColor: 'linear-gradient(135deg, #EFF6FF 0%, rgba(219, 234, 254, 0.5) 100%)',
                    iconColor: '#155DFC', //and title color
                    numberColor: '#1447E6',
                    borderColor: '#BEDBFF80'
                }
            break
            case Title.OpenJobs:
                additionalInfo = {
                    Icon: DescriptionOutlinedIcon,
                    bgColor: 'linear-gradient(135deg, #F0FDF4 0%, rgba(220, 252, 231, 0.5) 100%)',
                    iconColor: '#00A63E',
                    numberColor: '#008236',
                    borderColor: '#B9F8CF80'
                }
            break
            case Title.TotalApplications:
                additionalInfo = {
                    Icon: PermIdentityOutlinedIcon,
                    bgColor: 'linear-gradient(135deg, #FAF5FF 0%, rgba(243, 232, 255, 0.5) 100%)',
                    iconColor: '#9810FA',
                    numberColor: '#8200DB',
                    borderColor: '#E9D4FF80'
                }
            break
            default:
                additionalInfo = {
                    Icon: AttachMoneyOutlinedIcon,
                    bgColor: 'linear-gradient(135deg, #E8F5E8 0%, rgba(0, 102, 51, 0.1) 100%)',
                    iconColor: '#006633',
                    numberColor: '#006633',
                    borderColor: '#00663333'
                }
        }
        const Icon = additionalInfo.Icon
    return(
        <CardMUI 
            sx={{
                borderRadius: '14px', 
                border: `1px solid ${additionalInfo.borderColor}`,
                background: additionalInfo.bgColor,
                boxShadow: 0
            }}>
            <CardContent sx={{mt: 1, ml: 1}}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Grid display={'grid'}>
                       <Typography fontSize={'small'} sx={{color: additionalInfo.iconColor}}>{title}</Typography>
                       <Typography sx={{color: additionalInfo.numberColor}} variant="h5" fontWeight={'bold'}>
                            {title === 'Total Spent' && "$"}
                            {number.toLocaleString()}
                        </Typography>
                    </Grid>
                    <Icon sx={{color: additionalInfo.iconColor}} fontSize={'large'}/>
                </Box>
            </CardContent>
        </CardMUI>
    )
}