'use client'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SignInDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useActionState } from "react";

import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const CredentialsSignInForm = () => {
    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ''
     })

const searchParams = useSearchParams();
const callbackUrl = searchParams.get('callbackUrl') || '/';

const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} className="w-full bg-cyan-800 text-white hover:text-black hover:bg-slate-500" variant='default'>
            { pending ? 'Signing In...' : 'Sign In' }
        </Button>
    )
}
    return (
    
    <form action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl}></input>
        <div className="space-y-6">
            <div>
            <Label htmlFor="email">Email</Label>
                <Input
                    id='email'
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    defaultValue={SignInDefaultValues.email}
                />
            </div>
            <div>
            <Label htmlFor="password">Password</Label>
                <Input
                    id='password'
                    name="password"
                    type="password"
                    required
                    autoComplete="password"
                    defaultValue={SignInDefaultValues.password}
                />
            </div>
                <div>
                    <SignInButton/>
                </div>
               
                { data && !data.success && (
                <div className="text-center text-destrictive">{ data.message }</div>
                )}
                    <div className="text-sm text-center text-muted-foreground">
                 
                        <Link href='/sign-up' target='_self' className='link'>
                            Don&apos;t have an account? { ' ' } Sign Up
                        </Link>
                </div>
        </div>    
    </form>
    );
}
 
export default CredentialsSignInForm;