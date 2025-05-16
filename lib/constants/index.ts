//lib/constants/index.ts
export const APP_NAME=  process.env.NEXT_PUBLIC_APP_NAME || "The Avian Company";
export const APP_DESC=  process.env.NEXT_PUBLIC_APP_DESC || "Your Electronics Provider";
export const SERVER_URL= process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 8;
export const APP_DESCRIPTION = APP_DESC

export const SignInDefaultValues = {
    email:'',
    password:'',

};

export const SignUpDefaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
}

export const shippingAddressDefaultValues = {
    fullName: '',
    StreetAddress: '',
    city: '',
    postalCode: '',
    country: '',
};

export const PAYMENT_METHODS =process.env.PAYMENT_METHODS 
? process.env.PAYMENT_METHODS.split(', ') : ['PayPal', 'Stripe', 'CashOnDelivery'];

export const DEFAULT_PAYMENT_METHOD =
    process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;