'use client'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SignUpDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useActionState } from "react";

import { signUpUser } from "@/lib/actions/user.actions";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ''
     });

const searchParams = useSearchParams();
const callbackUrl = searchParams.get('callbackUrl') || '/';

const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} className="w-full" variant='default'>
            { pending ? 'Submitting...' : 'Sign Up' }
        </Button>
    )
}
    return (
    
    <form action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl}></input>
        <div className="space-y-6">
        <div>
            <Label htmlFor="name">Name</Label>
                <Input
                    id='name'
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    defaultValue={SignUpDefaultValues.name}
                />
            </div>
            <div>
            <Label htmlFor="email">Email</Label>
                <Input
                    id='email'
                    name="email"
                    type="text"
                    required
                    autoComplete="email"
                    defaultValue={SignUpDefaultValues.email}
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
                    defaultValue={SignUpDefaultValues.password}
                />
            </div>
            
            <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id='confirmPassword'
                    name="confirmPassword"
                    type="password"
                    required
                    autoComplete="confirmPassword"
                    defaultValue={SignUpDefaultValues.confirmPassword}
                />
            </div>
                <div>
                    <SignUpButton/>
                </div>
               
                { data && !data.success && (
                <div className="text-center text-destrictive">{ data.message }</div>
                )}
                    <div className="text-sm text-center text-muted-foreground">
                 
                        <Link href='/sign-in' target='_self' className='link'>
                            Already have an account? { ' ' } Sign In
                        </Link>
                </div>
        </div>    
    </form>
    );
}
 
export default SignUpForm;