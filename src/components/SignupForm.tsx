'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from '@radix-ui/react-label';
import { PasswordInput } from './ui/password-input';
import { LoadingSpinner } from './Loader';
import { useAuth } from '@/lib/auth-provider-hooks';

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required.',
    })
    .email({
      message: 'Must be a valid email.',
    })
    .max(255, {
      message: 'Email must not exceed 255 characters.',
    })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .refine(
      (password) => {
        // @IsStrongPassword default requirements:
        // - minLength: 8
        // - minLowercase: 1
        // - minUppercase: 1
        // - minNumbers: 1
        // - minSymbols: 1
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^a-zA-Z0-9]/.test(password);

        return hasLowercase && hasUppercase && hasNumber && hasSymbol;
      },
      {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
      },
    ),
  firstName: z
    .string()
    .max(255, {
      message: 'First name must not exceed 255 characters.',
    })
    .optional()
    .or(z.literal('')),
  lastName: z
    .string()
    .max(255, {
      message: 'Last name must not exceed 255 characters.',
    })
    .optional()
    .or(z.literal('')),
});

export function SignupForm() {
  const { isSigningUp, signup } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signup(values);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                        required
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name (Optional)</Label>
                    <FormControl>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Sean"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name (Optional)</Label>
                    <FormControl>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="King"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="**********"
                        {...field}
                        required
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isSigningUp}>
              Sign Up
              <LoadingSpinner loading={isSigningUp} />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
