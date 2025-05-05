'use client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTransition, useState, useEffect } from 'react';
import { paymentMethodSchema } from '@/lib/validators';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { updateUserPaymentMethod } from '@/lib/actions/user.actions';

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  
  console.log('Is PayPal in PAYMENT_METHODS?', PAYMENT_METHODS.includes('PayPal'));
  console.log('PAYMENT_METHODS array:', PAYMENT_METHODS);
  
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });
  
  // Handle client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
    // Enhanced logging for debugging
    console.log('Form submitted with payment method:', values.type);
    console.log('Payment method type data type:', typeof values.type);
    console.log('Available PAYMENT_METHODS:', PAYMENT_METHODS);
    
    // Create a hardcoded array for comparison
    const hardcodedMethods = ['PayPal', 'Stripe', 'CashOnDelivery'];
    console.log('Hardcoded methods array:', hardcodedMethods);
    console.log('Is form value in hardcoded array?', hardcodedMethods.includes(values.type));
    
    // Send the raw value and a fallback to hardcoded value
    const paymentType = PAYMENT_METHODS.includes(values.type) 
      ? values.type 
      : (hardcodedMethods.includes(values.type) ? values.type : 'PayPal');
      
    console.log('Final payment method to submit:', paymentType);
    
    startTransition(async () => {
      try {
        // Try with the hardcoded payment method directly
        const res = await updateUserPaymentMethod({
          type: paymentType
        });
        
        // Log the response for debugging
        console.log('API Response:', res);

        // Check if res exists before accessing its properties
        if (res && !res.success) {
          console.error('Payment method error:', res.message);
          toast({
            variant: 'destructive',
            description: res.message || 'An error occurred',
          });
          return;
        }

        router.push('/place-order');
      } catch (error) {
        console.error('Error updating payment method:', error);
        // Handle any errors that might occur during updateUserPaymentMethod
        toast({
          variant: 'destructive',
          description: 'Failed to update payment method',
        });
      }
    });
  };

  // Return a placeholder while client is hydrating
  if (!isMounted) {
    return (
      <div className='max-w-md mx-auto space-y-4'>
        <h1 className='h2-bold mt-4'>Payment Method</h1>
        <p className='text-sm text-muted-foreground'>Loading payment options...</p>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto space-y-4'>
      <h1 className='h2-bold mt-4'>Payment Method</h1>
      <p className='text-sm text-muted-foreground'>
        Please select a payment method
      </p>
      <Form {...form}>
        <form
          method='post'
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex flex-col md:flex-row gap-5'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        console.log('Selected payment method:', value);
                        field.onChange(value);
                      }}
                      value={field.value}
                      className='flex flex-col space-y-2'
                    >
                      {PAYMENT_METHODS.map((paymentMethod) => {
                        // Log each payment method for debugging
                        console.log('Rendering payment method option:', paymentMethod);
                        return (
                          <FormItem
                            key={paymentMethod}
                            className='flex items-center space-x-3 space-y-0'
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={paymentMethod}
                                id={`payment-method-${paymentMethod.toLowerCase().replace(/\s+/g, '-')}`}
                              />
                            </FormControl>
                            <FormLabel 
                              htmlFor={`payment-method-${paymentMethod.toLowerCase().replace(/\s+/g, '-')}`} 
                              className='font-normal'
                            >
                              {paymentMethod}
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader className='w-4 h-4 animate-spin' />
              ) : (
                <ArrowRight className='w-4 h-4' />
              )}
              {' '}Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentMethodForm;