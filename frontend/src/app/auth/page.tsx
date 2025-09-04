import AuthLayout from "../layouts/AuthLayout"
import {AuthFormContainer} from '@/components/AuthFormContainer';

export default function AuthPage(){
    return(
        <AuthLayout>
            <AuthFormContainer />
        </AuthLayout>
    )
}