import { PostNewJob } from "@/components/PostNewJob/PostNewJob"
import { auth } from "../../../auth"

export default async function PostNewJobPage(){
    const session = await auth()
    const accessToken = (session as any)?.accessToken as string | undefined
    return accessToken ? <PostNewJob token={accessToken} /> : <div>Unauthorized</div>    
}