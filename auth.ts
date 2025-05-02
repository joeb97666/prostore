//auth.ts
// import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cookies } from 'next/headers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';



export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in', // Error code passed in query string as ?error=
        },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        },
    adapter: PrismaAdapter(prisma),
    providers: [CredentialsProvider({
        credentials: {
                email: {type: 'email'},
                password: {type: 'password'},
            },
            async authorize(credentials) {
                if (credentials == null) return null;

                //Find user in database
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                });

                //Check if user exists and if the password matches
                if (user && user.password) {
                    const isMatch = compareSync(credentials.password as string, user.password);
                    
                    // If password is correct, return user
                    if (isMatch) {
                        return{
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    }
                }
                // If user does not exist or password does not match return null
                return null;
            }
    })],
     callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, user, trigger, token}: any) {
            //Set the user ID from the token
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;

            //If there is an update, set the user name.
            if (trigger === 'update' ) {
                session.user.name = user.name;
                }

                return session;
            },
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
            async jwt({ token, user, trigger, session }: any) {
                // Assign user fields to token 
                if (user){
                    token.role = user.role;

                // If user has no name then use email. 
                if (user.name === "NO_NAME") {
                    token.name = user.email!.split('@')[0];
                
                // Update user to reflect the token name
                await prisma.user.update({
                    where: { id: user.id },
                    data: { name: token.name },
                });
                }
                if (trigger === 'sign-in' || trigger === 'sign-up') {
                    const cookiesObject = await cookies();
                    const sessionCartId = cookiesObject.get('sessionCartId')?.value;

                    if(sessionCartId){
                        const sessionCart = await prisma.cart.findFirst({
                            where: { sessionCartId },

                        });
                    if (sessionCart) {
                        await prisma.cart.deleteMany({
                            where: {userId: user.id},

                        });

                    // Assign Cart
                    await prisma.cart.update({
                        where: { id: sessionCart.id },
                        data: { userId: user.id },
                    })
                    }
                    }
                }


            }

                return token;    
        },

            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
            authorized({ request, auth }: any ){

                // Array of protected paths
                const protectedPaths = [
                /\/shipping-address/,
                /\/payment-method/,
                /\/place-order/,
                /\/profile/,
                /\/user\/(.*)/,
                /\/order\/(.*)/,
                /\/admin/
                ];

                // Get Pathname from the request url object
                const { pathname } = request.nextUrl;

                //Check if user is not authenticated and accessing a protected path
                if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;


                // Check for session cart cookie.
                if (!request.cookies.get('sessionCartId')) {
                    //Generate new session cart id cookie.
                    const sessionCartId = crypto.randomUUID(); 

                    
                    // Clone the req headers
                    const NewRequestHeaders = new Headers(request.headers);

                     // Create new response and add the new headers
                     const response = NextResponse.next({
                        request: {
                            headers: NewRequestHeaders
                        }
                    });

                // Set newly generated sessionCartId in the response cookies
                response.cookies.set('sessionCartId', sessionCartId);

                return response;

                }else{
                    return true;
              }
           },
        }, 
    }satisfies NextAuthConfig;


export const { handlers, auth, signIn, signOut } = NextAuth(config);