import { Chip } from "@mui/material"
import { Status } from "@/types/PostedJob"

type props = {postStatus: "in-progress" | "completed" | "open"}

export const PostStatus = ({postStatus}: props) => {
    return(
        <Chip 
            label={postStatus}
            sx={{
                color: postStatus === Status.Open ? '#006633' : '#364153',
                bgcolor: postStatus === Status.Open ? '#E8F5E8' : '#F3F4F6',
                border: postStatus === Status.Open ? '1px solid #00663333' : '1px solid #E5E7EB'
            }}
        />
    )
}