import { Chip } from "@mui/material"
import { status } from "@/types/RecentJob"

type props = {jobStatus: status}

export const JobStatus = ({jobStatus}: props) => {
    return(
        <Chip 
            label={jobStatus}
            sx={{
                color: jobStatus === status.Active ? '#006633' :
                       jobStatus === status.InProgress ? '#155DFC' : 
                       '#00A63E',
                bgcolor: jobStatus === status.Active ? '#E8F5E8' :
                         jobStatus === status.InProgress ? '#EFF6FF' : 
                        '#F0FDF4',
                border: jobStatus === status.Active ? '1px solid #00663333' :
                         jobStatus === status.InProgress ? '1px solid #BEDBFF' : 
                        '1px solid #B9F8CF',
                fontWeight: 'bold'
            }}
        />
    )
}