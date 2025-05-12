// paypal.test.ts
import { generateAccessToken, paypal } from '@/lib/paypal';

// Test to generate access token from paypal
test('Generates token from PayPal', async () => {
  const tokenResponse = await generateAccessToken();
  console.log('tokenResponse',tokenResponse);
  expect(typeof tokenResponse).toBe('string');
  expect(tokenResponse.length).toBeGreaterThan(0);
});

// Used for testing paypal authentication. Thanks claude!
// Add this debugging before the authentication attempt
console.log('Client ID length:', process.env.PAYPAL_CLIENT_ID?.length);
console.log('App Secret length:', process.env.PAYPAL_APP_SECRET?.length);
console.log('First 4 chars of Client ID:', process.env.PAYPAL_CLIENT_ID?.substring(0, 4));
console.log('First 4 chars of App Secret:', process.env.PAYPAL_APP_SECRET?.substring(0, 4));


// TEST to create a PayPal Order

test('Create a PayPal Order', async () => {
  const token = await generateAccessToken();
  const price = 10.0;

  const orderResponose = await paypal.createOrder( price );
  console.log( orderResponose )
  
  expect ( orderResponose ).toHaveProperty( 'id' );
  expect ( orderResponose ).toHaveProperty( 'status' );
  expect ( orderResponose.status ).toBe( 'CREATED');
});

// TEST to capture payment with mock order.

test('Simulate capture of payment from an order', async () => {
  const orderId = '100';

  const mockCapturePayment = jest.spyOn( paypal, 'capturePayment' ).mockResolvedValue({
    status: 'COMPLETED',
  });

  const captureResponse = await paypal.capturePayment( orderId );
  expect ( captureResponse ).toHaveProperty('status', 'COMPLETED');

  mockCapturePayment.mockRestore();

})