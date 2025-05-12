// app/lib/paypal.ts

// Used for testing paypal authentication. Thanks claude!
// Add this debugging before the authentication attempt
console.log('Client ID length:', process.env.PAYPAL_CLIENT_ID?.length);
console.log('App Secret length:', process.env.PAYPAL_APP_SECRET?.length);
console.log('First 4 chars of Client ID:', process.env.PAYPAL_CLIENT_ID?.substring(0, 4));
console.log('First 4 chars of App Secret:', process.env.PAYPAL_APP_SECRET?.substring(0, 4));


