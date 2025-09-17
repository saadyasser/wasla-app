import AuthLayout from "../layouts/AuthLayout"
import {AuthFormContainer} from '@/components/AuthFormContainer';
import Header from '@/components/header';

export default function AuthPage(){
    return(
        <>
            <AuthLayout>
                <AuthFormContainer />
            </AuthLayout>
        </>
    )
}