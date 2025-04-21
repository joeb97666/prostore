import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation"; 

export const metadata: Metadata = {
    title: 'Sign In',
};

const SignInPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string
    }>
}

) => {
    const { callbackUrl } = await props.searchParams;

    const session = await auth();

    if (session) {
        return console.log('in session'),
        redirect(callbackUrl || '/');

    }

    return <div className="w-full max-w-md mx-auto">
                <Card>
                    <CardHeader className="space-y-4">
                        <Link href='/' className='flex-center'>
                            <Image src='/images/logo.png' 
                            width={300}
                            height={300}
                            alt={'${APP_NAME} logo'}/>
                        </Link>
                        <CardTitle className='text-center'>Sign In</CardTitle>
                        <CardDescription className="text-center">
                            Sign in to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <CredentialsSignInForm />
                    </CardContent>
                </Card> 
    </div>;
};
 
export default SignInPage;